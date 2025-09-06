

import React, { useState } from 'react';
import { AlertAction } from '../../types';
import { ICONS } from '../../constants';

interface TimelineViewProps {
  history: AlertAction[];
}

const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('triggered') || action.toLowerCase().includes('system')) {
        return <span className="text-purple-400">{ICONS.ai}</span>;
    }
    if (action.toLowerCase().includes('dispatched') || action.toLowerCase().includes('on-site')) {
        return <span className="text-indigo-400">{ICONS.security}</span>;
    }
     if (action.toLowerCase().includes('resolved')) {
        return <span className="text-green-400">{ICONS.actions}</span>;
    }
    if (action.toLowerCase().includes('observation') || action.toLowerCase().includes('assessment')) {
        return <span className="text-cyan-400">{ICONS.description}</span>;
    }
    return <span className="text-slate-400">{ICONS.dashboard}</span>;
}

const ImageModal: React.FC<{ src: string, alt: string, onClose: () => void }> = ({ src, alt, onClose }) => (
    <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
    >
        <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img src={src} alt={alt} className="w-full h-auto object-contain rounded-lg shadow-2xl" />
             <button 
                onClick={onClose} 
                className="absolute -top-4 -right-4 p-2 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                aria-label="Close image view"
             >
                {ICONS.close}
            </button>
        </div>
    </div>
);


const TimelineView: React.FC<TimelineViewProps> = ({ history }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {selectedImage && <ImageModal src={selectedImage} alt="Attachment" onClose={() => setSelectedImage(null)} />}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-white">Alert Action Timeline</h3>
        <div className="relative pl-6">
            <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
            <ul className="space-y-8">
                {history.length > 0 ? history.map((action, index) => (
                    <li key={index} className="relative pl-6">
                        <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center">
                            {getActionIcon(action.action)}
                        </div>
                        <div className="ml-4 bg-slate-900/30 p-4 rounded-lg">
                            <p className="text-md font-semibold text-slate-200">{action.action}</p>
                            <p className="text-sm text-slate-400">
                                by <span className="font-semibold text-slate-300">{action.operator}</span> (PIC)
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{action.timestamp}</p>
                            
                            {action.notes && (
                                <div className="mt-3 pt-3 border-t border-slate-700/50">
                                    <p className="text-sm text-slate-300 leading-relaxed">{action.notes}</p>
                                </div>
                            )}

                            {action.attachment && action.attachment.type === 'image' && (
                                <div className="mt-3">
                                    <img 
                                        src={action.attachment.data} 
                                        alt={action.attachment.fileName} 
                                        className="w-48 h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setSelectedImage(action.attachment!.data)}
                                    />
                                </div>
                            )}
                        </div>
                    </li>
                )) : (
                    <li className="relative pl-6">
                        <div className="absolute -left-2 top-1 w-5 h-5 bg-slate-600 rounded-full ring-4 ring-slate-800"></div>
                        <p className="text-sm text-slate-500 py-1 ml-4">No actions logged yet.</p>
                    </li>
                )}
            </ul>
        </div>
      </div>
    </>
  );
};

export default TimelineView;