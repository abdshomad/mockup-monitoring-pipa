import React from 'react';
import { Alert } from '../../types';
import { ICONS } from '../../constants';
import { useGeminiAnalysis } from '../../hooks/useGeminiAnalysis';
import { RefreshCw } from 'lucide-react';

interface AIAnalysisProps {
    alert: Alert;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ alert }) => {
    const [analyze, { data, loading, error }] = useGeminiAnalysis();
    
    const handleGenerate = () => {
        analyze(alert);
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-purple-500/30 shadow-lg">
             <div className="flex justify-between items-center">
                <div className="flex items-center text-purple-400">
                    <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                    <h3 className="font-semibold text-white text-lg">AI Analysis</h3>
                </div>
                {data && !loading && (
                    <button onClick={handleGenerate} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Regenerate analysis">
                        <RefreshCw className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className={`mt-4 pt-4 border-t border-slate-700/50`}>
                {loading && (
                    <div className="flex items-center space-x-2 text-slate-400">
                         <div className="w-5 h-5 border-2 border-slate-500 border-t-purple-400 rounded-full animate-spin"></div>
                        <span>Analyzing alert...</span>
                    </div>
                )}
                {error && <p className="text-red-400 text-sm">{error}</p>}
                
                {!data && !loading && !error && (
                     <div className="text-center">
                        <p className="text-sm text-slate-400 mb-3">Get AI-powered insights on this alert's probable causes and recommended actions.</p>
                        <button 
                            onClick={handleGenerate} 
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                        >
                            Generate Analysis
                        </button>
                    </div>
                )}
                
                {data && !loading && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <h4 className="font-semibold text-purple-300 mb-1">Summary</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{data.summary}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-purple-300 mb-2">Probable Causes</h4>
                            <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                                {data.probableCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-purple-300 mb-2">Recommended Actions</h4>
                            <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                                {data.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAnalysis;