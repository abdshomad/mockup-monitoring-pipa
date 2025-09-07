import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Asset } from '../types';

export interface AssetPrediction {
    predictedFailureDate: string;
    mtbfHours: number;
    recommendation: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        predictedFailureDate: { type: Type.STRING, description: "The predicted failure date in YYYY-MM-DD format." },
        mtbfHours: { type: Type.NUMBER, description: "The predicted Mean Time Between Failure in hours." },
        recommendation: { type: Type.STRING, description: "A concise, actionable maintenance recommendation based on the prediction. e.g., 'Schedule battery replacement before predicted failure date.'." },
    },
    required: ["predictedFailureDate", "mtbfHours", "recommendation"]
};

export const useGeminiAssetPrediction = () => {
    const [data, setData] = useState<AssetPrediction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const predict = useCallback(async (asset: Asset) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // Sanitize asset data for the prompt
            const { imageUrl, maintenanceHistory, ...assetDetails } = asset;
            const historySummary = maintenanceHistory.slice(-5).map(h => ({ task: h.task, scheduledDate: h.scheduledDate, status: h.status }));

            const prompt = `You are a senior reliability engineer specializing in industrial sensors.
            Analyze the following asset data to predict its lifecycle and recommend proactive maintenance.
            Consider the asset's model, age (deployment date vs. today's date of ${new Date().toISOString().split('T')[0]}), and its maintenance history.

            Asset Data:
            ${JSON.stringify(assetDetails, null, 2)}

            Recent Maintenance History (last 5 records):
            ${JSON.stringify(historySummary, null, 2)}

            Based on this information, provide a JSON object with your prediction. The 'VibraPress-Pro' model is robust, while 'Acoustic-X2' and 'FlowMaster-5k' models have a slightly shorter lifespan. Assets in 'In Repair' status or with a history of frequent maintenance are at higher risk.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });

            const predictionResult = JSON.parse(response.text.trim());
            setData(predictionResult);

        } catch (e) {
            console.error("AI Asset Prediction Error:", e);
            setError("Failed to get AI prediction. The model may be unavailable or the request could not be processed.");
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { predict, data, loading, error, reset };
};
