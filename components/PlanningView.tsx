

import React from 'react';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
        <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
        <div className="text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

const TimelineItem: React.FC<{ title: string, duration: string, isCompleted?: boolean, isCurrent?: boolean }> = ({ title, duration, isCompleted, isCurrent }) => {
    const barColor = isCompleted ? 'bg-green-500' : (isCurrent ? 'bg-cyan-500' : 'bg-slate-600');
    const textColor = isCompleted ? 'text-green-300' : (isCurrent ? 'text-cyan-300' : 'text-slate-400');
    return (
        <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${barColor} ring-4 ring-slate-800`}></div>
                <div className={`w-0.5 grow ${barColor}`}></div>
            </div>
            <div className="pb-8">
                <p className="font-semibold text-slate-100">{title}</p>
                <p className={`text-sm ${textColor}`}>{duration}</p>
            </div>
        </div>
    )
}

const PlanningView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Planning Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Project Scope & Objectives">
                        <p>
                            To design, implement, and commission a real-time, self-powered wireless pipeline integrity monitoring system. 
                            The primary objectives are to detect and prevent theft and leakage across 150km of the main pipeline.
                        </p>
                        <ul className="list-disc list-inside pl-2 pt-2">
                            <li>Reduce product loss by 95%.</li>
                            <li>Decrease incident response time by 70%.</li>
                            <li>Provide real-time data for predictive maintenance.</li>
                        </ul>
                    </Card>

                    <Card title="Resource Allocation">
                        <p>
                            The project will be managed by the Core Engineering Team with support from third-party contractors for specialized installations.
                        </p>
                        <ul className="list-disc list-inside pl-2 pt-2">
                            <li><strong>Project Manager:</strong> 1 FTE</li>
                            <li><strong>Field Engineers:</strong> 4 FTEs</li>
                            <li><strong>Data Analysts:</strong> 2 FTEs</li>
                            <li><strong>Contractors:</strong> As required for civil works.</li>
                        </ul>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card title="Project Timeline">
                        <div className="relative">
                            <TimelineItem title="Phase 1: Site Survey" duration="Q3 2024" isCompleted />
                            <TimelineItem title="Phase 2: Procurement" duration="Q4 2024" isCurrent />
                            <TimelineItem title="Phase 3: Field Implementation" duration="Q1 2025" />
                            <TimelineItem title="Phase 4: Commissioning" duration="Q2 2025" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PlanningView;