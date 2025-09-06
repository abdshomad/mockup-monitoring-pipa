import { useState, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { SENSORS, ALERTS, MAINTENANCE_SCHEDULE, TECHNICIANS } from '../constants';

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the AI model
const systemInstruction = `You are "Pipeline Guard AI", an expert assistant for a pipeline integrity monitoring system. Your role is to analyze the provided real-time data and answer user questions accurately and concisely.

- Use ONLY the data provided in the CONTEXT block to answer questions.
- Do not invent or assume information not present in the context.
- If the data is insufficient to answer a question, state that you don't have enough information.
- Format your answers clearly. Use lists, bold text, or tables if it improves readability.
- Keep your responses professional and to the point.
`;

// Helper function to create the data context string
const getSystemContext = (): string => {
  // We remove the detailed history from alerts to save token space
  const alertsSummary = ALERTS.map(({ history, ...rest }) => rest);

  const context = {
    SENSORS,
    ALERTS: alertsSummary,
    MAINTENANCE_SCHEDULE,
    TECHNICIANS,
    CURRENT_DATE: new Date().toISOString(), // Provide current date for context
  };

  return `CONTEXT: \n${JSON.stringify(context, null, 2)}\n\n`;
};

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export const useGeminiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chat = useMemo(() => ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction },
  }), []);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);

    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    // Add a placeholder for the model's response
    const modelResponsePlaceholder: Message = { role: 'model', content: '' };
    setMessages(prev => [...prev, modelResponsePlaceholder]);
    
    try {
      const fullPrompt = `${getSystemContext()}USER QUESTION: "${message}"`;
      const result = await chat.sendMessageStream({ message: fullPrompt });

      let streamBuffer = '';
      for await (const chunk of result) {
        streamBuffer += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.content = streamBuffer;
          }
          return newMessages;
        });
      }
    } catch (e) {
      console.error("Gemini Chat Error:", e);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
       setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.content = errorMessage;
          }
          return newMessages;
        });
    } finally {
      setLoading(false);
    }
  };
  
  return { messages, loading, error, sendMessage };
};
