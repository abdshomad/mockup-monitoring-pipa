export enum LoraWANDeviceStatus {
    Online = 'Online',
    Offline = 'Offline',
    LowBattery = 'Low Battery',
}

export enum LoraWANGatewayStatus {
    Online = 'Online',
    Offline = 'Offline',
}

export interface LoraWANDevice {
    id: string; // Device EUI
    type: string;
    status: LoraWANDeviceStatus;
    batteryLevel: number; // percentage
    rssi: number; // Received Signal Strength Indicator (dBm)
    snr: number; // Signal-to-Noise Ratio (dB)
    lastUplink: string; // ISO timestamp
    gatewayId: string;
}

export interface LoraWANGateway {
    id: string;
    status: LoraWANGatewayStatus;
    location: string;
    connectedDevices: number;
}