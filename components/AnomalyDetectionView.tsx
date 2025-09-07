import React from 'react';
import { ICONS } from '../constants';
import { useGeminiAnomalyDetection, Anomaly } from '../hooks/useGeminiAnomalyDetection';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AnomalyChart: React.FC<{ data: Anomaly['trendData'] }> = ({ data }) => (
    <div className="h-24 w-full mt-2">
        <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="date" hide />
                <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} hide />
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: '#4b5563', fontSize: '12px', padding: '5px' }} 
                    labelFormatter={(label) => `Date: ${label}`}
                    formatter={(value: number) => [value.toFixed(4), 'Avg Vibration']}
                />
                <Line type="monotone" dataKey="value" stroke="#f472b6" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const AnomalyCard: React.FC<{ anomaly: Anomaly }> = ({ anomaly }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 animate-fade-in">
        <h4 className="font-semibold text-lg text-yellow-400">{anomaly.title}</h4>
        <div className="text-sm text-slate-400 mt-1">
            <span>Sensor(s): <span className="font-mono text-slate-200">{anomaly.sensorIds.join(', ')}</span></span>
            <span className="mx-2">|</span>
            <span>Period: <span className="font-mono text-slate-200">{anomaly.timePeriod}</span></span>
        </div>
        <p className="text-slate-300 mt-4">{anomaly.description}</p>
        <AnomalyChart data={anomaly.trendData} />
        <div className="mt-4 pt-4 border-t border-slate-700">
            <h5 className="font-semibold text-cyan-400 mb-2">Recommendation</h5>
            <p className="text-sm text-slate-300">{anomaly.recommendation}</p>
        </div>
    </div>
);

const AnomalyDetectionView: React.FC = () => {
    const { analyze, data, loading, error } = useGeminiAnomalyDetection();

    const handleAnalysis = () => {
        if (window.confirm("This will use the Gemini API to analyze 6 months of historical data. This may be a resource-intensive operation. Do you want to proceed?")) {
            analyze();
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">AI-Powered Anomaly Detection</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-slate-300 max-w-3xl">
                        This tool uses AI to analyze 6 months of historical sensor data to identify subtle, long-term trends that may indicate developing issues before they become critical alerts.
                    </p>
                </div>
                <button
                    onClick={handleAnalysis}
                    disabled={loading}
                    className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center space-x-2 disabled:bg-slate-600 disabled:cursor-not-allowed flex-shrink-0"
                >
                    {loading ? (
                         <>
                            <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            {React.cloneElement(ICONS.anomalyDetection, { className: "h-5 w-5" })}
                            <span>Run Analysis</span>
                        </>
                    )}
                </button>
            </div>

            <div className="mt-6">
                {loading && (
                    <div className="text-center p-10">
                        <p className="text-slate-400 animate-pulse">AI is analyzing historical data, please wait...</p>
                    </div>
                )}
                {error && <p className="text-red-400 text-center p-10">{error}</p>}
                {data && data.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {data.map((anomaly, index) => <AnomalyCard key={index} anomaly={anomaly} />)}
                    </div>
                )}
                {data && data.length === 0 && !loading && (
                    <div className="bg-slate-800 p-10 rounded-2xl shadow-lg text-center">
                        <div className="text-green-400 mb-4">{React.cloneElement(ICONS.onlineSensors, { className: "h-12 w-12 mx-auto" })}</div>
                        <h3 className="text-xl font-semibold text-white">No Anomalies Detected</h3>
                        <p className="text-slate-400 mt-2">The AI analysis of long-term data did not find any significant developing trends. All sensors are operating within their normal historical parameters.</p>
                    </div>
                )}
                 {!data && !loading && !error && (
                    <div className="bg-slate-800 p-10 rounded-2xl shadow-lg text-center">
                        <div className="text-purple-400 mb-4">{React.cloneElement(ICONS.ai, { className: "h-12 w-12 mx-auto" })}</div>
                        <h3 className="text-xl font-semibold text-white">Ready to Analyze</h3>
                        <p className="text-slate-400 mt-2">Click the "Run Analysis" button to begin the AI-powered detection of long-term anomalies.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnomalyDetectionView;