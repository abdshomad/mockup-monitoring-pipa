import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateLatencyData = () => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            name: `${time.getHours()}:00`,
            latency: 20 + Math.random() * 15,
        });
    }
    return data;
};
const data = generateLatencyData();
const avgLatency = data.reduce((sum, item) => sum + item.latency, 0) / data.length;

const SystemHealthView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Health & Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-slate-800 p-5 rounded-2xl shadow-lg text-center">
                    <p className="text-sm text-slate-400 font-medium">Server Uptime (24h)</p>
                    <p className="text-4xl font-bold text-green-400 mt-2">99.98%</p>
                </div>
                 <div className="bg-slate-800 p-5 rounded-2xl shadow-lg text-center">
                    <p className="text-sm text-slate-400 font-medium">Avg. API Latency</p>
                    <p className="text-4xl font-bold text-cyan-400 mt-2">{avgLatency.toFixed(0)}ms</p>
                </div>
                 <div className="bg-slate-800 p-5 rounded-2xl shadow-lg text-center">
                    <p className="text-sm text-slate-400 font-medium">Database Connections</p>
                    <p className="text-4xl font-bold text-white mt-2">42</p>
                </div>
                 <div className="bg-slate-800 p-5 rounded-2xl shadow-lg text-center">
                    <p className="text-sm text-slate-400 font-medium">CPU Load</p>
                    <p className="text-4xl font-bold text-yellow-400 mt-2">15%</p>
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-96 flex flex-col">
                <h3 className="font-semibold text-white mb-4">Network Latency (ms) - Last 7 Hours</h3>
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6}/>
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#9ca3af" domain={[0, 'dataMax + 10']} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', borderColor: '#4b5563' }} />
                            <Area type="monotone" dataKey="latency" stroke="#22d3ee" fill="url(#colorLatency)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SystemHealthView;