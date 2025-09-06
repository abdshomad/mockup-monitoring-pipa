import React from 'react';
import { SENSORS, ALERTS, PRESSURE_DATA, VIBRATION_DATA, ALERTS_TREND_DATA, RUNNING_ALERTS } from '../constants';
import { SensorStatus, AlertStatus } from '../types';
import RunningAlertsTicker from './RunningAlertsTicker';
import WelcomeHeader from './dashboard/WelcomeHeader';
import StatCardsGrid from './dashboard/StatCardsGrid';
import DigitalTwinCard from './dashboard/DigitalTwinCard';
import RecentAlertsCard from './dashboard/RecentAlertsCard';
import ActivityCharts from './dashboard/ActivityCharts';

const Dashboard: React.FC = () => {
    const onlineSensors = SENSORS.filter(s => s.status === SensorStatus.Online).length;
    const activeAlerts = ALERTS.filter(a => a.status !== AlertStatus.Resolved).length;
    const criticalAlerts = ALERTS.filter(a => a.severity === "Critical" && a.status !== AlertStatus.Resolved).length;
    const recentAlerts = ALERTS.slice(0, 4);

    return (
        <div className="space-y-6">
            <WelcomeHeader activeAlerts={activeAlerts} />

            <StatCardsGrid 
                onlineSensors={onlineSensors}
                totalSensors={SENSORS.length}
                activeAlerts={activeAlerts}
                criticalAlerts={criticalAlerts}
            />
            
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
