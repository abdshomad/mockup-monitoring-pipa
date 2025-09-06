import React from 'react';
import { TECHNICIANS } from '../constants';
import { Technician } from '../types';

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-slate-700/50 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const TechnicianPerformanceView: React.FC = () => {
    const sortedTechnicians = [...TECHNICIANS].sort((a, b) => b.stats.tasksCompleted - a.stats.tasksCompleted);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Technician Performance Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Technicians" value={TECHNICIANS.length.toString()} />
                <StatCard title="Avg. Response Time" value={`${(TECHNICIANS.reduce((sum, t) => sum + t.stats.avgResponseTime, 0) / TECHNICIANS.length).toFixed(1)}h`} />
                <StatCard title="Overall Success Rate" value={`${(TECHNICIANS.reduce((sum, t) => sum + t.stats.successRate, 0) / TECHNICIANS.length).toFixed(1)}%`} />
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Performance Leaderboard</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Rank</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Team</th>
                                <th scope="col" className="px-6 py-3">Tasks Completed</th>
                                <th scope="col" className="px-6 py-3">Avg. Response (h)</th>
                                <th scope="col" className="px-6 py-3">Success Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTechnicians.map((tech: Technician, index) => (
                                <tr key={tech.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-bold text-white">#{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-cyan-400">{tech.name}</td>
                                    <td className="px-6 py-4">{tech.team}</td>
                                    <td className="px-6 py-4">{tech.stats.tasksCompleted}</td>
                                    <td className="px-6 py-4">{tech.stats.avgResponseTime}</td>
                                    <td className="px-6 py-4">{tech.stats.successRate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TechnicianPerformanceView;