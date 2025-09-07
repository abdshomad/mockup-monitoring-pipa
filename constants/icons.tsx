import React from 'react';
import {
  LayoutGrid, Bell, Waypoints, Wrench, Map, BarChart3, Settings2,
  ClipboardList, Construction, ServerCog, Archive, Waves, Ear, Gauge,
  MapPin, AlertTriangle, CheckCircle2, Activity, TrendingUp, TrendingDown, SearchCode,
  Shield, Search, Eye, FileText, HelpCircle, ListChecks, Paperclip, File, Film,
  Sparkles, Send, X, Clipboard, PlayCircle, PauseCircle, Rewind,
  FastForward, Zap, ShieldCheck, Siren, KanbanSquare, Signal
} from 'lucide-react';

export const ICONS = {
  dashboard: <LayoutGrid />,
  alerts: <Bell />,
  kanban: <KanbanSquare />,
  incidentLog: <Siren />,
  sensors: <Waypoints />,
  maintenance: <Wrench />,
  map: <Map />,
  reporting: <BarChart3 />,
  settings: <Settings2 />,
  
  preConstruction: <ClipboardList />,
  construction: <Construction />,
  operations: <ServerCog />,
  assetManagement: <Archive />,

  sensorVibrationPressure: <Waves className="text-indigo-400" />,
  sensorAcoustic: <Ear className="text-pink-400" />,
  sensorFlowmeter: <Gauge className="text-sky-400" />,
  
  totalSensors: <MapPin className="h-8 w-8 text-cyan-400" />,
  activeAlerts: <AlertTriangle className="h-8 w-8 text-red-400" />,
  onlineSensors: <CheckCircle2 className="h-8 w-8 text-green-400" />,
  systemStatus: <Activity className="h-8 w-8 text-teal-400" />,

  trendUp: <TrendingUp className="h-4 w-4" />,
  trendDown: <TrendingDown className="h-4 w-4" />,
  
  security: <Shield className="h-5 w-5" />,
  investigating: <Search className="h-5 w-5" />,
  monitoring: <Eye className="h-5 w-5" />,

  // Alert Detail Icons
  description: <FileText className="h-6 w-6" />,
  causes: <HelpCircle className="h-6 w-6" />,
  actions: <ListChecks className="h-6 w-6" />,
  attachment: <Paperclip className="h-6 w-6" />,
  file: <File className="h-6 w-6" />,
  video: <Film className="h-6 w-6" />,
  ai: <Sparkles className="h-6 w-6" strokeWidth={1.5} />,
  send: <Send className="h-5 w-5" />,
  close: <X />,
  clipboard: <Clipboard className="h-5 w-5" />,
  play: <PlayCircle />,
  pause: <PauseCircle />,
  rewind: <Rewind />,
  fastForward: <FastForward />,

  // AI Insight Icons
  predictiveMaintenance: <Wrench className="h-6 w-6" />,
  operationalEfficiency: <Zap className="h-6 w-6" />,
  riskAssessment: <ShieldCheck className="h-6 w-6" />,
  lorawan: <Signal />,
  anomalyDetection: <SearchCode />,
};