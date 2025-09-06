import { Sensor, Alert, SensorStatus, AlertSeverity, AlertStatus, ChartDataPoint, PressureDataPoint, VibrationDataPoint, AlertsTrendDataPoint, SensorType, RunningAlert, RunningAlertStatus, MaintenanceTask, MaintenanceStatus } from './types';

export const SENSORS: Sensor[] = [
  { id: 'P-VIB-001', type: SensorType.VibrationPressure, location: { lat: 34.0522, lng: -118.2437, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 92, lastSeen: '2024-07-31 10:00:00', vibration: 0.02, pressure: 502 },
  { id: 'P-VIB-002', type: SensorType.VibrationPressure, location: { lat: 34.0535, lng: -118.2465, segment: 'Interchange' }, status: SensorStatus.Alert, powerLevel: 88, lastSeen: '2024-07-31 10:00:05', vibration: 1.5, pressure: 480 },
  { id: 'P-VIB-003', type: SensorType.VibrationPressure, location: { lat: 34.0548, lng: -118.2493, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 95, lastSeen: '2024-07-31 10:00:03', vibration: 0.03, pressure: 501 },
  { id: 'P-VIB-004', type: SensorType.Acoustic, location: { lat: 34.0561, lng: -118.2521, segment: 'Blue Line' }, status: SensorStatus.Offline, powerLevel: 15, lastSeen: '2024-07-31 08:30:10', vibration: 0, pressure: 0 },
  { id: 'P-VIB-005', type: SensorType.Acoustic, location: { lat: 34.0574, lng: -118.2549, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 76, lastSeen: '2024-07-31 10:00:01', vibration: 0.04, pressure: 499 },
  { id: 'P-VIB-006', type: SensorType.Flowmeter, location: { lat: 34.0587, lng: -118.2577, segment: 'Red Line' }, status: SensorStatus.Alert, powerLevel: 81, lastSeen: '2024-07-31 09:55:15', vibration: 0.8, pressure: 350 },
  { id: 'P-VIB-007', type: SensorType.Flowmeter, location: { lat: 34.0600, lng: -118.2605, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: '2024-07-31 10:00:04', vibration: 0.02, pressure: 505 },
  { id: 'P-VIB-008', type: SensorType.Flowmeter, location: { lat: 34.0613, lng: -118.2633, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 65, lastSeen: '2024-07-31 09:59:58', vibration: 0.05, pressure: 498 },
];

export const TRANSPORT_LINES = {
    'Red Line': { color: '#f87171', path: 'M 50 125 H 650' }, // A bit more vibrant red
    'Blue Line': { color: '#60a5fa', path: 'M 150 50 V 250' },
    'Green Line': { color: '#4ade80', path: 'M 550 50 L 350 175 L 50 225' },
};

export const STATION_POSITIONS: { [key: string]: { x: number; y: number } } = {
  'P-VIB-001': { x: 50, y: 125 },
  'P-VIB-002': { x: 150, y: 125 }, // Interchange station
  'P-VIB-003': { x: 350, y: 125 },
  'P-VIB-006': { x: 550, y: 125 },
  'P-VIB-004': { x: 150, y: 50 },
  'P-VIB-005': { x: 150, y: 225 },
  'P-VIB-007': { x: 550, y: 50 },
  'P-VIB-008': { x: 200, y: 200 },
};


export const ALERTS: Alert[] = [
  { id: 'A-98721', timestamp: '2024-07-31 10:00:05', sensorId: 'P-VIB-002', type: 'Anomalous Vibration Detected', severity: AlertSeverity.Critical, status: AlertStatus.InProgress, location: { segment: 'Alpha-2' } },
  { id: 'A-98720', timestamp: '2024-07-31 09:55:15', sensorId: 'P-VIB-006', type: 'Sudden Pressure Drop', severity: AlertSeverity.High, status: AlertStatus.Acknowledged, location: { segment: 'Bravo-3' } },
  { id: 'A-98719', timestamp: '2024-07-31 09:45:30', sensorId: 'P-VIB-008', type: 'Low Power Warning', severity: AlertSeverity.Medium, status: AlertStatus.InProgress, location: { segment: 'Charlie-2' } },
  { id: 'A-98718', timestamp: '2024-07-30 14:12:00', sensorId: 'P-VIB-001', type: 'Minor Fluctuation', severity: AlertSeverity.Low, status: AlertStatus.Resolved, location: { segment: 'Alpha-1' } },
  { id: 'A-98717', timestamp: '2024-07-30 11:05:00', sensorId: 'P-VIB-005', type: 'Communication Timeout', severity: AlertSeverity.Medium, status: AlertStatus.Resolved, location: { segment: 'Bravo-2' } },
];

export const RUNNING_ALERTS: RunningAlert[] = [
    { id: 'RA-001', title: 'Potential Theft Activity', sensorId: 'P-VIB-002', startTime: '10:01 AM', status: RunningAlertStatus.PatrolDispatched, icon: 'security' },
    { id: 'RA-002', title: 'Pressure Anomaly', sensorId: 'P-VIB-006', startTime: '09:55 AM', status: RunningAlertStatus.Investigating, icon: 'investigating' },
    { id: 'RA-003', title: 'Low Power Warning', sensorId: 'P-VIB-008', startTime: '09:45 AM', status: RunningAlertStatus.Monitoring, icon: 'monitoring' },
];

export const MAINTENANCE_SCHEDULE: MaintenanceTask[] = [
  { id: 'M-001', sensorId: 'P-VIB-004', task: 'Battery Replacement & Full Diagnostic', scheduledDate: '2024-08-05', assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Scheduled },
  { id: 'M-002', sensorId: 'P-VIB-008', task: 'Routine Calibration Check', scheduledDate: '2024-08-02', assignedTechnician: 'Bob Williams', status: MaintenanceStatus.InProgress },
  { id: 'M-003', sensorId: 'P-VIB-005', task: 'Firmware Update v1.2.3', scheduledDate: '2024-07-29', assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Completed },
  { id: 'M-004', sensorId: 'P-VIB-002', task: 'Post-Alert Sensor Inspection', scheduledDate: '2024-08-03', assignedTechnician: 'Charlie Brown', status: MaintenanceStatus.Scheduled },
  { id: 'M-005', sensorId: 'P-VIB-006', task: 'Flowmeter Accuracy Verification', scheduledDate: '2024-07-30', assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Completed },
];


const generateActivityData = () => {
    const pressureData: PressureDataPoint[] = [];
    const vibrationData: VibrationDataPoint[] = [];
    const alertsTrendData: AlertsTrendDataPoint[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const dayLabel = `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`;

        // Place a noticeable anomaly 2 days ago (i=2)
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
    // Generate data for the last `points` hours
    for (let i = points - 1; i >= 0; i--) {
        const pointDate = new Date(now.getTime() - i * 60 * 60 * 1000);
        const timeLabel = `${pointDate.getHours().toString().padStart(2, '0')}:00`;

        let vibration = baseVib + (Math.random() - 0.5) * 0.02; // Normal fluctuation
        let pressure = basePres + (Math.random() - 0.5) * 4;   // Normal fluctuation

        // Inject a clear anomaly for alert sensors in the last 3 hours
        if (isAlert && i < 3) {
            vibration = baseVib + (Math.random() * 1.4) + 0.3; // Sharp, random spike
            pressure = basePres - (Math.random() * 150) - 30; // Sharp, random drop
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
    'P-VIB-004': [], // Offline sensor
    'P-VIB-005': generateHistory(0.04, 499, 24, false),
    'P-VIB-006': generateHistory(0.02, 505, 24, true),
    'P-VIB-007': generateHistory(0.02, 505, 24, false),
    'P-VIB-008': generateHistory(0.05, 498, 24, false),
};


export const ICONS = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  alerts: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  sensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>,
  maintenance: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  sensorVibrationPressure: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4z" /></svg>,
  sensorAcoustic: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5 5 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>,
  sensorFlowmeter: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
  totalSensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  activeAlerts: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  onlineSensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  systemStatus: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  trendUp: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>,
  trendDown: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17l5-5m0 0l-5-5m5 5H6" /></svg>,
  security: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  investigating: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  monitoring: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
};