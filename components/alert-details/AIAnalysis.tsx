import React, { useState } from 'react';
import { ICONS } from '../../constants';

interface AIAnalysisProps {
    aiAnalysis: {
        summary: string;
        probableCauses: string[];
        recommendedActions: string[];
    }
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ aiAnalysis }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-purple-500/30 shadow-lg">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center text-left" 
                aria-expanded={isOpen}
            >
                <div className="flex items-center text-purple-400">
                    <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                    <h3 className="font-semibold text-white text-lg">AI Analysis</h3>
                </div>
                <svg 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] mt-4 pt-4 border-t border-slate-700/50' : 'max-h-0'}`}>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-purple-300 mb-1">Summary</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">{aiAnalysis.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-purple-300 mb-2">Probable Causes</h4>
                        <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                            {aiAnalysis.probableCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-purple-300 mb-2">Recommended Actions</h4>
                        <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                            {aiAnalysis.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAnalysis;
