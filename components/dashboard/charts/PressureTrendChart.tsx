import React from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PressureDataPoint } from '../../../types';
import { CustomTooltip } from './CustomTooltip';

interface PressureTrendChartProps {
    data: PressureDataPoint[];
}

const PressureTrendChart: React.FC<PressureTrendChartProps> = ({ data }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
        <h4 className="font-semibold text-slate-200 mb-4">Pressure Trend (PSI)</h4>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9ca3af" domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="range" stroke="#22d3ee" fill="url(#colorPressure)" strokeWidth={2} name="Operating Range" />
                    <Line type="monotone" dataKey="avg" stroke="#38bdf8" strokeWidth={2} name="Average" dot={false} activeDot={{ r: 6 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default PressureTrendChart;
