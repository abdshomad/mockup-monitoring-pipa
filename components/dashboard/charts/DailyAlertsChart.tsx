import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertsTrendDataPoint } from '../../../types';
import { CustomTooltip } from './CustomTooltip';

interface DailyAlertsChartProps {
    data: AlertsTrendDataPoint[];
}

const DailyAlertsChart: React.FC<DailyAlertsChartProps> = ({ data }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
        <h4 className="font-semibold text-slate-200 mb-4">Daily Alerts</h4>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9ca3af" allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100, 116, 139, 0.2)'}} />
                    <Bar dataKey="count" name="Alerts">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.count >= 4 ? '#f59e0b' : '#60a5fa'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default DailyAlertsChart;
