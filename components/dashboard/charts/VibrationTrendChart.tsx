import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VibrationDataPoint } from '../../../types';
import { CustomTooltip } from './CustomTooltip';

interface VibrationTrendChartProps {
    data: VibrationDataPoint[];
}

const VibrationTrendChart: React.FC<VibrationTrendChartProps> = ({ data }) => (
     <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
        <h4 className="font-semibold text-slate-200 mb-4">Vibration Trend (G)</h4>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" wrapperStyle={{fontSize: "14px", top: "-10px"}} align="right" />
                    <Line name="Average" type="monotone" dataKey="avg" stroke="#a78bfa" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line name="Maximum" type="monotone" dataKey="max" stroke="#f472b6" strokeWidth={2} activeDot={{ r: 6 }} dot={
                        (props: any) => {
                            const { cx, cy, payload } = props;
                            if (payload.max > 1.0) {
                                return <circle cx={cx} cy={cy} r={5} fill="#ef4444" stroke="#fff" strokeWidth={1} />;
                            }
                            return null;
                        }
                    }/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default VibrationTrendChart;
