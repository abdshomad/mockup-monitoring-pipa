

import React, { useState } from 'react';
import { Sensor, Alert, Incident } from '../../types';
import IndonesiaMapSvg from './pipeline/IndonesiaMapSvg';
import { useHeatmapPoints } from '../../hooks/useHeatmapPoints';
import HeatmapLayer from './pipeline/HeatmapLayer';
import MarkersLayer from './pipeline/MarkersLayer';
import TooltipLayer from './pipeline/TooltipLayer';
import AnnotationLayer from './map/AnnotationLayer';
import TechnicianTrackerLayer from './map/TechnicianTrackerLayer';
import { TECHNICIANS } from '../../constants';

interface IndonesiaPipelineMapProps {
    sensors: Sensor[];
    alerts: Alert[];
    currentTime: Date;
    incident?: Incident;
    isIncidentMode: boolean;
}

const IndonesiaPipelineMap: React.FC<IndonesiaPipelineMapProps> = ({ sensors, alerts, currentTime, incident, isIncidentMode }) => {
    const [hoveredSensor, setHoveredSensor] = useState<Sensor | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const heatmapPoints = useHeatmapPoints(currentTime);

    const handleMapClick = () => {
        setSelectedAlert(null);
    };
    
    const handleAlertClick = (e: React.MouseEvent, alert: Alert) => {
        e.stopPropagation();
        setSelectedAlert(alert);
    };

    return (
        <div className="relative w-full h-full bg-slate-700">
            <IndonesiaMapSvg />
            <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 1195 625" 
                className="absolute top-0 left-0"
                onClick={handleMapClick}
            >
                <defs>
                    <filter id="heatmapBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                    </filter>
                </defs>

                <HeatmapLayer points={heatmapPoints} />
                
                <MarkersLayer
                    alerts={alerts}
                    sensors={sensors}
                    onAlertClick={handleAlertClick}
                    onSensorHover={setHoveredSensor}
                />
                
                {isIncidentMode && <AnnotationLayer annotations={incident?.mapAnnotations || []} />}
                {isIncidentMode && <TechnicianTrackerLayer technicians={TECHNICIANS} />}
                
                <TooltipLayer
                    hoveredSensor={hoveredSensor}
                    selectedAlert={selectedAlert}
                />
            </svg>
        </div>
    );
};

export default IndonesiaPipelineMap;