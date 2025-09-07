import React from 'react';
import { View, SensorType } from '../../types';

interface PromptSuggestionsProps {
    onSelect: (prompt: string) => void;
    currentView: View;
    sensorFilter: SensorType | null;
}

const suggestionsByView: Partial<Record<string, string[]>> = {
    'Dashboard': [
        'Summarize all active alerts.',
        'How many sensors are offline?',
        'What are the latest AI insights?',
    ],
    'Alerts': [
        'What is the status of the most critical alert?',
        'List all high severity alerts and their sensor IDs.',
        'Which alerts are currently being investigated?',
    ],
    'Sensors': [
        'Which sensor has the lowest power level?',
        'List all acoustic sensors and their status.',
        'Compare the health scores of all flowmeters.',
    ],
    'Sensors:Vibration & Pressure': [
        'What is the current pressure reading for sensor P-VIB-002?',
        'List all Vibration & Pressure sensors with alerts.',
        'What was the highest vibration recorded today?',
    ],
    'Sensors:Acoustic': [
        'Are there any offline acoustic sensors?',
        'Show me the maintenance history for acoustic sensors.',
        'Which acoustic sensor has the lowest health score?',
    ],
    'Sensors:Flowmeter': [
        'List all flowmeters and their locations.',
        'What is the operational status of all flowmeters?',
        'Are there any maintenance tasks scheduled for flowmeters?',
    ],
    'Scheduled Maintenance': [
        'What tasks are currently in progress?',
        'What tasks are assigned to Alice Johnson?',
        'Show me all maintenance for offline sensors.',
    ],
    'Map View': [
        'Which sensors are on the Red Line?',
        'Are there any alerts in the Interchange segment?',
        'List all sensors and their locations.',
    ],
    'Implementation': [
        'Which sensor deployments are currently in progress?',
        'What is the status of deployment DEP-005?',
        'Show all deployments assigned to Team Alpha.',
    ],
    'Asset Management': [
        'Which assets are currently in repair?',
        'Find the asset with serial number SN-183XYZ9.',
        'What is the deployment date of asset ASSET-01?'
    ],
    'Technician Performance': [
        'Who is the top performing technician?',
        'What is the average response time for Team Alpha?',
        'List all technicians and their success rates.'
    ],
    'LoRaWAN Network': [
        'Which gateway is offline?',
        'Which devices are connected to GW-01-REDLINE?',
        'Show all devices with a low battery.',
        'List all devices with an SNR below 6.0.',
    ],
};


const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelect, currentView, sensorFilter }) => {
    
    const defaultSuggestions = [
        'Summarize all active alerts.',
        'How many sensors are offline?',
        'Show me the maintenance schedule.',
    ];
    
    let suggestions: string[] | undefined;
    let viewName = currentView === 'Dashboard' ? 'the system' : currentView;

    if (currentView === 'Sensors' && sensorFilter) {
        suggestions = suggestionsByView[`${currentView}:${sensorFilter}`];
        viewName = `${sensorFilter} sensors`;
    } 
    
    if (!suggestions) {
        suggestions = suggestionsByView[currentView];
    }
    
    const finalSuggestions = (suggestions && suggestions.length > 0) ? suggestions : defaultSuggestions;

    return (
        <div className="p-4 space-y-2 animate-fade-in">
            <p className="text-sm text-slate-400 text-center">
                Not sure where to start? Try asking about <strong className="text-cyan-400">{viewName}</strong>:
            </p>
            <div className="flex flex-col items-center space-y-2">
                {finalSuggestions.map(prompt => (
                    <button
                        key={prompt}
                        onClick={() => onSelect(prompt)}
                        className="w-full text-left text-sm bg-slate-700 text-slate-300 p-3 rounded-lg hover:bg-slate-600/70 transition-colors"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PromptSuggestions;