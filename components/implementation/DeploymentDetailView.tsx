
import React from 'react';
import { SensorDeployment, DeploymentEvent } from '../../types';
import { getTimelineIcon } from './utils';

const DeploymentDetailView: React.FC<{ deployment: SensorDeployment; onBack: () => void; }> = ({ deployment, onBack }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white">Deployment Timeline: <span className="text-cyan-400">{deployment.id}</span></h2>
                <p className="text-slate-400">Sensor: {deployment.sensorId} | Asset: {deployment.assetId}</p>
            </div>
            <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                &larr; Back to Deployment List
            </button>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Lifecycle Events</h3>
            <div className="relative pl-6">
                <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
                <ul className="space-y-8">
                    {deployment.history.map((event: DeploymentEvent, index: number) => (
                        <li key={index} className="relative pl-6">
                            <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center text-cyan-400">
                                {getTimelineIcon(event.status)}
                            </div>
                            <div className="ml-4 bg-slate-900/30 p-4 rounded-lg">
                                <p className="text-md font-semibold text-slate-200">{event.status}</p>
                                <p className="text-sm text-slate-400">
                                    by <span className="font-semibold text-slate-300">{event.operator}</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">{event.timestamp}</p>
                                <div className="mt-3 pt-3 border-t border-slate-700/50">
                                    <p className="text-sm text-slate-300 leading-relaxed">{event.notes}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default DeploymentDetailView;
