import React, { useState, useMemo } from 'react';
import { LORAWAN_DEVICES, LORAWAN_GATEWAYS, LORAWAN_INSIGHTS } from '../constants';
import { LoraWANDevice, LoraWANGateway, LoraWANDeviceStatus, LoraWANGatewayStatus } from '../types';
import { getLoraDeviceStatusBadgeClass } from '../utils/badgeStyles';
import { Server, Wifi, BatteryWarning, WifiOff, Rss } from 'lucide-react';
import LoraWANDeviceDetailView from './lorawan/LoraWANDeviceDetailView';
import AIInsights from './dashboard/AIInsights';

const getSignalStrengthColor = (rssi: number) => {
    if (rssi > -80) return 'text-green-400';
    if (rssi > -100) return 'text-yellow-400';
    return 'text-red-400';
};

interface GatewayCardProps {
    gateway: LoraWANGateway & { avgRssi: number | null, avgSnr: number | null };
}

const GatewayCard: React.FC<GatewayCardProps> = ({ gateway }) => {
    const isOnline = gateway.status === LoraWANGatewayStatus.Online;
    const borderColor = isOnline ? 'border-cyan-500/50' : 'border-red-500/50';
    const textColor = isOnline ? 'text-cyan-400' : 'text-red-400';

    const avgSignalColor = getSignalStrengthColor(gateway.avgRssi ?? -120);

    return (
        <div className={`bg-slate-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between border-l-4 ${borderColor}`}>
            <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-slate-700/50 ${textColor}`}>
                    <Server className="h-7 w-7" />
                </div>
                <div>
                    <p className="font-bold text-white">{gateway.id}</p>
                    <p className="text-sm text-slate-400">{gateway.location}</p>
                </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center"><Wifi className="h-4 w-4 mr-2" /> Devices</span>
                    <span className="font-semibold text-white">{gateway.connectedDevices}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center"><Rss className="h-4 w-4 mr-2" /> Avg Signal</span>
                    {gateway.avgRssi !== null ? (
                        <span className={`font-mono font-semibold ${avgSignalColor}`}>
                            {gateway.avgRssi} / {gateway.avgSnr?.toFixed(1)}
                        </span>
                    ) : (
                        <span className="text-slate-500">N/A</span>
                    )}
                </div>
            </div>
        </div>
    );
};


const LoraWANView: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<LoraWANDeviceStatus | null>(null);
    const [gatewayFilter, setGatewayFilter] = useState<LoraWANGatewayStatus | null>(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

    const augmentedGateways = useMemo(() => {
        return LORAWAN_GATEWAYS.map(gateway => {
            const devices = LORAWAN_DEVICES.filter(d => d.gatewayId === gateway.id && d.status !== LoraWANDeviceStatus.Offline);
            if (devices.length === 0) {
                return { ...gateway, avgRssi: null, avgSnr: null };
            }
            const totalRssi = devices.reduce((sum, d) => sum + d.rssi, 0);
            const totalSnr = devices.reduce((sum, d) => sum + d.snr, 0);
            return {
                ...gateway,
                avgRssi: Math.round(totalRssi / devices.length),
                avgSnr: parseFloat((totalSnr / devices.length).toFixed(1)),
            };
        });
    }, []);

    const filteredGateways = useMemo(() => {
        return augmentedGateways.filter(gateway => !gatewayFilter || gateway.status === gatewayFilter);
    }, [gatewayFilter, augmentedGateways]);

    const filteredDevices = useMemo(() => {
        return LORAWAN_DEVICES.filter(device => !statusFilter || device.status === statusFilter);
    }, [statusFilter]);

    if (selectedDeviceId) {
        return <LoraWANDeviceDetailView deviceId={selectedDeviceId} onBack={() => setSelectedDeviceId(null)} />;
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-white">LoRaWAN Network Health</h2>
                <p className="text-slate-300 mt-1">Monitor the status and performance of your LoRaWAN gateways and end-devices.</p>
            </div>

            <div>
                 <h3 className="text-xl font-semibold mb-4 text-white">Gateway Status</h3>
                <div className="flex flex-wrap gap-2 items-center mb-6">
                    <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                    <button onClick={() => setGatewayFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!gatewayFilter ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                        All
                    </button>
                    {Object.values(LoraWANGatewayStatus).map(status => (
                        <button key={status} onClick={() => setGatewayFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${gatewayFilter === status ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                            {status}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredGateways.map(gw => <GatewayCard key={gw.id} gateway={gw} />)}
                </div>
            </div>
            
            <AIInsights insights={LORAWAN_INSIGHTS} />

            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                 <h3 className="text-xl font-semibold mb-6 text-white">Device Inventory</h3>
                 <div className="flex flex-wrap gap-2 items-center mb-6">
                    <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                    <button onClick={() => setStatusFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!statusFilter ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                        All
                    </button>
                    {Object.values(LoraWANDeviceStatus).map(status => (
                        <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${statusFilter === status ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                            {status}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Device EUI</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Battery</th>
                                <th scope="col" className="px-6 py-3">Signal (RSSI/SNR)</th>
                                <th scope="col" className="px-6 py-3">Last Uplink</th>
                                <th scope="col" className="px-6 py-3">Gateway</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device: LoraWANDevice) => (
                                <tr key={device.id} onClick={() => setSelectedDeviceId(device.id)} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer">
                                    <td className="px-6 py-4 font-mono text-white">{device.id}</td>
                                    <td className="px-6 py-4">{device.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLoraDeviceStatusBadgeClass(device.status)}`}>
                                            {device.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {device.status === LoraWANDeviceStatus.LowBattery && <BatteryWarning className="h-4 w-4 mr-1.5 text-yellow-400" />}
                                            <span>{device.batteryLevel}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center font-mono ${getSignalStrengthColor(device.rssi)}`}>
                                            {device.status === LoraWANDeviceStatus.Offline ? <WifiOff className="h-4 w-4 mr-1.5" /> : <Wifi className="h-4 w-4 mr-1.5" />}
                                            <span>{device.rssi} / {device.snr.toFixed(1)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{device.lastUplink}</td>
                                    <td className="px-6 py-4 font-mono">{device.gatewayId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default LoraWANView;