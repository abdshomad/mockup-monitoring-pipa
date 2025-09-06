import React from 'react';
import { Asset } from '../../types';
import { getMaintenanceStatusBadgeClass } from '../../utils/badgeStyles';

interface AssetProfileViewProps {
    asset: Asset;
    onBack: () => void;
    onScheduleMaintenance: (asset: Asset) => void;
}

const AssetProfileView: React.FC<AssetProfileViewProps> = ({ asset, onBack, onScheduleMaintenance }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Asset Profile: <span className="text-cyan-400">{asset.assetId}</span></h2>
                <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                    &larr; Back to Inventory
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-800 p-4 rounded-2xl shadow-lg">
                        <img src={asset.imageUrl} alt={`Installed asset ${asset.assetId}`} className="rounded-lg w-full aspect-[4/3] object-cover bg-slate-700" />
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="font-semibold text-white mb-4">Core Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-400">Sensor ID</span><span className="font-mono text-cyan-400">{asset.sensorId}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Model</span><span className="font-mono text-white">{asset.model}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Serial No.</span><span className="font-mono text-white">{asset.serialNumber}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Status</span><span className="font-medium text-white">{asset.status}</span></div>
                        </div>
                    </div>
                </div>
                 <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="font-semibold text-white mb-4">Technical Specifications</h3>
                         <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-400">Operating Temp.</span><span className="font-mono text-white">{asset.technicalSpecifications.operatingTemp}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Pressure Accuracy</span><span className="font-mono text-white">{asset.technicalSpecifications.accuracy.pressure}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Vibration Accuracy</span><span className="font-mono text-white">{asset.technicalSpecifications.accuracy.vibration}</span></div>
                        </div>
                    </div>
                     <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                        <h3 className="font-semibold text-white mb-4">Installation & Lifecycle</h3>
                         <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-400">Installed By</span><span className="font-mono text-white">{asset.installationDetails.installedBy}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">QA Check ID</span><span className="font-mono text-white">{asset.installationDetails.qaCheckId}</span></div>
                             <div className="flex justify-between items-center"><span className="text-slate-400">Deployment Date</span><span className="font-mono text-white">{asset.deploymentDate}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Warranty End</span><span className="font-mono text-white">{asset.warrantyEndDate}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400">Firmware Version</span><span className="font-mono text-white">{asset.firmwareVersion}</span></div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Maintenance History</h3>
                            <button onClick={() => onScheduleMaintenance(asset)} className="px-3 py-1.5 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                                Schedule New Maintenance
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-60 pr-2">
                            {asset.maintenanceHistory && asset.maintenanceHistory.length > 0 ? (
                                <table className="w-full text-xs text-left text-slate-400">
                                    <thead className="text-slate-300 uppercase bg-slate-700/50 sticky top-0">
                                        <tr>
                                            <th scope="col" className="px-4 py-2">Task</th>
                                            <th scope="col" className="px-4 py-2">Date</th>
                                            <th scope="col" className="px-4 py-2">Technician</th>
                                            <th scope="col" className="px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {asset.maintenanceHistory.map(task => (
                                            <tr key={task.id}>
                                                <td className="px-4 py-2 font-medium text-white">{task.task}</td>
                                                <td className="px-4 py-2">{task.scheduledDate}</td>
                                                <td className="px-4 py-2">{task.assignedTechnician}</td>
                                                <td className="px-4 py-2"><span className={`px-2 py-1 font-semibold rounded-full ${getMaintenanceStatusBadgeClass(task.status)}`}>{task.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-slate-500 py-4">No maintenance history for this asset.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetProfileView;
