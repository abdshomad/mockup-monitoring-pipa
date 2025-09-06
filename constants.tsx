
import { Sensor, Alert, SensorStatus, AlertSeverity, AlertStatus, ChartDataPoint } from './types';

export const SENSORS: Sensor[] = [
  { id: 'P-VIB-001', location: { lat: 34.0522, lng: -118.2437, segment: 'Alpha-1' }, status: SensorStatus.Online, powerLevel: 92, lastSeen: '2024-07-31 10:00:00', vibration: 0.02, pressure: 502 },
  { id: 'P-VIB-002', location: { lat: 34.0535, lng: -118.2465, segment: 'Alpha-2' }, status: SensorStatus.Alert, powerLevel: 88, lastSeen: '2024-07-31 10:00:05', vibration: 1.5, pressure: 480 },
  { id: 'P-VIB-003', location: { lat: 34.0548, lng: -118.2493, segment: 'Alpha-3' }, status: SensorStatus.Online, powerLevel: 95, lastSeen: '2024-07-31 10:00:03', vibration: 0.03, pressure: 501 },
  { id: 'P-VIB-004', location: { lat: 34.0561, lng: -118.2521, segment: 'Bravo-1' }, status: SensorStatus.Offline, powerLevel: 15, lastSeen: '2024-07-31 08:30:10', vibration: 0, pressure: 0 },
  { id: 'P-VIB-005', location: { lat: 34.0574, lng: -118.2549, segment: 'Bravo-2' }, status: SensorStatus.Online, powerLevel: 76, lastSeen: '2024-07-31 10:00:01', vibration: 0.04, pressure: 499 },
  { id: 'P-VIB-006', location: { lat: 34.0587, lng: -118.2577, segment: 'Bravo-3' }, status: SensorStatus.Alert, powerLevel: 81, lastSeen: '2024-07-31 09:55:15', vibration: 0.8, pressure: 350 },
  { id: 'P-VIB-007', location: { lat: 34.0600, lng: -118.2605, segment: 'Charlie-1' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: '2024-07-31 10:00:04', vibration: 0.02, pressure: 505 },
  { id: 'P-VIB-008', location: { lat: 34.0613, lng: -118.2633, segment: 'Charlie-2' }, status: SensorStatus.Online, powerLevel: 65, lastSeen: '2024-07-31 09:59:58', vibration: 0.05, pressure: 498 },
];

export const ALERTS: Alert[] = [
  { id: 'A-98721', timestamp: '2024-07-31 10:00:05', sensorId: 'P-VIB-002', type: 'Anomalous Vibration Detected', severity: AlertSeverity.Critical, status: AlertStatus.New, location: { segment: 'Alpha-2' } },
  { id: 'A-98720', timestamp: '2024-07-31 09:55:15', sensorId: 'P-VIB-006', type: 'Sudden Pressure Drop', severity: AlertSeverity.High, status: AlertStatus.Acknowledged, location: { segment: 'Bravo-3' } },
  { id: 'A-98719', timestamp: '2024-07-31 09:45:30', sensorId: 'P-VIB-008', type: 'Low Power Warning', severity: AlertSeverity.Medium, status: AlertStatus.InProgress, location: { segment: 'Charlie-2' } },
  { id: 'A-98718', timestamp: '2024-07-30 14:12:00', sensorId: 'P-VIB-001', type: 'Minor Fluctuation', severity: AlertSeverity.Low, status: AlertStatus.Resolved, location: { segment: 'Alpha-1' } },
  { id: 'A-98717', timestamp: '2024-07-30 11:05:00', sensorId: 'P-VIB-005', type: 'Communication Timeout', severity: AlertSeverity.Medium, status: AlertStatus.Resolved, location: { segment: 'Bravo-2' } },
];

export const CHART_DATA: ChartDataPoint[] = [
  { time: '09:00', vibration: 0.03, pressure: 501 },
  { time: '09:15', vibration: 0.02, pressure: 503 },
  { time: '09:30', vibration: 0.04, pressure: 499 },
  { time: '09:45', vibration: 0.8, pressure: 350 },
  { time: '10:00', vibration: 1.5, pressure: 480 },
  { time: '10:15', vibration: 0.05, pressure: 502 },
  { time: '10:30', vibration: 0.03, pressure: 500 },
];

export const ICONS = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  alerts: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  sensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>,
  totalSensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  activeAlerts: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  onlineSensors: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  systemStatus: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};
