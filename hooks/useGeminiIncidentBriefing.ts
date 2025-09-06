import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Incident, IncidentLogEntry } from '../types';
import { ALERTS } from '../constants';
import { getRelativeTimestamp } from '../utils/time';

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This hook provides a function to generate an AI briefing for an incident
export const useGeminiIncidentBriefingGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateBrief = useCallback(async (inc: Incident): Promise<IncidentLogEntry | null> => {
        if (!inc || loading) return null;
        setLoading(true);
        setError(null);

        const linkedAlerts = ALERTS.filter(a => inc.linkedAlertIds.includes(a.id));
        const alertContext = linkedAlerts.length > 0 ? `\n\n**Linked Alerts Data:**\n\`\`\`json\n${JSON.stringify(linkedAlerts, null, 2)}\n\`\`\`` : '';
        const locationContext = linkedAlerts.length > 0 ? `Sensor ${linkedAlerts[0].sensorId} in segment ${linkedAlerts[0].location.segment}` : 'Location not specified';
        
        const prompt = `You are an AI Incident Commander Assistant for a pipeline integrity system.
An incident has been declared. Your task is to generate a "Strategy Brief".
Use Google Search to find relevant external information that could be related to the incident, such as public construction permits, recent minor seismic events, or severe weather reports near the pipeline location.

**Incident Details:**
- **Title:** ${inc.title}
- **Severity:** ${inc.severity}
- **Summary:** ${inc.summary}
- **Location:** ${locationContext}
- **Time:** ${inc.startTime}
${alertContext}

**Instructions:**
Structure your response in Markdown format with the following exact headers:
### Correlation & Impact Assessment
(Provide a brief summary correlating sensor data, maintenance history, and external information to explain the situation.)

### Immediate Action Plan
(Provide a checklist of 3-5 immediate, prioritized actions for the Incident Commander as a Markdown list.)

### Draft Communication
(Provide a draft for internal or external communication. Start with a suggestion like "**For field teams:**" or "**For local authorities:**".)
`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    tools: [{googleSearch: {}}],
                },
            });

            const briefText = response.text.trim();
            
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            let sourcesText = '';
            if (groundingChunks && groundingChunks.length > 0) {
                const uniqueSources = new Map<string, string>();
                groundingChunks.forEach((chunk: any) => {
                    if (chunk.web && chunk.web.uri) {
                        uniqueSources.set(chunk.web.uri, chunk.web.title || chunk.web.uri);
                    }
                });
        
                if (uniqueSources.size > 0) {
                    sourcesText = '\n\n### Sources Consulted\n';
                    uniqueSources.forEach((title, uri) => {
                        sourcesText += `- [${title}](${uri})\n`;
                    });
                }
            }

            const formattedBrief = briefText + sourcesText;

            const briefLogEntry: IncidentLogEntry = {
                timestamp: getRelativeTimestamp({ seconds: 5 }), // Show it slightly after declaration
                entry: formattedBrief,
                operator: 'AI Assistant',
                type: 'ai_brief',
            };
            
            return briefLogEntry;
        } catch (e) {
            console.error("AI Briefing Generation Error:", e);
            setError("Failed to generate AI Strategy Brief. Please check your connection and try again.");
            return null;
        } finally {
            setLoading(false);
        }
    }, [loading]);

    return { generateBrief, loading, error };
};