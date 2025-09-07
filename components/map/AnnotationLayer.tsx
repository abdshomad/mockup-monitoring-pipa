import React from 'react';
import { MapAnnotation } from '../../types';

interface AnnotationLayerProps {
    annotations: MapAnnotation[];
}

const AnnotationLayer: React.FC<AnnotationLayerProps> = ({ annotations }) => {
    return (
        <g className="pointer-events-none">
            {annotations.map(annotation => {
                switch (annotation.type) {
                    case 'area':
                        const pointsStr = annotation.points.map(p => `${p.x},${p.y}`).join(' ');
                        return (
                            <polygon
                                key={annotation.id}
                                points={pointsStr}
                                fill={annotation.color}
                                stroke="rgba(255, 255, 255, 0.7)"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                            />
                        );
                    case 'text':
                         return (
                            <text
                                key={annotation.id}
                                x={annotation.points[0].x}
                                y={annotation.points[0].y}
                                fill={annotation.color}
                                fontSize="14"
                                fontWeight="bold"
                                stroke="#1e293b"
                                strokeWidth="0.5em"
                                paintOrder="stroke"
                                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                            >
                                {annotation.label}
                            </text>
                         );
                    default:
                        return null;
                }
            })}
        </g>
    );
};

export default AnnotationLayer;
