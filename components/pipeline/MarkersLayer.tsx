
import React from 'react';
import { Alert, Sensor } from '../../types';
import AlertMarker from './AlertMarker';
import StationMarker from './StationMarker';

interface MarkersLayerProps {
    alerts: Alert[];
    sensors: Sensor[];
    onAlertClick: (e: React.MouseEvent, alert: Alert) => void;
    onSensorHover: (sensor: Sensor | null) => void;
}

const MarkersLayer: React.FC<MarkersLayerProps> = ({ alerts, sensors, onAlertClick, onSensorHover }) => (
    <>
        {alerts.map(alert => (
            <AlertMarker
                key={`alert-marker-${alert.id}`}
                alert={alert}
                onClick={(e) => onAlertClick(e, alert)}
            />
        ))}

        {sensors.map(sensor => (
            <StationMarker key={sensor.id} sensor={sensor} onHover={onSensorHover} />
        ))}
    </>
);

export default MarkersLayer;
