import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { LONG_TERM_SENSOR_DATA } from '../constants';
import { LongTermDataPoint } from '../types';

export interface Anomaly {
    title: string;
    description: string;
    sensorIds: string[];
    timePeriod: string;
    recommendation: string;
    trendData: { date: string; value: number }[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            sensorIds: { type: Type.ARRAY, items: { type: Type.STRING } },
            timePeriod: { type: Type.STRING },
            recommendation: { type: Type.STRING },
        },
        required: ["title", "description", "sensorIds", "timePeriod", "recommendation"]
    }
};

export const useGeminiAnomalyDetection = () => {
    const [data, setData] = useState<Anomaly[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const prompt = `You are a time-series anomaly detection expert for a pipeline monitoring system.
            Analyze the following 6-month historical data for all sensors.
            Your task is to identify any subtle, long-term trends or anomalies that are not yet critical but could indicate a future problem.
            Focus on slow-developing issues like gradual increases in vibration (indicating potential wear or geological stress) or consistent pressure deviations.
            Ignore normal, minor fluctuations. Only report on statistically significant, long-term trends.
            If you find any anomalies, return them as a JSON array. If no anomalies are found, return an empty array.

            Historical Data:
            ${JSON.stringify(LONG_TERM_SENSOR_DATA, null, 2)}
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });
            
            const anomaliesResult: Omit<Anomaly, 'trendData'>[] = JSON.parse(response.text.trim());

            // Augment the AI response with the actual trend data for visualization
            const augmentedAnomalies: Anomaly[] = anomaliesResult.map(anomaly => {
                const sensorId = anomaly.sensorIds[0]; // Assume first sensor for simplicity
                const sensorData = LONG_TERM_SENSOR_DATA[sensorId];
                const trendData = sensorData.map(d => ({ date: d.date, value: d.avgVibration }));
                return { ...anomaly, trendData };
            });

            setData(augmentedAnomalies);
        } catch (e) {
            console.error("AI Anomaly Detection Error:", e);
            setError("Failed to run AI analysis. The model may be unavailable or the request could not be processed.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { analyze, data, loading, error };
};
