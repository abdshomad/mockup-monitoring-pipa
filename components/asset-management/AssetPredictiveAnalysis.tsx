import React from 'react';
import { Asset } from '../../types';
import { ICONS } from '../../constants';
import { useGeminiAssetPrediction } from '../../hooks/useGeminiAssetPrediction';
import { RefreshCw, CalendarPlus } from 'lucide-react';

interface AssetPredictiveAnalysisProps {
    asset: Asset;
    onScheduleMaintenance: (asset: Asset, task?: string) => void;
}

const AssetPredictiveAnalysis: React.FC<AssetPredictiveAnalysisProps> = ({ asset, onScheduleMaintenance }) => {
    const { predict, data, loading, error, reset } = useGeminiAssetPrediction();

    const handleGenerate = () => {
        if (window.confirm("This will use the Gemini API to analyze the asset's lifecycle. Do you want to proceed?")) {
            predict(asset);
        }
    };

    const handleSchedule = () => {
        if (data?.recommendation) {
            onScheduleMaintenance(asset, data.recommendation);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-purple-500/30 shadow-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-purple-400">
                    <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                    <h3 className="font-semibold text-white text-lg">Predictive Analysis</h3>
                </div>
                {data && !loading && (
                    <button onClick={handleGenerate} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Regenerate analysis">
                        <RefreshCw className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50">
                {loading && (
                    <div className="flex items-center space-x-2 text-slate-400">
                         <div className="w-5 h-5 border-2 border-slate-500 border-t-purple-400 rounded-full animate-spin"></div>
                        <span>Analyzing asset lifecycle...</span>
                    </div>
                )}
                {error && <p className="text-red-400 text-sm">{error}</p>}
                
                {!data && !loading && !error && (
                     <div className="text-center">
                        <p className="text-sm text-slate-400 mb-3">Run AI analysis to predict potential failure dates and receive proactive maintenance recommendations.</p>
                        <button 
                            onClick={handleGenerate} 
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                        >
                            Run Predictive Analysis
                        </button>
                    </div>
                )}
                
                {data && !loading && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm text-slate-400">Predicted Failure Date</p>
                                <p className="text-xl font-bold font-mono text-yellow-400">{data.predictedFailureDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Predicted MTBF</p>
                                <p className="text-xl font-bold font-mono text-white">{data.mtbfHours.toLocaleString()} hrs</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-cyan-400 mb-1">AI Recommendation</h4>
                            <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-md">{data.recommendation}</p>
                        </div>
                        <button 
                            onClick={handleSchedule}
                            className="w-full mt-2 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center space-x-2"
                        >
                            <CalendarPlus className="h-5 w-5" />
                            <span>Schedule Proactive Maintenance</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetPredictiveAnalysis;
