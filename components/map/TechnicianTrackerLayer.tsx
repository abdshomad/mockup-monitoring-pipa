import React from 'react';
import { Technician } from '../../types';
import TechnicianMarker from './TechnicianMarker';

interface TechnicianTrackerLayerProps {
    technicians: Technician[];
}

const TechnicianTrackerLayer: React.FC<TechnicianTrackerLayerProps> = ({ technicians }) => {
    const activeTechnicians = technicians.filter(t => t.currentLocation);

    return (
        <g>
            {activeTechnicians.map(technician => (
                <TechnicianMarker key={technician.id} technician={technician} />
            ))}
        </g>
    );
};

export default TechnicianTrackerLayer;
