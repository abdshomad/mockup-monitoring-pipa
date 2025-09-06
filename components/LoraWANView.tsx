import React, { useState, useMemo } from 'react';
import { LORAWAN_DEVICES, LORAWAN_GATEWAYS } from '../constants';
import { LoraWANDevice, LoraWANGateway, LoraWANDeviceStatus, LoraWANGatewayStatus } from '../types';
import { getLoraDeviceStatusBadgeClass, getLoraGatewayStatusBadgeClass } from '../utils/badgeStyles';
import { Server, Wifi, BatteryWarning, WifiOff } from 'lucide-react';

const getSignalStrengthColor = (rssi: number) => {
    if (rssi > -80) return 'text-green-400';
    if (rssi > -100) return 'text-yellow-400';
    return 'text-red-400';
};

const GatewayCard: React.FC<{ gateway: LoraWANGateway }> = ({ gateway }) => (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg flex items-start space-x-4">
        <div className={`p-3 rounded-full bg-slate-700/50 ${gateway.status === LoraWANGatewayStatus.Online ? 'text-cyan-400' : 'text-red-400'}`}>
            {gateway.status === LoraWANGatewayStatus.Online ? <Server className="h-7 w-7" /> : <Server className="h-7 w-7 opacity-50" />}
        </div>
        <div>
            <p className="font-bold text-white">{gateway.id}</p>
            <p className="text-sm text-slate-400">{gateway.location}</p>
            <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLoraGatewayStatusBadgeClass(gateway.status)}`}>{gateway.status}</span>
                <div className="flex items-center text-slate-300">
                    <Wifi className="h-4 w-4 mr-1.5" />
                    <span>{gateway.connectedDevices} Devices</span>
                </div>
            </div>
        </div>
    </div>
);


const LoraWANView: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<LoraWANDeviceStatus | null>(null);

    const filteredDevices = useMemo(() => {
        return LORAWAN_DEVICES.filter(device => !statusFilter || device.status === statusFilter);
    }, [statusFilter]);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-white">LoRaWAN Network Health</h2>
                <p className="text-slate-300 mt-1">Monitor the status and performance of your LoRaWAN gateways and end-devices.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {LORAWAN_GATEWAYS.map(gw => <GatewayCard key={gw.id} gateway={gw} />)}
            </div>
            
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
                                <tr key={device.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
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