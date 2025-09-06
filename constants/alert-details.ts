import { AlertSeverity } from '../types';

export interface AlertDetail {
  description: string;
  potentialCauses: string[];
  recommendedActions: string[];
  aiInsights?: {
    summary: string;
    probableCauses: string[];
    recommendedActions: string[];
  };
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
    aiInsights: {
      summary: 'The vibration signature strongly correlates (92% probability) with mechanical excavation, indicating a high risk of third-party interference or attempted theft. The pattern is inconsistent with natural seismic events.',
      probableCauses: [
        'Use of a backhoe or similar heavy machinery near the pipeline.',
        'An illegal tapping attempt in its initial stages.',
        'Significant, unreported civil works in the immediate vicinity.',
      ],
      recommendedActions: [
        'ACTION: Dispatch patrol with priority ETA under 15 minutes.',
        'ANALYZE: Review the last 24 hours of acoustic data for matching signatures.',
        'COMMUNICATE: Place the downstream valve on standby for a potential shutdown.',
      ]
    }
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
    aiInsights: {
        summary: 'A pressure drop of this magnitude and speed indicates a significant loss of containment. The flow rate differential between this sensor and the upstream sensor suggests a leak of approximately 300 barrels per hour.',
        probableCauses: [
            'A full-bore rupture due to corrosion or material fatigue.',
            'A catastrophic failure at a weld joint.',
            'A large-scale, professionally executed illegal tap.',
        ],
        recommendedActions: [
            'ACTION: Immediately execute automated shutdown of sector valves V-07a and V-08b.',
            'ASSESS: Model the potential spill plume based on terrain data and current weather.',
            'NOTIFY: Escalate to Level 1 Incident Command and notify environmental agencies.',
        ]
    }
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
    aiInsights: {
        summary: 'The power depletion rate has accelerated over the past 72 hours, which is atypical for weather-related issues. This suggests a hardware fault rather than an environmental cause.',
        probableCauses: [
            'Internal battery short circuit or cell failure.',
            'A firmware bug introduced in the last update is preventing deep sleep mode.',
            'Physical damage to the solar panel or power converter.',
        ],
        recommendedActions: [
            'ACTION: Schedule non-emergency maintenance within 5 business days.',
            'MITIGATE: Remotely roll back firmware to the previous stable version if possible.',
            'MONITOR: Increase alert threshold for adjacent sensors to compensate for potential loss of visibility.',
        ]
    }
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
    aiInsights: {
        summary: 'The fluctuations correlate with the operational spin-up of a pumping station 15km upstream. The pattern is consistent with normal hydraulic effects and does not indicate an anomaly at the sensor location.',
        probableCauses: [
            'Harmonics from upstream pumping station operations.',
            'Normal variations in product viscosity due to temperature shifts.',
            'Product slate changeover causing temporary pressure waves.',
        ],
        recommendedActions: [
            'ACKNOWLEDGE: Mark the alert as understood and add correlation to the event log.',
            'ADJUST: Consider a minor adjustment to the alerting threshold for this sensor if this pattern is frequent.',
            'NO ACTION: No field dispatch is necessary at this time.',
        ]
    }
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
    aiInsights: {
        summary: 'Adjacent sensors (P-VIB-003 and P-VIB-005) are reporting nominal signal strength, suggesting the issue is isolated to this specific unit and not a wider network problem.',
        probableCauses: [
            'Complete power failure of the unit (zero last-gasp transmission).',
            'Severe physical damage to the unit or its antenna.',
            'A critical firmware crash causing the device to become unresponsive.',
        ],
        recommendedActions: [
            'ACTION: Dispatch maintenance team to investigate the physical unit.',
            'VERIFY: Confirm the health of the local gateway and network backhaul as a precaution.',
            'REVIEW: Check the maintenance history for this asset for any recurring issues.',
        ]
    }
  },
};
