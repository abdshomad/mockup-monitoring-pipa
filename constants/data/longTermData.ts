import { getRelativeDate } from '../../utils/time';
import { LongTermDataPoint } from '../../types';

const generateLongTermData = (sensorId: string, trend: boolean): LongTermDataPoint[] => {
    const data: LongTermDataPoint[] = [];
    for (let i = 5; i >= 0; i--) { // 6 months of data
        const date = getRelativeDate({ months: -i });
        const baseVibration = trend ? 0.05 + ((5 - i) * 0.015) : 0.05; // 0.05 -> 0.125 over 6 months
        const vibration = baseVibration + (Math.random() - 0.5) * 0.02;
        const pressure = 500 + (Math.random() - 0.5) * 5;

        data.push({
            date: date,
            avgVibration: parseFloat(vibration.toFixed(4)),
            avgPressure: parseFloat(pressure.toFixed(1)),
        });
    }
    return data;
};

export const LONG_TERM_SENSOR_DATA: Record<string, LongTermDataPoint[]> = {
    'P-VIB-001': generateLongTermData('P-VIB-001', false),
    'P-VIB-002': generateLongTermData('P-VIB-002', false),
    'P-VIB-003': generateLongTermData('P-VIB-003', false),
    'P-VIB-004': generateLongTermData('P-VIB-004', false),
    'P-VIB-005': generateLongTermData('P-VIB-005', true), // This one has the anomaly
    'P-VIB-006': generateLongTermData('P-VIB-006', false),
    'P-VIB-007': generateLongTermData('P-VIB-007', false),
    'P-VIB-008': generateLongTermData('P-VIB-008', false),
};
