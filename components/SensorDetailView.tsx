
import React from 'react';
import { SENSORS, ALERTS, SENSOR_HISTORY_DATA, ICONS } from '../constants';
import { Sensor, Alert, SensorStatus } from '../types';
import DataChart from './DataChart';
import { calculateHealthScore, getHealthScoreColorClasses } from '../utils/healthScore';

interface SensorDetailViewProps {
  sensorId: string;
  onBack: () => void;
}

const getStatusIndicatorClass = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online: return 'bg-green-500 text-green-100';
        case SensorStatus.Offline: return 'bg-red-500 text-red-100';
        case SensorStatus.Alert: return 'bg-red-500 text-red-100';
        default: return 'bg-slate-500 text-slate-100';
    }
};

const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
        case 'Critical': return 'bg-red-500/20 text-red-400';
        case 'High': return 'bg-orange-500/20 text-orange-400';
        case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
        case 'Low': return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const SensorDetailView: React.FC<SensorDetailViewProps> = ({ sensorId, onBack }) => {
  const sensor = SENSORS.find(s => s.id === sensorId);
  const sensorAlerts = ALERTS.filter(a => a.sensorId === sensorId).slice(0, 5);
  const sensorHistory = SENSOR_HISTORY_DATA[sensorId] || [];

  if (!sensor) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Sensor not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to List
        </button>
      </div>
    );
  }
  
  const statusClass = getStatusIndicatorClass(sensor.status);
  const healthScore = calculateHealthScore(sensor, ALERTS);
  const { text, bg, description } = getHealthScoreColorClasses(healthScore);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Sensor Details: <span className="text-cyan-400">{sensor.id}</span></h2>
        <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            &larr; Back to Sensors List
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Health Score</h3>
                <div className="text-center">
                    <p className={`text-6xl font-bold ${text}`}>{healthScore}</p>
                    <p className={`font-semibold mt-1 ${text}`}>{description}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 mt-4">
                    <div className={`${bg} h-2.5 rounded-full`} style={{ width: `${healthScore}%` }}></div>
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Current Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Status</span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClass}`}>{sensor.status}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-400">Power Level</span>
                        <span className="font-mono text-white">{sensor.powerLevel}%</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-400">Vibration</span>
                        <span className="font-mono text-white">{sensor.vibration.toFixed(2)} G</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-400">Pressure</span>
                        <span className="font-mono text-white">{sensor.pressure} PSI</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-400">Segment</span>
                        <span className="font-mono text-white">{sensor.location.segment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Last Seen</span>
                        <span className="font-mono text-white">{sensor.lastSeen}</span>
                    </div>
                </div>
            </div>
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Recent Alerts</h3>
                {sensorAlerts.length > 0 ? (
                    <ul className="space-y-3">
                        {sensorAlerts.map(alert => (
                            <li key={alert.id} className="text-sm p-3 bg-slate-700/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-slate-300">{alert.type}</p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">{alert.timestamp}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-slate-400 py-4">No recent alerts for this sensor.</p>
                )}
            </div>
        </div>
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
             <h3 className="text-xl font-semibold mb-4 text-white">24-Hour Performance</h3>
             {sensorHistory.length > 0 ? (
                <DataChart data={sensorHistory} />
             ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                    No historical data available for this offline sensor.
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default SensorDetailView;