import { AIInsight } from '../../types';

export const LORAWAN_INSIGHTS: AIInsight[] = [
  {
    id: 'lora-ai-1',
    category: 'Network Health',
    title: 'Gateway GW-03-GREENLINE Offline',
    insight: 'Gateway GW-03-GREENLINE has been offline for over 5 hours, affecting 2 devices. This gateway has a history of intermittent connectivity. Recommend dispatching a technician for on-site diagnostics.',
    icon: 'lorawan',
  },
  {
    id: 'lora-ai-2',
    category: 'Predictive Maintenance',
    title: 'Anomalous Signal Degradation on Device C9876B543210A54F',
    insight: 'This device is reporting low battery (25%) and poor signal (-90 dBm). The signal has degraded by 15 dBm in the last 48 hours, which is abnormal for this rate of battery decline. This may indicate an antenna issue. Prioritize for maintenance.',
    icon: 'predictiveMaintenance',
  },
  {
    id: 'lora-ai-3',
    category: 'Network Health',
    title: 'Potential RF Interference Detected',
    insight: 'Average SNR across the network has dropped by 2dB in the last 24 hours without a corresponding drop in RSSI. This pattern can indicate rising radio frequency (RF) noise in the area. Monitor for devices going offline.',
    icon: 'lorawan',
  },
];
