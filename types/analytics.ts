import { AlertSeverity } from './alerts';

// --- AI & Charting Types ---

export interface AIInsight {
  id: string;
  category: 'Predictive Maintenance' | 'Operational Efficiency' | 'Risk Assessment';
  title: string;
  insight: string;
  icon: 'predictiveMaintenance' | 'operationalEfficiency' | 'riskAssessment';
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
