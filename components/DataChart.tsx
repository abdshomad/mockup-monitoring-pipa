import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface DataChartProps {
  data: ChartDataPoint[];
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis yAxisId="left" stroke="#60a5fa" label={{ value: 'Pressure (PSI)', angle: -90, position: 'insideLeft', fill: '#60a5fa' }}/>
          <YAxis yAxisId="right" orientation="right" stroke="#f87171" label={{ value: 'Vibration (G)', angle: -90, position: 'insideRight', fill: '#f87171' }}/>
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.8)', 
                borderColor: '#4b5563',
                color: '#e2e8f0'
            }} 
          />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="pressure" stroke="#60a5fa" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="vibration" stroke="#f87171" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
