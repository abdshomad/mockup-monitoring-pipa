import React, { useState, useMemo } from 'react';
import { Asset } from '../../types';

type SortKey = keyof Asset;
type SortOrder = 'asc' | 'desc';

interface AssetListViewProps {
    assets: Asset[];
    onSelectAsset: (asset: Asset) => void;
}

const AssetListView: React.FC<AssetListViewProps> = ({ assets, onSelectAsset }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'assetId', order: 'asc' });

    const sortedAssets = useMemo(() => {
        let sortableAssets = [...assets];
        sortableAssets.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === 'asc' ? 1 : -1;
            return 0;
        });
        return sortableAssets;
    }, [assets, sortConfig]);

    const filteredAssets = sortedAssets.filter(asset =>
        Object.values(asset).some(value => {
            if (typeof value === 'object' && value !== null) return false;
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const requestSort = (key: SortKey) => {
        setSortConfig(prev => ({ key, order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc' }));
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

    return (
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
                                    <button onClick={() => onSelectAsset(asset)} className="font-medium text-cyan-400 hover:underline">View Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetListView;
