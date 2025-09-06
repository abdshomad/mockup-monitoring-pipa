import React, { useState } from 'react';
import { QA_CHECKS } from '../constants';
import { QACheck } from '../types';

const QualityAssuranceView: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Pass' | 'Fail'>('All');

    const filteredChecks = QA_CHECKS.filter(
        check => filter === 'All' || check.result === filter
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Quality Assurance Checks</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <p className="text-slate-300 mb-6">
                    Results from quality assurance checks performed during and after installation, including sensor calibration and signal validation.
                </p>

                <div className="flex flex-wrap gap-2 items-center mb-6">
                    <span className="text-slate-400 font-medium mr-2">Filter by result:</span>
                    {(['All', 'Pass', 'Fail'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                filter === status
                                    ? 'bg-cyan-500 text-white shadow-md'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Check ID</th>
                                <th scope="col" className="px-6 py-3">Sensor ID</th>
                                <th scope="col" className="px-6 py-3">Check Type</th>
                                <th scope="col" className="px-6 py-3">Result</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredChecks.map((check: QACheck) => (
                                <tr key={check.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{check.id}</td>
                                    <td className="px-6 py-4">{check.sensorId}</td>
                                    <td className="px-6 py-4">{check.checkType}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${check.result === 'Pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {check.result}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{check.timestamp}</td>
                                    <td className="px-6 py-4">{check.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QualityAssuranceView;