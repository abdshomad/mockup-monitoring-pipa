import React from 'react';

export const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-lg shadow-lg text-sm">
                <p className="font-bold text-slate-200 mb-1">{label}</p>
                {payload.map((pld: any, index: number) => (
                    <div key={index} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: pld.stroke || pld.fill }}></div>
                            <span className="font-medium text-slate-300 capitalize">{pld.name || pld.dataKey}:</span>
                        </div>
                        <span className="font-mono font-semibold text-white">{Array.isArray(pld.value) ? pld.value.join(' - ') : pld.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};
