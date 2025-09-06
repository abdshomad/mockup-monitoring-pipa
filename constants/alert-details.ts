import { AlertSeverity } from '../types';

export interface AlertDetail {
  description: string;
  potentialCauses: string[];
  recommendedActions: string[];
}

export const ALERT_DETAILS: Record<string, AlertDetail> = {
  'Anomalous Vibration Detected': {
    description: 'High-frequency vibrations exceeding 1.5G detected, consistent with unauthorized excavation or heavy machinery operating near the pipeline.',
    potentialCauses: [
      'Unauthorized excavation or construction',
      'Attempted illegal hot-tapping for theft',
      'Heavy vehicle traffic over a shallow section',
      'Minor seismic activity',
    ],
    recommendedActions: [
      'Immediately dispatch a security patrol to the location.',
      'Cross-reference with known construction permits.',
      'Analyze real-time satellite imagery if available.',
      'Notify local law enforcement of potential theft attempt.',
    ],
  },
  'Sudden Pressure Drop': {
    description: 'A rapid decrease in internal pipeline pressure of over 30% within a 5-minute window, indicating a potential breach or significant leak.',
    potentialCauses: [
      'Pipeline rupture or puncture',
      'Major theft incident (hot-tapping)',
      'Emergency shutdown valve failure',
      'Sensor malfunction (less likely)',
    ],
    recommendedActions: [
      'Initiate emergency shutdown protocol for the affected segment.',
      'Isolate the pipeline segment by closing nearest valves.',
      'Dispatch leak detection and repair crews immediately.',
      'Activate environmental response team.',
    ],
  },
  'Low Power Warning': {
    description: 'The sensor\'s internal battery or energy harvesting system is reporting critically low power levels, risking imminent communication loss.',
    potentialCauses: [
      'Prolonged overcast weather (for solar-powered units)',
      'Internal battery end-of-life',
      'Damage to the power harvesting module',
      'Firmware issue causing high power drain',
    ],
    recommendedActions: [
      'Schedule a maintenance visit to replace the battery/unit.',
      'Increase polling interval to conserve power until maintenance.',
      'Check power generation diagnostics for the unit remotely.',
    ],
  },
  'Minor Fluctuation': {
    description: 'Minor, intermittent pressure and vibration readings outside of normal operational parameters, but below the threshold for a high-priority alert.',
    potentialCauses: [
        'Normal operational changes in product flow',
        'Temperature-related pressure changes',
        'Temporary nearby vibrations from distant sources',
    ],
    recommendedActions: [
        'Monitor the sensor closely for escalating trends.',
        'Correlate with operational logs for pump station activity.',
        'No immediate action required unless the trend continues or worsens.',
    ],
  },
  'Communication Timeout': {
    description: 'The central monitoring system has not received a signal from the sensor for three consecutive check-in intervals.',
    potentialCauses: [
        'Physical damage to the sensor or antenna',
        'Severe signal interference (e.g., solar flares, jamming)',
        'Sensor has gone completely offline due to power failure',
        'Network connectivity issue at the receiving station',
    ],
    recommendedActions: [
        'Attempt to remotely ping the device.',
        'Check the status of adjacent sensors to identify a localized issue.',
        'If unreachable, schedule a maintenance crew to investigate.',
        'Review network logs for any connectivity problems.',
    ],
  },
};