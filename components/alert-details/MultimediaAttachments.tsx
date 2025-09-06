import React, { useMemo } from 'react';
import { Alert, AlertAction } from '../../types';
import { ICONS } from '../../constants';
import { getFormattedTimestamp } from '../../utils/time';
import AttachmentItem from './AttachmentItem';
import AttachmentUploader from './AttachmentUploader';

interface MultimediaAttachmentsProps {
    currentAlert: Alert;
    setCurrentAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>;
}

const MultimediaAttachments: React.FC<MultimediaAttachmentsProps> = ({ 
    currentAlert, 
    setCurrentAlert,
}) => {
    const actionsWithAttachments = useMemo(() => {
        return currentAlert?.history?.filter(action => !!action.attachment) || [];
    }, [currentAlert]);

    const handleUpload = (file: File, note: string) => {
        if (!currentAlert) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const newAction: AlertAction = {
                timestamp: getFormattedTimestamp(new Date()),
                action: note || `Uploaded ${file.type.split('/')[0]}`,
                operator: 'Operator 1',
                attachment: {
                    type: file.type.startsWith('image/') ? 'image' : 'audio',
                    data: reader.result as string,
                    mimeType: file.type,
                    fileName: file.name,
                }
            };

            setCurrentAlert(prevAlert => {
                if (!prevAlert) return undefined;
                return {
                    ...prevAlert,
                    history: [...(prevAlert.history || []), newAction],
                };
            });
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    };
    
    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
                <span className="text-cyan-400 mr-3">{React.cloneElement(ICONS.attachment, { className: "h-7 w-7" })}</span>
                <h3 className="font-semibold text-white text-lg">Multimedia Attachments & Analysis</h3>
            </div>
            <div className="space-y-4">
                {actionsWithAttachments.map(action => (
                   <AttachmentItem key={`${action.timestamp}-${action.attachment!.fileName}`} action={action} currentAlert={currentAlert} />
                ))}
                {actionsWithAttachments.length === 0 && <p className="text-center text-slate-500 py-4">No attachments uploaded for this alert.</p>}
            </div>
            
            <AttachmentUploader onUpload={handleUpload} />
        </div>
    );
};

export default MultimediaAttachments;