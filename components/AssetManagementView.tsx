import React, { useState, useMemo } from 'react';
import { ASSETS } from '../constants';
import { Asset } from '../types';

type SortKey = keyof Asset;
type SortOrder = 'asc' | 'desc';

const AssetManagementView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'assetId', order: 'asc' });

    const sortedAssets = useMemo(() => {
        let sortableAssets = [...ASSETS];
        if (sortConfig !== null) {
            sortableAssets.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.order === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableAssets;
    }, [sortConfig]);

    const filteredAssets = sortedAssets.filter(asset =>
        Object.values(asset).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
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
        if (sortConfig.key !== key) return null;
        return sortConfig.order === 'asc' ? ' ▲' : ' ▼';
    };

    return (
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
                                {Object.keys(ASSETS[0]).map(key => (
                                    <th key={key} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort(key as SortKey)}>
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        {getSortIndicator(key as SortKey)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset.assetId} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{asset.assetId}</td>
                                    <td className="px-6 py-4">{asset.sensorId}</td>
                                    <td className="px-6 py-4">{asset.model}</td>
                                    <td className="px-6 py-4">{asset.serialNumber}</td>
                                    <td className="px-6 py-4">{asset.deploymentDate}</td>
                                    <td className="px-6 py-4">{asset.warrantyEndDate}</td>
                                    <td className="px-6 py-4">{asset.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssetManagementView;