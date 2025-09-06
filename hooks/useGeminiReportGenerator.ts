import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Alert } from '../types';

export interface IncidentReport {
    title: string;
    executiveSummary: string;
    timelineSummary: string;
    rootCauseAnalysis: string;
    correctiveActionsTaken: string;
    recommendations: string[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A formal title for the incident report, e.g., 'Incident Report: Anomalous Vibration on Sensor P-VIB-002'." },
        executiveSummary: { type: Type.STRING, description: "A brief, high-level summary of the incident from detection to resolution." },
        timelineSummary: { type: Type.STRING, description: "A narrative summary of the key events and actions taken based on the provided timeline data." },
        rootCauseAnalysis: { type: Type.STRING, description: "A probable root cause analysis based on the alert type and resolution notes." },
        correctiveActionsTaken: { type: Type.STRING, description: "A summary of the immediate corrective actions that were taken to resolve the incident, based on the resolution notes." },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 2-3 recommended actions to prevent future occurrences." },
    },
    required: ["title", "executiveSummary", "timelineSummary", "rootCauseAnalysis", "correctiveActionsTaken", "recommendations"]
};

export const useGeminiReportGenerator = () => {
    const [data, setData] = useState<IncidentReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateReport = useCallback(async (alert: Alert) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const { resolutionNotes, history, ...alertDetails } = alert;

            const prompt = `You are an AI assistant for a pipeline monitoring system, tasked with generating formal incident reports.
            Based on the following alert data, action timeline, and resolution notes, generate a structured incident report in JSON format.

            ALERT DATA:
            ${JSON.stringify(alertDetails)}

            ACTION TIMELINE:
            ${JSON.stringify(history)}

            RESOLUTION NOTES:
            "${resolutionNotes || 'No specific notes provided.'}"

            Generate the report.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: reportSchema,
                },
            });
            
            const reportResult = JSON.parse(response.text.trim());
            setData(reportResult);

        } catch (e) {
            console.error("AI Report Generation Error:", e);
            setError("Failed to generate the AI report. The model may be unavailable or the request could not be processed. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { generateReport, data, loading, error };
};