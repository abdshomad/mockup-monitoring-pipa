import React from 'react';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
        <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
        <div className="text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

const surveyPoints = [
    { id: 'SP-001', segment: 'Red Line', coords: '34.0522, -118.2437', signal: -75, notes: 'Good accessibility, clear line of sight.' },
    { id: 'SP-002', segment: 'Red Line', coords: '34.0548, -118.2493', signal: -82, notes: 'Slightly obstructed by foliage.' },
    { id: 'SP-003', segment: 'Blue Line', coords: '34.0561, -118.2521', signal: -95, notes: 'Poor signal, may require signal booster.' },
    { id: 'SP-004', segment: 'Green Line', coords: '34.0600, -118.2605', signal: -70, notes: 'Optimal placement location.' },
]

const SiteSurveyView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Site Survey Data</h2>
            <Card title="Survey Point Analysis">
                <p className="mb-4">
                    This table contains data from the physical site survey conducted for optimal sensor placement. It includes signal strength analysis and accessibility notes.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Point ID</th>
                                <th scope="col" className="px-6 py-3">Segment</th>
                                <th scope="col" className="px-6 py-3">Coordinates</th>
                                <th scope="col" className="px-6 py-3">Signal (dBm)</th>
                                <th scope="col" className="px-6 py-3">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveyPoints.map(point => (
                                <tr key={point.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{point.id}</td>
                                    <td className="px-6 py-4">{point.segment}</td>
                                    <td className="px-6 py-4 font-mono">{point.coords}</td>
                                    <td className={`px-6 py-4 font-semibold ${point.signal > -80 ? 'text-green-400' : point.signal > -90 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {point.signal}
                                    </td>
                                    <td className="px-6 py-4">{point.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default SiteSurveyView;