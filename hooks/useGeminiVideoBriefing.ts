import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Incident } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROGRESS_MESSAGES = [
    "Crafting the incident narrative...",
    "Analyzing key timeline events...",
    "Generating visual concepts...",
    "Rendering video frames... this may take a few minutes.",
    "Compositing animation and effects...",
    "Finalizing the video briefing...",
];

const createVideoPrompt = (incident: Incident): string => {
    const keyEvents = incident.log
        .filter(log => log.type !== 'ai_brief')
        .slice(0, 5) // Limit to first 5 key events for conciseness
        .map(log => `- ${log.timestamp}: ${log.entry}`)
        .join('\n');

    const resolution = incident.log.find(l => l.entry.toLowerCase().includes('resolved'))?.entry || 'The incident was successfully resolved.';

    return `Create a 20-second animated video briefing for a pipeline operations incident.
The visual style should be a professional, corporate, and informative "motion graphics" animation, suitable for a management summary. Use clear icons and text overlays.

The video should narrate the following events in a clear, chronological sequence:

Incident Title: ${incident.title}
Severity: ${incident.severity}
Summary: ${incident.summary}

Key Timeline Events:
${keyEvents}

Resolution:
${resolution}

Structure the video with a title screen, a sequence visualizing the key events with timestamps and brief descriptions, and a concluding screen summarizing the resolution.
`;
};

export const useGeminiVideoBriefing = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [progressMessage, setProgressMessage] = useState('');

    const generateBriefing = useCallback(async (incident: Incident) => {
        setLoading(true);
        setError(null);
        setVideoUrl(null);
        setProgressMessage(PROGRESS_MESSAGES[0]);

        try {
            const prompt = createVideoPrompt(incident);
            
            let operation = await ai.models.generateVideos({
                model: 'veo-2.0-generate-001',
                prompt: prompt,
                config: { numberOfVideos: 1 }
            });

            let progressIndex = 1;
            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
                
                if (progressIndex < PROGRESS_MESSAGES.length) {
                    setProgressMessage(PROGRESS_MESSAGES[progressIndex]);
                    progressIndex++;
                }
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
                setVideoUrl(finalUrl);
            } else {
                throw new Error("Video generation completed, but no download link was provided.");
            }
        } catch (e) {
            console.error("AI Video Briefing Generation Error:", e);
            setError("Failed to generate the video briefing. The model may be busy or an error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setVideoUrl(null);
        setProgressMessage('');
    }, []);

    return { generateBriefing, loading, error, videoUrl, progressMessage, reset };
};
