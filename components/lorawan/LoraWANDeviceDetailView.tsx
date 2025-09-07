import React from 'react';
import { LORAWAN_DEVICES, LORAWAN_GATEWAYS, LORAWAN_DEVICE_HISTORY } from '../../constants';
import { getLoraDeviceStatusBadgeClass } from '../../utils/badgeStyles';
import { LoraWANDeviceStatus } from '../../types';
// FIX: The 'Rssi' icon does not exist in 'lucide-react'. Corrected to 'Rss'.
import { Battery, Rss, Server, RadioReceiver } from 'lucide-react';
import SignalHistoryChart from './SignalHistoryChart';
import DevicePredictiveAnalysis from './DevicePredictiveAnalysis';

interface LoraWANDeviceDetailViewProps {
  deviceId: string;
  onBack: () => void;
}

const LoraWANDeviceDetailView: React.FC<LoraWANDeviceDetailViewProps> = ({ deviceId, onBack }) => {
  const device = LORAWAN_DEVICES.find(d => d.id === deviceId);
  const gateway = LORAWAN_GATEWAYS.find(g => g.id === device?.gatewayId);
  const history = LORAWAN_DEVICE_HISTORY[deviceId] || [];

  if (!device) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Device not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to List
        </button>
      </div>
    );
  }

  const handleScheduleMaintenance = (deviceId: string, task: string) => {
    console.log(`Scheduling maintenance for ${deviceId}: ${task}`);
    alert(`A new maintenance task has been requested for device ${deviceId}:\n\n"${task}"\n\n(This is a placeholder action for demonstration purposes)`);
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-400';
    if (level > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (rssi: number) => {
    if (rssi > -80) return 'text-green-400';
    if (rssi > -100) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white">LoRaWAN Device Details</h2>
            <p className="text-cyan-400 font-mono">{device.id}</p>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            &larr; Back to Network View
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Core Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center"><span className="text-slate-400">Type</span><span className="font-medium text-white">{device.type}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Status</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLoraDeviceStatusBadgeClass(device.status)}`}>{device.status}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Last Uplink</span><span className="font-mono text-white">{device.lastUplink}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Gateway</span><span className="font-mono text-white">{device.gatewayId}</span></div>
                    {gateway && <div className="flex justify-between items-center"><span className="text-slate-400">Gateway Location</span><span className="font-medium text-white">{gateway.location}</span></div>}
                </div>
            </div>
            <DevicePredictiveAnalysis device={device} onScheduleMaintenance={handleScheduleMaintenance} />
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center space-x-6">
                <Battery className={`h-12 w-12 flex-shrink-0 ${getBatteryColor(device.batteryLevel)}`} />
                <div>
                    <h3 className="font-semibold text-white">Battery Health</h3>
                    <p className="text-3xl font-bold text-white mt-1">{device.batteryLevel}%</p>
                    {device.status === LoraWANDeviceStatus.LowBattery && <p className="text-yellow-400 text-sm font-semibold mt-1">Low Power Warning</p>}
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex items-start space-x-6">
                {/* FIX: The 'Rssi' icon does not exist in 'lucide-react'. Corrected to 'Rss'. */}
                <Rss className={`h-12 w-12 flex-shrink-0 ${getSignalColor(device.rssi)}`} />
                <div>
                    <h3 className="font-semibold text-white">Signal Quality</h3>
                    <div className="mt-2 space-y-1">
                        <p className="text-lg font-mono text-white">RSSI: {device.rssi} dBm</p>
                        <p className="text-lg font-mono text-white">SNR: {device.snr.toFixed(1)} dB</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
             <h3 className="text-xl font-semibold mb-4 text-white">24-Hour Signal Performance</h3>
             {history.length > 0 ? (
                <SignalHistoryChart data={history} />
             ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                    No historical signal data available for this device.
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default LoraWANDeviceDetailView;