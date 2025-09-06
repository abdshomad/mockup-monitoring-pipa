import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Sensor, ChartDataPoint } from '../types';

export interface SensorAIAnalysisResult {
    summary: string;
    potentialIssues: string[];
    recommendations: string[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A concise summary of the sensor's current performance and trends." },
        potentialIssues: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of potential issues or anomalies detected in the data (e.g., erratic readings, declining power)." },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of actionable recommendations (e.g., schedule maintenance, recalibrate, monitor closely)." },
    },
    required: ["summary", "potentialIssues", "recommendations"]
};

export const useGeminiSensorAnalysis = () => {
    const [data, setData] = useState<SensorAIAnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeSensor = useCallback(async (sensor: Sensor, history: ChartDataPoint[]) => {
        setLoading(true);
        setError(null);
        setData(null);

        // To keep the prompt concise, let's sample the history data if it's too long
        const historySample = history.length > 12 ? history.filter((_, i) => i % 2 === 0) : history;

        try {
            const prompt = `You are a senior pipeline sensor analyst. Analyze the following sensor data and its 24-hour performance history. Provide a summary, identify potential issues, and give 2-3 actionable recommendations.
            
            Current Sensor State:
            ${JSON.stringify(sensor, null, 2)}

            24-Hour Performance History (sampled):
            ${JSON.stringify(historySample, null, 2)}
            
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
            console.error("AI Sensor Analysis Error:", e);
            setError("Failed to get AI analysis. The model may be unavailable or the request could not be processed. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);
    
    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { analyzeSensor, data, loading, error, reset };
};
