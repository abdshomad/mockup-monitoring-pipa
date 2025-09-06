export type View =
  | 'Dashboard'
  | 'Alerts'
  | 'Incident Log'
  | 'Sensors'
  | 'Scheduled Maintenance'
  | 'Map View'
  // Pre-Construction
  | 'Planning'
  | 'Site Survey'
  | 'Design'
  | 'Approvals'
  // Construction
  | 'Implementation'
  | 'Quality Assurance'
  | 'Commissioning'
  // Maintenance
  | 'Asset Management'
  // Reporting
  | 'System Health'
  | 'Alert History'
  | 'Technician Performance'
  | 'LoRaWAN Network'
  // System
  | 'User Profile'
  | 'Notifications'
  | 'System Config';