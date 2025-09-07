import React from 'react';
import { Incident, IncidentLogEntry } from '../../types';
import { useGeminiIncidentBriefingGenerator } from '../../hooks/useGeminiIncidentBriefing';
import { ICONS } from '../../constants';

interface AIBriefingGeneratorProps {
    incident: Incident;
    onBriefGenerated: (brief: IncidentLogEntry) => void;
}

const AIBriefingGenerator: React.FC<AIBriefingGeneratorProps> = ({ incident, onBriefGenerated }) => {
    const { generateBrief, loading, error } = useGeminiIncidentBriefingGenerator();

    const handleGenerate = async () => {
        if (window.confirm("This will use the Gemini API and Google Search to generate a strategy brief. Do you want to proceed?")) {
            const brief = await generateBrief(incident);
            if (brief) {
                onBriefGenerated(brief);
            }
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-purple-500/30">
            <div className="flex items-center text-purple-400 mb-3">
                {React.cloneElement(ICONS.ai, { className: "h-6 w-6 mr-3" })}
                <h3 className="font-semibold text-white text-lg">AI Strategy Brief</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
                Generate an AI-powered briefing that correlates incident data with external sources to provide an immediate action plan.
            </p>
            <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-500 disabled:cursor-wait flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        {React.cloneElement(ICONS.ai, { className: "h-5 w-5" })}
                        <span>Generate Brief</span>
                    </>
                )}
            </button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
        </div>
    );
};

export default AIBriefingGenerator;