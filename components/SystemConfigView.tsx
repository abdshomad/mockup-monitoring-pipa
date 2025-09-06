import React, { useState } from 'react';

const SystemConfigView: React.FC = () => {
    const [config, setConfig] = useState({
        vibrationThreshold: 1.5,
        pressureThreshold: 30, // Percentage drop
        pollingInterval: 5, // minutes
        adminEmail: 'admin@pipelinecorp.com'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Configuration</h2>
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
                <div className="bg-yellow-500/10 text-yellow-300 p-3 rounded-lg mb-6 text-sm">
                    <strong>Warning:</strong> Changes made here affect the entire system. Proceed with caution. (Admin only)
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3 border-b border-slate-700 pb-2">Alert Thresholds</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Vibration Threshold (G)</label>
                                <input type="number" name="vibrationThreshold" value={config.vibrationThreshold} onChange={handleInputChange}
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Pressure Drop Threshold (%)</label>
                                <input type="number" name="pressureThreshold" value={config.pressureThreshold} onChange={handleInputChange}
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600" />
                            </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-3 border-b border-slate-700 pb-2">System Settings</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Sensor Polling Interval (minutes)</label>
                                <input type="number" name="pollingInterval" value={config.pollingInterval} onChange={handleInputChange}
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Admin Notification Email</label>
                                <input type="email" name="adminEmail" value={config.adminEmail} onChange={handleInputChange}
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 border-t border-slate-700 pt-6 flex justify-end">
                     <button className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemConfigView;