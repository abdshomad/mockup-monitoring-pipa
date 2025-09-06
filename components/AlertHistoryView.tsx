
import React, { useState } from 'react';
import { ALERTS } from '../constants';
import { Alert, AlertSeverity } from '../types';

const AlertHistoryView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [severityFilter, setSeverityFilter] = useState<AlertSeverity | null>(null);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const getSeverityBadgeClass = (severity: AlertSeverity) => {
        switch (severity) {
            case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
            case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
            case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
            case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const filteredAlerts = ALERTS.filter(alert => {
        const matchesSearch = searchTerm === '' ||
            alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.sensorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSeverity = !severityFilter || alert.severity === severityFilter;
        
        const alertDate = new Date(alert.timestamp.split(' ')[0]);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        const matchesDate = (!startDate || alertDate >= startDate) && (!endDate || alertDate <= endDate);

        return matchesSearch && matchesSeverity && matchesDate;
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Alert History & Analysis</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <p className="text-slate-300 mb-6">
                    A comprehensive, searchable archive of all past alerts. Use the filters below to analyze historical trends.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-slate-700/50 rounded-lg">
                    <input
                        type="text"
                        placeholder="Search by ID, sensor, type..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                     <select
                        value={severityFilter || ''}
                        onChange={e => setSeverityFilter(e.target.value as AlertSeverity || null)}
                        className="bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">All Severities</option>
                        {Object.values(AlertSeverity).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                         <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Alert ID</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Sensor ID</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Severity</th>
                                {/* FIX: The table header should be 'Stage' to match the data property. */}
                                <th scope="col" className="px-6 py-3">Stage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlerts.map(alert => (
                                 <tr key={alert.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{alert.id}</td>
                                    <td className="px-6 py-4">{alert.timestamp}</td>
                                    <td className="px-6 py-4">{alert.sensorId}</td>
                                    <td className="px-6 py-4">{alert.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span>
                                    </td>
                                     {/* FIX: The 'Alert' type does not have a 'status' property. Use 'stage' instead. */}
                                     <td className="px-6 py-4">{alert.stage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AlertHistoryView;