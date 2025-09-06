import React, { useState } from 'react';
import { AlertSeverity } from '../types';

const Toggle: React.FC<{ enabled: boolean, onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        type="button"
        className={`${enabled ? 'bg-cyan-500' : 'bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
    >
        <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);


const NotificationsView: React.FC = () => {
    const [prefs, setPrefs] = useState({
        email: {
            [AlertSeverity.Critical]: true,
            [AlertSeverity.High]: true,
            [AlertSeverity.Medium]: false,
            [AlertSeverity.Low]: false,
        },
        sms: {
            [AlertSeverity.Critical]: true,
            [AlertSeverity.High]: false,
            [AlertSeverity.Medium]: false,
            [AlertSeverity.Low]: false,
        }
    });

    const handleToggle = (channel: 'email' | 'sms', severity: AlertSeverity, value: boolean) => {
        setPrefs(p => ({
            ...p,
            [channel]: { ...p[channel], [severity]: value }
        }))
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
                <p className="text-slate-300 mb-6">
                    Configure how and when you receive alerts for different severity levels.
                </p>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Email Notifications</h3>
                        <div className="space-y-3">
                            {Object.values(AlertSeverity).map(severity => (
                                <div key={`email-${severity}`} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                                    <span className="font-medium text-slate-300">{severity} Alerts</span>
                                    <Toggle enabled={prefs.email[severity]} onChange={(val) => handleToggle('email', severity, val)} />
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-3">SMS Notifications</h3>
                        <div className="space-y-3">
                            {Object.values(AlertSeverity).map(severity => (
                                <div key={`sms-${severity}`} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                                    <span className="font-medium text-slate-300">{severity} Alerts</span>
                                     <Toggle enabled={prefs.sms[severity]} onChange={(val) => handleToggle('sms', severity, val)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="mt-8 border-t border-slate-700 pt-6 flex justify-end">
                     <button className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsView;