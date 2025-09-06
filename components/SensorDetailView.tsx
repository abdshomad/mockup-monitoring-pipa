import React from 'react';
import { SENSORS, ALERTS, SENSOR_HISTORY_DATA } from '../constants';
import DataChart from './DataChart';
import SensorHealthScore from './sensor-details/SensorHealthScore';
import SensorStatusDetails from './sensor-details/SensorStatusDetails';
import SensorRecentAlerts from './sensor-details/SensorRecentAlerts';

interface SensorDetailViewProps {
  sensorId: string;
  onBack: () => void;
}

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
            <SensorHealthScore sensor={sensor} alerts={ALERTS} />
            <SensorStatusDetails sensor={sensor} />
            <SensorRecentAlerts alerts={sensorAlerts} />
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