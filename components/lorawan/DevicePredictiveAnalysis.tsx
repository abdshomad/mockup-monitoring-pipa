import React from 'react';
import { LoraWANDevice } from '../../types';
import { ICONS } from '../../constants';
import { useGeminiBatteryPrediction } from '../../hooks/useGeminiBatteryPrediction';
import { RefreshCw, CalendarPlus } from 'lucide-react';

interface DevicePredictiveAnalysisProps {
    device: LoraWANDevice;
    onScheduleMaintenance: (deviceId: string, task: string) => void;
}

const DevicePredictiveAnalysis: React.FC<DevicePredictiveAnalysisProps> = ({ device, onScheduleMaintenance }) => {
    const { predict, data, loading, error, reset } = useGeminiBatteryPrediction();

    const handleGenerate = () => {
        if (device.batteryVoltageHistory && device.batteryVoltageHistory.length > 0) {
            if (window.confirm("This will use the Gemini API to predict the battery's end-of-life. Do you want to proceed?")) {
                predict(device);
            }
        }
    };

    const handleSchedule = () => {
        if (data?.recommendation) {
            onScheduleMaintenance(device.id, `Proactive battery check for ${device.id}. AI recommends: "${data.recommendation}"`);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-purple-500/30 shadow-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-purple-400">
                    <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                    <h3 className="font-semibold text-white text-lg">Predictive Battery Analysis</h3>
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
                        <span>Analyzing battery data...</span>
                    </div>
                )}
                {error && <p className="text-red-400 text-sm">{error}</p>}
                
                {!data && !loading && !error && (
                     <div className="text-center">
                        <p className="text-sm text-slate-400 mb-3">Run AI analysis to predict this device's battery end-of-life based on historical voltage data.</p>
                        <button 
                            onClick={handleGenerate} 
                            disabled={!device.batteryVoltageHistory || device.batteryVoltageHistory.length === 0}
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {(!device.batteryVoltageHistory || device.batteryVoltageHistory.length === 0) ? 'No Historical Data' : 'Run Analysis'}
                        </button>
                    </div>
                )}
                
                {data && !loading && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <p className="text-sm text-slate-400 text-center">Predicted Battery End-of-Life</p>
                            <p className="text-2xl font-bold font-mono text-yellow-400 text-center">{data.predictedEOL}</p>
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

export default DevicePredictiveAnalysis;
