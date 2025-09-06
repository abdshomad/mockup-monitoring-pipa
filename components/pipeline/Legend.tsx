import React from 'react';
import { TRANSPORT_LINES } from '../../constants';

const Legend: React.FC = () => (
    <g transform="translate(20, 200)">
        <rect width="110" height={Object.keys(TRANSPORT_LINES).length * 20 + 15} rx="5" fill="rgba(15, 23, 42, 0.7)" />
        {Object.entries(TRANSPORT_LINES).map(([name, { color }], index) => (
            <g key={name} transform={`translate(10, ${index * 20 + 15})`}>
                <rect y="-5" width="12" height="12" rx="3" fill={color} />
                <text x="20" y="4" fill="#e2e8f0" fontSize="12">{name}</text>
            </g>
        ))}
    </g>
);

export default Legend;
