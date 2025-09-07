import React, { useState } from 'react';
import { Alert, AlertAction } from '../../types';
import { ICONS } from '../../constants';
import { useGeminiMultiModal } from '../../hooks/useGeminiMultiModal';

interface AttachmentItemProps {
    action: AlertAction;
    currentAlert: Alert;
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({ action, currentAlert }) => {
    const { analyzeAttachment, analysis, loading, error } = useGeminiMultiModal();
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
    
    if (!action.attachment) return null;

    const attachment = action.attachment;

    const handleAnalyze = () => {
        if (window.confirm("This will use the Gemini API to analyze the attachment. Do you want to proceed?")) {
            analyzeAttachment(currentAlert, attachment);
            setIsAnalysisVisible(true);
        }
    };

    return (
        <div className="bg-slate-700/50 p-4 rounded-lg">
            <div className="flex items-start space-x-4">
                <img src={attachment.data} alt={attachment.fileName} className="w-24 h-24 object-cover rounded-md flex-shrink-0 bg-slate-600" />
                <div className="flex-grow">
                    <p className="font-semibold text-slate-200">{attachment.fileName}</p>
                    <p className="text-xs text-slate-400">Uploaded by {action.operator} at {action.timestamp}</p>
                    <p className="text-sm text-slate-300 mt-1">Note: "{action.action}"</p>
                    <button onClick={handleAnalyze} disabled={loading} className="mt-2 px-3 py-1.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-500 disabled:cursor-wait flex items-center space-x-2">
                        {React.cloneElement(ICONS.ai, { className: "h-5 w-5" })}
                        <span>{loading ? 'Analyzing...' : 'Analyze with AI'}</span>
                    </button>
                </div>
            </div>
            {isAnalysisVisible && (
                <div className="mt-4 pt-4 border-t border-slate-600/50">
                    {loading && <p className="text-slate-400 text-sm animate-pulse">AI is analyzing the image, please wait...</p>}
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {analysis && <div className="text-sm text-slate-300 space-y-1"><p className="font-semibold text-purple-300">AI Analysis:</p><p className="whitespace-pre-wrap">{analysis}</p></div>}
                </div>
            )}
        </div>
    );
};

export default AttachmentItem;