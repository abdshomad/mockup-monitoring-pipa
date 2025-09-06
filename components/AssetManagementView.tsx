import React, { useState } from 'react';
import { ASSETS, TECHNICIANS } from '../constants';
import { Asset, MaintenanceStatus, MaintenanceTask } from '../types';
import ScheduleMaintenanceModal from './ScheduleMaintenanceModal';
import AssetListView from './asset-management/AssetListView';
import AssetProfileView from './asset-management/AssetProfileView';

const AssetManagementView: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>(ASSETS);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assetForMaintenance, setAssetForMaintenance] = useState<Asset | null>(null);
    
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
                <AssetListView assets={assets} onSelectAsset={setSelectedAsset} />
            </div>
        </>
    );
};

export default AssetManagementView;