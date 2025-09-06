
import React from 'react';
import { Alert, Sensor } from '../../types';
import Tooltip from './Tooltip';
import AlertTooltip from './AlertTooltip';

interface TooltipLayerProps {
    hoveredSensor: Sensor | null;
    selectedAlert: Alert | null;
}

const TooltipLayer: React.FC<TooltipLayerProps> = ({ hoveredSensor, selectedAlert }) => (
    <>
        {hoveredSensor && <Tooltip sensor={hoveredSensor} />}
        {selectedAlert && <AlertTooltip alert={selectedAlert} />}
    </>
);

export default TooltipLayer;
