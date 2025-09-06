
import React from 'react';

interface HeatmapPoint {
    id: string;
    x: number;
    y: number;
    intensity: number;
}

interface HeatmapLayerProps {
    points: HeatmapPoint[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points }) => (
    <g filter="url(#heatmapBlur)" className="pointer-events-none">
        {points.map(point => {
            const radius = 15 + point.intensity * 8;
            return (
                <circle
                    key={`heat-${point.id}`}
                    cx={point.x}
                    cy={point.y}
                    r={radius}
                    fill="rgba(239, 68, 68, 0.6)"
                />
            );
        })}
    </g>
);

export default HeatmapLayer;
