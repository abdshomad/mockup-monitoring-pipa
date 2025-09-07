import { LoraWANDeviceBatteryHistoryPoint } from '../../types';
import { getRelativeDate } from '../../utils/time';

const generateBatteryHistory = (yearsOld: number, endVoltage: number): LoraWANDeviceBatteryHistoryPoint[] => {
    const history: LoraWANDeviceBatteryHistoryPoint[] = [];
    const startVoltage = 3.6;
    const totalDays = yearsOld * 365;
    const voltageDrop = startVoltage - endVoltage;

    for (let i = 0; i <= 36; i++) { // datapoint every month for ~3 years
        const daysAgo = Math.floor(totalDays - (i * (totalDays / 36)));
        if (daysAgo < 0) continue;

        const date = getRelativeDate({ days: -daysAgo });
        const voltage = startVoltage - (voltageDrop * ((totalDays - daysAgo) / totalDays)) + (Math.random() - 0.5) * 0.05;
        
        history.push({
            timestamp: new Date(date).toISOString(),
            voltage: parseFloat(voltage.toFixed(3)),
        });
    }
    return history; // oldest first
};


export const LORAWAN_DEVICE_BATTERY_HISTORY: Record<string, LoraWANDeviceBatteryHistoryPoint[]> = {
    // This device is old and has low battery, so its history should reflect that.
    'C9876B543210A54F': generateBatteryHistory(2.8, 2.85), // Almost 3 years old, ending at 2.85V
    // This device is also old but has a lower voltage, also low battery
    'A8B9CADBDCEDFE01': generateBatteryHistory(2.9, 2.75), // Almost 3 years old, ending at 2.75V
    // A healthy device for comparison
    'A8610A3232387A6E': generateBatteryHistory(1, 3.5), // 1 year old, ending at 3.5V
};
