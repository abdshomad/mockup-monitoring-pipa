import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Alert } from '../types';

export interface AIAnalysis {
    summary: string;
    probableCauses: string[];
    recommendedActions: string[];
}

// Initialize the AI client once at the module level for efficiency.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A concise summary of the situation and its potential impact." },
        probableCauses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of the most likely causes for this alert." },
        recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of immediate, actionable steps to take." },
    },
    required: ["summary", "probableCauses", "recommendedActions"]
};

export const useGeminiAnalysis = () => {
    const [data, setData] = useState<AIAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = useCallback(async (alert: Alert) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const prompt = `You are a pipeline integrity monitoring expert. Analyze the following alert and provide a summary, 3 probable causes, and 3 recommended actions.
            Alert Details:
            - Type: ${alert.type}
            - Sensor ID: ${alert.sensorId}
            - Severity: ${alert.severity}
            - Timestamp: ${alert.timestamp}
            - Segment: ${alert.location.segment}
            
            Return your analysis as a JSON object.`;


            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });

            const analysisResult = JSON.parse(response.text.trim());
            setData(analysisResult);

        } catch (e) {
            console.error("AI Analysis Error:", e);
            setError("Failed to get AI analysis. The model may be unavailable or the request could not be processed. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    return [analyze, { data, loading, error }] as const;
};