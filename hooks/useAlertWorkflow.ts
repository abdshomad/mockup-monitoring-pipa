
import { useState, useEffect } from 'react';
import { Alert, AlertWorkflowStage, AlertAction } from '../types';
import { getFormattedTimestamp } from '../utils/time';

export const useAlertWorkflow = (initialAlert: Alert | undefined) => {
    const [currentAlert, setCurrentAlert] = useState(initialAlert);
    const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [alertForReport, setAlertForReport] = useState<Alert | null>(null);

    useEffect(() => {
        setCurrentAlert(initialAlert);
    }, [initialAlert]);

    const handleStageChange = (newStage: AlertWorkflowStage) => {
        if (currentAlert && currentAlert.stage !== newStage) {
            if (newStage === AlertWorkflowStage.Resolved) {
                setIsResolutionModalOpen(true);
                return;
            }
            const newAction: AlertAction = {
                timestamp: getFormattedTimestamp(new Date()),
                action: `Moved to ${newStage}`,
                operator: 'Operator 1',
            };
            setCurrentAlert({
                ...currentAlert,
                stage: newStage,
                history: [...(currentAlert.history || []), newAction],
            });
        }
    };

    const handleConfirmResolution = (notes: string) => {
        if (!currentAlert) return;

        const newAction: AlertAction = {
            timestamp: getFormattedTimestamp(new Date()),
            action: `Moved to Resolved`,
            operator: 'Operator 1',
        };

        const resolvedAlert: Alert = {
            ...currentAlert,
            stage: AlertWorkflowStage.Resolved,
            history: [...(currentAlert.history || []), newAction],
            resolutionNotes: notes,
        };

        setCurrentAlert(resolvedAlert);
        setAlertForReport(resolvedAlert);
        setIsResolutionModalOpen(false);
        setIsReportModalOpen(true);
    };

    return {
        currentAlert,
        isResolutionModalOpen,
        isReportModalOpen,
        alertForReport,
        handleStageChange,
        handleConfirmResolution,
        setCurrentAlert,
        setIsResolutionModalOpen,
        setIsReportModalOpen,
    };
};
