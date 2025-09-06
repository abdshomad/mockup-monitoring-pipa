import React from 'react';
import { Sensor, Alert } from '../../types';
import { calculateHealthScore, getHealthScoreColorClasses } from '../../utils/healthScore';

interface SensorHealthScoreProps {
    sensor: Sensor;
    alerts: Alert[];
}

const SensorHealthScore: React.FC<SensorHealthScoreProps> = ({ sensor, alerts }) => {
    const healthScore = calculateHealthScore(sensor, alerts);
    const { text, bg, description } = getHealthScoreColorClasses(healthScore);

    return (
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
    );
};

export default SensorHealthScore;