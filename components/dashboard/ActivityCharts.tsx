import React from 'react';
import { PressureDataPoint, VibrationDataPoint, AlertsTrendDataPoint } from '../../types';
import PressureTrendChart from './charts/PressureTrendChart';
import VibrationTrendChart from './charts/VibrationTrendChart';
import DailyAlertsChart from './charts/DailyAlertsChart';

interface ActivityChartsProps {
    pressureData: PressureDataPoint[];
    vibrationData: VibrationDataPoint[];
    alertsTrendData: AlertsTrendDataPoint[];
}

const ActivityCharts: React.FC<ActivityChartsProps> = ({ pressureData, vibrationData, alertsTrendData }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">System-Wide Activity (Last 7 Days)</h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <PressureTrendChart data={pressureData} />
            <VibrationTrendChart data={vibrationData} />
            <DailyAlertsChart data={alertsTrendData} />
        </div>
    </div>
);

export default ActivityCharts;
