import React from 'react';
import { Alert } from '../../types';
import { ALERT_DETAILS } from '../../constants/alert-details';
import AlertSummary from './AlertSummary';
import AlertInformation from './AlertInformation';
import AIAnalysis from './AIAnalysis';
import MultimediaAttachments from './MultimediaAttachments';

interface AlertDetailsTabProps {
    currentAlert: Alert;
    setCurrentAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>;
}

const AlertDetailsTab: React.FC<AlertDetailsTabProps> = ({ currentAlert, setCurrentAlert }) => {
    const details = ALERT_DETAILS[currentAlert.type] || null;
    const aiAnalysis = details?.aiInsights;
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <AlertSummary alert={currentAlert} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                {details && <AlertInformation details={details} />}
                {aiAnalysis && <AIAnalysis aiAnalysis={aiAnalysis} />}
            </div>
            <div className="lg:col-span-3">
                <MultimediaAttachments 
                    currentAlert={currentAlert}
                    setCurrentAlert={setCurrentAlert}
                />
            </div>
        </div>
    );
};

export default AlertDetailsTab;