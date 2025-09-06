import { LoraWANGateway, LoraWANDevice, LoraWANGatewayStatus, LoraWANDeviceStatus } from '../../types';
import { getRelativeTimestamp } from '../../utils/time';

export const LORAWAN_GATEWAYS: LoraWANGateway[] = [
    { id: 'GW-01-REDLINE', status: LoraWANGatewayStatus.Online, location: 'Red Line - Sector A', connectedDevices: 5 },
    { id: 'GW-02-BLUELINE', status: LoraWANGatewayStatus.Online, location: 'Blue Line - Sector C', connectedDevices: 4 },
    { id: 'GW-03-GREENLINE', status: LoraWANGatewayStatus.Offline, location: 'Green Line - Sector B', connectedDevices: 0 },
    { id: 'GW-04-INTERCHANGE', status: LoraWANGatewayStatus.Online, location: 'Interchange Hub', connectedDevices: 3 },
];

export const LORAWAN_DEVICES: LoraWANDevice[] = [
    // Devices for GW-01
    { id: 'A8610A3232387A6E', type: 'Vibration Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 98, rssi: -75, snr: 8.5, lastUplink: getRelativeTimestamp({ minutes: -2 }), gatewayId: 'GW-01-REDLINE' },
    { id: 'B1234C567890D12E', type: 'Pressure Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 95, rssi: -82, snr: 7.2, lastUplink: getRelativeTimestamp({ minutes: -5 }), gatewayId: 'GW-01-REDLINE' },
    { id: 'C9876B543210A54F', type: 'Acoustic Sensor', status: LoraWANDeviceStatus.LowBattery, batteryLevel: 25, rssi: -90, snr: 5.0, lastUplink: getRelativeTimestamp({ minutes: -10 }), gatewayId: 'GW-01-REDLINE' },
    { id: 'D1122E334455F66A', type: 'Flowmeter', status: LoraWANDeviceStatus.Online, batteryLevel: 88, rssi: -78, snr: 9.1, lastUplink: getRelativeTimestamp({ minutes: -1 }), gatewayId: 'GW-01-REDLINE' },
    { id: 'E6655D443322A11B', type: 'Vibration Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 99, rssi: -72, snr: 9.8, lastUplink: getRelativeTimestamp({ minutes: -3 }), gatewayId: 'GW-01-REDLINE' },

    // Devices for GW-02
    { id: 'F1A2B3C4D5E6A7B8', type: 'Pressure Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 91, rssi: -85, snr: 6.5, lastUplink: getRelativeTimestamp({ minutes: -4 }), gatewayId: 'GW-02-BLUELINE' },
    { id: 'A2B3C4D5E6F7A8B9', type: 'Acoustic Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 85, rssi: -88, snr: 6.0, lastUplink: getRelativeTimestamp({ minutes: -6 }), gatewayId: 'GW-02-BLUELINE' },
    { id: 'B3C4D5E6F7A8B9CA', type: 'Flowmeter', status: LoraWANDeviceStatus.Offline, batteryLevel: 75, rssi: -110, snr: -5.2, lastUplink: getRelativeTimestamp({ hours: -3 }), gatewayId: 'GW-02-BLUELINE' },
    { id: 'C4D5E6F7A8B9CADB', type: 'Vibration Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 93, rssi: -80, snr: 7.8, lastUplink: getRelativeTimestamp({ minutes: -2 }), gatewayId: 'GW-02-BLUELINE' },
    
    // Devices for GW-03 (should all be offline)
    { id: 'D5E6F7A8B9CADBDC', type: 'Pressure Sensor', status: LoraWANDeviceStatus.Offline, batteryLevel: 80, rssi: -120, snr: -15.0, lastUplink: getRelativeTimestamp({ hours: -5 }), gatewayId: 'GW-03-GREENLINE' },
    { id: 'E6F7A8B9CADBDCED', type: 'Acoustic Sensor', status: LoraWANDeviceStatus.Offline, batteryLevel: 78, rssi: -120, snr: -15.0, lastUplink: getRelativeTimestamp({ hours: -6 }), gatewayId: 'GW-03-GREENLINE' },

    // Devices for GW-04
    { id: 'F7A8B9CADBDCEDFE', type: 'Vibration Sensor', status: LoraWANDeviceStatus.Online, batteryLevel: 96, rssi: -70, snr: 10.2, lastUplink: getRelativeTimestamp({ minutes: -1 }), gatewayId: 'GW-04-INTERCHANGE' },
    { id: 'A8B9CADBDCEDFE01', type: 'Pressure Sensor', status: LoraWANDeviceStatus.LowBattery, batteryLevel: 18, rssi: -95, snr: 4.1, lastUplink: getRelativeTimestamp({ minutes: -15 }), gatewayId: 'GW-04-INTERCHANGE' },
    { id: 'B9CADBDCEDFE0123', type: 'Flowmeter', status: LoraWANDeviceStatus.Online, batteryLevel: 89, rssi: -73, snr: 9.5, lastUplink: getRelativeTimestamp({ minutes: -4 }), gatewayId: 'GW-04-INTERCHANGE' },
];