import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { LoraWANDevice } from '../types';

export interface BatteryPrediction {
    predictedEOL: string; // Predicted End of Life date
    recommendation: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        predictedEOL: { type: Type.STRING, description: "The predicted battery end-of-life date in YYYY-MM-DD format." },
        recommendation: { type: Type.STRING, description: "A concise, actionable maintenance recommendation based on the prediction. e.g., 'Schedule battery replacement within the next 3 months.'." },
    },
    required: ["predictedEOL", "recommendation"]
};

export const useGeminiBatteryPrediction = () => {
    const [data, setData] = useState<BatteryPrediction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const predict = useCallback(async (device: LoraWANDevice) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const { batteryVoltageHistory, ...deviceDetails } = device;
            
            // Sample the history to keep the prompt size reasonable
            const historySample = batteryVoltageHistory && batteryVoltageHistory.length > 20 
                ? batteryVoltageHistory.filter((_, i) => i % Math.floor(batteryVoltageHistory.length / 20) === 0)
                : batteryVoltageHistory;

            const prompt = `You are a reliability engineer specializing in battery life prediction for industrial IoT devices.
            Analyze the following LoRaWAN sensor data to predict its battery end-of-life (EOL).
            The battery is a 3.6V Li-SOCl2 battery, which is considered depleted around 2.5V.
            Consider the device type, its current battery level, and its historical voltage discharge curve.

            Device Data:
            ${JSON.stringify(deviceDetails, null, 2)}

            Historical Voltage Data (sampled):
            ${JSON.stringify(historySample, null, 2)}

            Today's date is ${new Date().toISOString().split('T')[0]}.
            Based on this information, provide a JSON object with your prediction.`;

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
            console.error("AI Battery Prediction Error:", e);
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
