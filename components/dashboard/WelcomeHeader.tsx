import React from 'react';

interface WelcomeHeaderProps {
    activeAlerts: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ activeAlerts }) => (
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
);

export default WelcomeHeader;
