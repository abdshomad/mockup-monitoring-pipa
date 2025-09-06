
import React from 'react';
import { Alert } from '../../types';
import { getSeverityBadgeClass, getStageBadgeClass } from '../../utils/badgeStyles';

interface AlertModalBodyProps {
    alert: Alert;
    isPaused: boolean;
    count: number;
}

const AlertModalBody: React.FC<AlertModalBodyProps> = ({ alert, isPaused, count }) => {
    const relevantAction = alert.history
        ?.slice()
        .reverse()
        .find(action => action.notes || action.attachment);

    return (
        <main className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">{alert.type}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-400 block">Timestamp</span><span className="font-mono text-white">{alert.timestamp}</span></div>
                <div><span className="text-slate-400 block">Sensor ID</span><span className="font-mono text-white">{alert.sensorId}</span></div>
                <div><span className="text-slate-400 block">Severity</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span></div>
                <div><span className="text-slate-400 block">Stage</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(alert.stage)}`}>{alert.stage}</span></div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-700 space-y-4">
                {relevantAction ? (
                    <div className="space-y-3">
                        <h4 className="text-md font-semibold text-slate-200">Latest Update</h4>
                        <div>
                            <span className="text-slate-400 text-sm">PIC: </span>
                            <span className="font-medium text-white text-sm">{relevantAction.operator}</span>
                        </div>

                        {relevantAction.notes && (
                            <blockquote className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-md border-l-4 border-slate-600">
                                {relevantAction.notes}
                            </blockquote>
                        )}

                        {relevantAction.attachment?.type === 'image' && (
                            <img src={relevantAction.attachment.data} alt={relevantAction.attachment.fileName} className="mt-1 w-full max-h-48 object-cover rounded-md" />
                        )}
                    </div>
                ) : (
                    <div>
                        <h4 className="text-md font-semibold text-slate-200">Latest Update</h4>
                        <p className="text-sm text-slate-500">No specific updates logged for this event yet.</p>
                    </div>
                )}
                <p className="text-slate-300 text-sm">
                    {isPaused ? (
                        <span className="font-semibold text-yellow-400">Countdown paused. Tap screen to resume.</span>
                    ) : (
                        `Playback has been paused. Auto-resuming in ${count}s.`
                    )}
                </p>
            </div>
        </main>
    );
};

export default AlertModalBody;
