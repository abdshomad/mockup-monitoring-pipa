import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Alert, Attachment } from '../types';

// Helper to extract base64 data from a data URI (e.g., "data:image/jpeg;base64,xxxxx")
const getBase64Data = (dataUri: string) => dataUri.split(',')[1];

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const useGeminiMultiModal = () => {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeAttachment = useCallback(async (alert: Alert, attachment: Attachment) => {
        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const prompt = `You are a pipeline integrity monitoring expert. Analyze the attached ${attachment.type} in the context of the following alert and provide a concise, actionable analysis in 2-3 sentences.
            
            Alert Details:
            - Type: ${alert.type}
            - Sensor ID: ${alert.sensorId}
            - Severity: ${alert.severity}
            - Timestamp: ${alert.timestamp}
            - Segment: ${alert.location.segment}
            
            Based on the image, what do you see? What is the likely cause related to the alert? What should be the immediate next step for the field technician?`;

            const imagePart = {
                inlineData: {
                    mimeType: attachment.mimeType,
                    data: getBase64Data(attachment.data),
                },
            };
            const textPart = { text: prompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            setAnalysis(response.text);
        } catch (e) {
            console.error("AI Multi-Modal Analysis Error:", e);
            setError("Failed to get AI analysis for the attachment. The model may be unavailable or the request could not be processed.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { analyzeAttachment, analysis, loading, error };
};
