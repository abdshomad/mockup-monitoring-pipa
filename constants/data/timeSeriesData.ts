import { ChartDataPoint, PressureDataPoint, VibrationDataPoint, AlertsTrendDataPoint } from '../../types';

const generateActivityData = () => {
    const pressureData: PressureDataPoint[] = [];
    const vibrationData: VibrationDataPoint[] = [];
    const alertsTrendData: AlertsTrendDataPoint[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const dayLabel = `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`;

        if (i === 2) { 
            pressureData.push({ day: dayLabel, avg: 499.5, range: [480, 503] });
            vibrationData.push({ day: dayLabel, avg: 0.45, max: 1.5 });
            alertsTrendData.push({ day: dayLabel, count: 5 });
        } else {
            const avgPressure = 501 + (Math.random() - 0.5) * 4;
            pressureData.push({
                day: dayLabel,
                avg: parseFloat(avgPressure.toFixed(1)),
                range: [Math.floor(avgPressure - 3), Math.ceil(avgPressure + 3)],
            });

            const avgVibration = 0.03 + (Math.random() - 0.5) * 0.02;
            vibrationData.push({
                day: dayLabel,
                avg: parseFloat(avgVibration.toFixed(2)),
                max: parseFloat((avgVibration + 0.04 + Math.random() * 0.02).toFixed(2)),
            });

            alertsTrendData.push({
                day: dayLabel,
                count: Math.floor(Math.random() * 3),
            });
        }
    }
    return { pressureData, vibrationData, alertsTrendData };
};

const { 
    pressureData: generatedPressureData, 
    vibrationData: generatedVibrationData, 
    alertsTrendData: generatedAlertsTrendData 
} = generateActivityData();

export const PRESSURE_DATA: PressureDataPoint[] = generatedPressureData;
export const VIBRATION_DATA: VibrationDataPoint[] = generatedVibrationData;
export const ALERTS_TREND_DATA: AlertsTrendDataPoint[] = generatedAlertsTrendData;

const generateHistory = (baseVib: number, basePres: number, points: number, isAlert: boolean) => {
    const data: ChartDataPoint[] = [];
    const now = new Date();
    for (let i = points - 1; i >= 0; i--) {
        const pointDate = new Date(now.getTime() - i * 60 * 60 * 1000);
        const timeLabel = `${pointDate.getHours().toString().padStart(2, '0')}:00`;

        let vibration = baseVib + (Math.random() - 0.5) * 0.02;
        let pressure = basePres + (Math.random() - 0.5) * 4;

        if (isAlert && i < 3) {
            vibration = baseVib + (Math.random() * 1.4) + 0.3;
            pressure = basePres - (Math.random() * 150) - 30;
        }

        data.push({
            time: timeLabel,
            vibration: parseFloat(Math.max(0, vibration).toFixed(3)),
            pressure: parseFloat(Math.max(0, pressure).toFixed(0)),
        });
    }
    return data;
}

export const SENSOR_HISTORY_DATA: Record<string, ChartDataPoint[]> = {
    'P-VIB-001': generateHistory(0.02, 502, 24, false),
    'P-VIB-002': generateHistory(0.03, 500, 24, true),
    'P-VIB-003': generateHistory(0.03, 501, 24, false),
    'P-VIB-004': [],
    'P-VIB-005': generateHistory(0.04, 499, 24, false),
    'P-VIB-006': generateHistory(0.02, 505, 24, true),
    'P-VIB-007': generateHistory(0.02, 505, 24, false),
    'P-VIB-008': generateHistory(0.05, 498, 24, false),
};
