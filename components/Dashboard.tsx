
import React from 'react';
import { SENSORS, ALERTS, PRESSURE_DATA, VIBRATION_DATA, ALERTS_TREND_DATA, RUNNING_ALERTS, AI_INSIGHTS } from '../constants';
// FIX: The 'AlertStatus' type is not exported; 'AlertWorkflowStage' should be used instead.
import { SensorStatus, View, AlertWorkflowStage } from '../types';
import RunningAlertsTicker from './RunningAlertsTicker';
import WelcomeHeader from './dashboard/WelcomeHeader';
import StatCardsGrid from './dashboard/StatCardsGrid';
import DigitalTwinCard from './dashboard/DigitalTwinCard';
import RecentAlertsCard from './dashboard/RecentAlertsCard';
import ActivityCharts from './dashboard/ActivityCharts';
import AIInsights from './dashboard/AIInsights';

interface DashboardProps {
    setCurrentView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentView }) => {
    const onlineSensors = SENSORS.filter(s => s.status === SensorStatus.Online).length;
    // FIX: The 'Alert' type does not have a 'status' property. Use 'stage' instead.
    const activeAlerts = ALERTS.filter(a => a.stage !== AlertWorkflowStage.Resolved).length;
    // FIX: The 'Alert' type does not have a 'status' property. Use 'stage' instead.
    const criticalAlerts = ALERTS.filter(a => a.severity === "Critical" && a.stage !== AlertWorkflowStage.Resolved).length;
    const recentAlerts = ALERTS.slice(0, 4);

    return (
        <div className="space-y-6">
            <WelcomeHeader activeAlerts={activeAlerts} />

            <StatCardsGrid 
                onlineSensors={onlineSensors}
                totalSensors={SENSORS.length}
                activeAlerts={activeAlerts}
                criticalAlerts={criticalAlerts}
                setCurrentView={setCurrentView}
            />

            <AIInsights insights={AI_INSIGHTS} />
            
            {RUNNING_ALERTS.length > 0 && <RunningAlertsTicker alerts={RUNNING_ALERTS} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DigitalTwinCard sensors={SENSORS} />
                <RecentAlertsCard recentAlerts={recentAlerts} />
            </div>

            <ActivityCharts 
                pressureData={PRESSURE_DATA}
                vibrationData={VIBRATION_DATA}
                alertsTrendData={ALERTS_TREND_DATA}
            />
        </div>
    );
};

export default Dashboard;