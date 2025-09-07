import { AlertSeverity } from './alerts';

// --- AI & Charting Types ---

export interface AIInsight {
  id: string;
  category: 'Predictive Maintenance' | 'Operational Efficiency' | 'Risk Assessment' | 'Network Health';
  title: string;
  insight: string;
  // FIX: Add 'lorawan' to the icon's union type to support Network Health insights.
  icon: 'predictiveMaintenance' | 'operationalEfficiency' | 'riskAssessment' | 'lorawan';
}

export interface TimelineEvent {
  id: string;
  timestamp: number;
  description: string;
  severity: AlertSeverity;
  operator?: string;
}

export interface ChartDataPoint {
  time: string;
  vibration: number;
  pressure: number;
}

export interface PressureDataPoint {
  day: string;
  avg: number;
  range: [number, number];
}

export interface VibrationDataPoint {
  day: string;
  avg: number;
  max: number;
}

export interface AlertsTrendDataPoint {
  day: string;
  count: number;
}

export interface LongTermDataPoint {
    date: string;
    avgVibration: number;
    avgPressure: number;
}