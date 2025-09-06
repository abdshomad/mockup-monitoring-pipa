import { AIInsight } from '../../types';

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai-1',
    category: 'Predictive Maintenance',
    title: 'Sensor P-VIB-008 Power Degradation',
    insight: 'Power level for P-VIB-008 is trending down 5% faster than model predictions. Recommend scheduling battery inspection within the next 14 days to prevent unplanned downtime.',
    icon: 'predictiveMaintenance',
  },
  {
    id: 'ai-2',
    category: 'Operational Efficiency',
    title: 'Pressure Stabilization Opportunity',
    insight: 'Minor pressure fluctuations in the Green Line correlate with pump station startups. Adjusting the ramp-up sequence could improve flow consistency by up to 3%.',
    icon: 'operationalEfficiency',
  },
  {
    id: 'ai-3',
    category: 'Risk Assessment',
    title: 'Increased Vibration in Interchange',
    insight: 'The recent alert on P-VIB-002 is part of a pattern of increased low-level vibration over the past 48 hours. This elevates the risk score for the Interchange segment by 15%.',
    icon: 'riskAssessment',
  },
];
