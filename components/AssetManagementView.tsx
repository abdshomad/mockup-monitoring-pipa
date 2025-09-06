import React, { useState, useMemo } from 'react';
import { ASSETS, TECHNICIANS } from '../constants';
import { Asset, MaintenanceStatus, MaintenanceTask } from '../types';
import ScheduleMaintenanceModal from './ScheduleMaintenanceModal';

type SortKey = keyof Asset;
type SortOrder = 'asc' | 'desc';

// --- Detail View Component ---
const AssetProfileView: React.FC<{ asset: Asset; onBack: () => void; onScheduleMaintenance: (asset: Asset) => void; }> = ({ asset, onBack, onScheduleMaintenance }) => {
    const getStatusBadgeClass = (status: MaintenanceStatus) => {
        switch (status) {
            case MaintenanceStatus.Scheduled: return 'bg-cyan-500/20 text-cyan-400';
            case MaintenanceStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
            case MaintenanceStatus.Completed: return 'bg-green-500/20 text-green-400';
        }
    };
    
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
                                                <td className="px-4 py-2"><span className={`px-2 py-1 font-semibold rounded-full ${getStatusBadgeClass(task.status)}`}>{task.status}</span></td>
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


const AssetManagementView: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>(ASSETS);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'assetId', order: 'asc' });
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assetForMaintenance, setAssetForMaintenance] = useState<Asset | null>(null);

    const sortedAssets = useMemo(() => {
        let sortableAssets = [...assets];
        sortableAssets.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.order === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortableAssets;
    }, [assets, sortConfig]);

    const filteredAssets = sortedAssets.filter(asset =>
        Object.values(asset).some(value => {
            if (typeof value === 'object' && value !== null) return false;
            return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }
        )
    );

    const requestSort = (key: SortKey) => {
        let order: SortOrder = 'asc';
        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    const getSortIndicator = (key: SortKey) => {
        if (sortConfig.key !== key) return ' ';
        return sortConfig.order === 'asc' ? '▲' : '▼';
    };

    const tableHeaders: { key: SortKey, label: string }[] = [
        { key: 'assetId', label: 'Asset ID' },
        { key: 'sensorId', label: 'Sensor ID' },
        { key: 'model', label: 'Model' },
        { key: 'firmwareVersion', label: 'Firmware' },
        { key: 'status', label: 'Status' },
    ];
    
    const handleOpenScheduleModal = (asset: Asset) => {
        setAssetForMaintenance(asset);
        setIsModalOpen(true);
    };

    const handleScheduleMaintenance = (data: { task: string; scheduledDate: string; assignedTechnician: string }) => {
        if (!assetForMaintenance) return;

        const newMaintenanceTask: MaintenanceTask = {
            id: `M-${Date.now()}`,
            sensorId: assetForMaintenance.sensorId,
            status: MaintenanceStatus.Scheduled,
            ...data
        };

        const updatedAssets = assets.map(asset => {
            if (asset.assetId === assetForMaintenance.assetId) {
                const updatedHistory = [...(asset.maintenanceHistory || []), newMaintenanceTask];
                return { ...asset, maintenanceHistory: updatedHistory };
            }
            return asset;
        });

        setAssets(updatedAssets);
        if (selectedAsset && selectedAsset.assetId === assetForMaintenance.assetId) {
            setSelectedAsset(prev => prev ? {...prev, maintenanceHistory: [...(prev.maintenanceHistory || []), newMaintenanceTask]} : null);
        }

        setIsModalOpen(false);
        setAssetForMaintenance(null);
    };

    if (selectedAsset) {
        return <AssetProfileView asset={selectedAsset} onBack={() => setSelectedAsset(null)} onScheduleMaintenance={handleOpenScheduleModal} />;
    }

    return (
        <>
            {assetForMaintenance && (
                 <ScheduleMaintenanceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSchedule={handleScheduleMaintenance}
                    technicians={TECHNICIANS}
                    assetId={assetForMaintenance.assetId}
                    sensorId={assetForMaintenance.sensorId}
                />
            )}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Asset Inventory</h2>
                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-slate-300">A complete inventory of all deployed hardware assets.</p>
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-400">
                            <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                                <tr>
                                    {tableHeaders.map(({ key, label }) => (
                                        <th key={key} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort(key)}>
                                            {label} <span className="text-cyan-400">{getSortIndicator(key)}</span>
                                        </th>
                                    ))}
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssets.map(asset => (
                                    <tr key={asset.assetId} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-medium text-white">{asset.assetId}</td>
                                        <td className="px-6 py-4">{asset.sensorId}</td>
                                        <td className="px-6 py-4">{asset.model}</td>
                                        <td className="px-6 py-4">{asset.firmwareVersion}</td>
                                        <td className="px-6 py-4">{asset.status}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setSelectedAsset(asset)} className="font-medium text-cyan-400 hover:underline">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssetManagementView;