import React from 'react';
import { ICONS } from '../../constants';

interface AlertInformationProps {
    details: {
        description: string;
        potentialCauses: string[];
        recommendedActions: string[];
    }
}

const AlertInformation: React.FC<AlertInformationProps> = ({ details }) => {
    return (
        <>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                    <span className="text-cyan-400 mr-3">{ICONS.description}</span>
                    <h3 className="font-semibold text-white">Description</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{details.description}</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                    <span className="text-orange-400 mr-3">{ICONS.causes}</span>
                    <h3 className="font-semibold text-white">Potential Causes</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside text-slate-300">
                    {details.potentialCauses.map((cause, index) => (<li key={index}>{cause}</li>))}
                </ul>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                    <span className="text-green-400 mr-3">{ICONS.actions}</span>
                    <h3 className="font-semibold text-white">Recommended Actions</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside text-slate-300">
                    {details.recommendedActions.map((action, index) => (<li key={index}>{action}</li>))}
                </ul>
            </div>
        </>
    );
};

export default AlertInformation;
