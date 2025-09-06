import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LoraWANDeviceHistoryPoint } from '../../types';

interface SignalHistoryChartProps {
  data: LoraWANDeviceHistoryPoint[];
}

const SignalHistoryChart: React.FC<SignalHistoryChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis yAxisId="left" stroke="#60a5fa" label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft', fill: '#60a5fa' }} domain={['dataMin - 10', 'dataMax + 5']} />
          <YAxis yAxisId="right" orientation="right" stroke="#f87171" label={{ value: 'SNR (dB)', angle: -90, position: 'insideRight', fill: '#f87171' }} domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.8)', 
                borderColor: '#4b5563',
                color: '#e2e8f0'
            }} 
          />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="rssi" name="RSSI" stroke="#60a5fa" strokeWidth={2} activeDot={{ r: 6 }} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="snr" name="SNR" stroke="#f87171" strokeWidth={2} activeDot={{ r: 6 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalHistoryChart;
