import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { SENSORS, ALERTS, ICONS, PRESSURE_DATA, VIBRATION_DATA, ALERTS_TREND_DATA, RUNNING_ALERTS } from '../constants';
import { SensorStatus, AlertStatus } from '../types';
import StatCard from './StatCard';
import PipelineDigitalTwin from './PipelineDigitalTwin';
import RunningAlertsTicker from './RunningAlertsTicker';

// A custom tooltip component for consistent styling and better information display across charts.
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-lg shadow-lg text-sm">
                <p className="font-bold text-slate-200 mb-1">{label}</p>
                {payload.map((pld: any, index: number) => (
                    <div key={index} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: pld.stroke || pld.fill }}></div>
                            <span className="font-medium text-slate-300 capitalize">{pld.dataKey}:</span>
                        </div>
                        <span className="font-mono font-semibold text-white">{Array.isArray(pld.value) ? pld.value.join(' - ') : pld.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


const Dashboard: React.FC = () => {
    const onlineSensors = SENSORS.filter(s => s.status === SensorStatus.Online).length;
    const activeAlerts = ALERTS.filter(a => a.status !== AlertStatus.Resolved).length;
    const recentAlerts = ALERTS.slice(0, 4);

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'text-red-400';
            case 'High': return 'text-orange-400';
            case 'Medium': return 'text-yellow-400';
            default: return 'text-blue-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center animate-fade-in">
                <div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back, Operator!</h2>
                    <p className="text-slate-300 mt-1 max-w-lg">
                        {activeAlerts > 0 
                            ? `The system is operational, but there are ${activeAlerts} active alerts that require your attention. Please review the alerts log for details.`
                            : "All systems are operating normally. No active alerts to report at this time. Great job!"
                        }
                    </p>
                </div>
                <div className="text-left sm:text-right mt-4 sm:mt-0">
                    <p className="text-lg font-semibold text-slate-200">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-slate-400">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="System Status" value="Operational" icon={ICONS.systemStatus}>
                     <span className="text-sm font-medium text-green-400">All systems normal</span>
                </StatCard>
                <StatCard title="Total Sensors" value={SENSORS.length.toString()} icon={ICONS.totalSensors}>
                     <span className="text-sm font-medium text-slate-400">Across 3 segments</span>
                </StatCard>
                <StatCard title="Online Sensors" value={`${onlineSensors} / ${SENSORS.length}`} icon={ICONS.onlineSensors}>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(onlineSensors/SENSORS.length)*100}%` }}></div>
                    </div>
                </StatCard>
                <StatCard title="Active Alerts" value={activeAlerts.toString()} icon={ICONS.activeAlerts}>
                    <span className="text-sm font-medium text-red-400">{ALERTS.filter(a => a.severity === "Critical").length} critical</span>
                </StatCard>
            </div>
            
            {RUNNING_ALERTS.length > 0 && <RunningAlertsTicker alerts={RUNNING_ALERTS} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Pipeline Digital Twin</h3>
                    <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden relative">
                         <PipelineDigitalTwin sensors={SENSORS} />
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Recent Alerts</h3>
                    <ul className="space-y-4">
                        {recentAlerts.map(alert => (
                            <li key={alert.id} className="flex items-start space-x-3">
                                <div className={`mt-1 flex-shrink-0 h-2.5 w-2.5 rounded-full ${getSeverityClass(alert.severity).replace('text-', 'bg-')}`}></div>
                                <div>
                                    <p className="font-semibold text-slate-200">{alert.type}</p>
                                    <p className="text-sm text-slate-400">Sensor {alert.sensorId} - {alert.location.segment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">System-Wide Activity (Last 7 Days)</h3>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
                        <h4 className="font-semibold text-slate-200 mb-4">Pressure Trend (PSI)</h4>
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={PRESSURE_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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

                     <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
                        <h4 className="font-semibold text-slate-200 mb-4">Vibration Trend (G)</h4>
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={VIBRATION_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80 flex flex-col">
                        <h4 className="font-semibold text-slate-200 mb-4">Daily Alerts</h4>
                         <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ALERTS_TREND_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9ca3af" allowDecimals={false} tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100, 116, 139, 0.2)'}} />
                                    <Bar dataKey="count" name="Alerts">
                                         {ALERTS_TREND_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.count >= 4 ? '#f59e0b' : '#60a5fa'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;