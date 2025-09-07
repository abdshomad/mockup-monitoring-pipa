import React, { useEffect, useState } from 'react';
import { Incident } from '../types';
import { ICONS } from '../constants';
import { useGeminiVideoBriefing } from '../hooks/useGeminiVideoBriefing';
import ModalHeader from './ai/ModalHeader';

interface AIVideoBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onBriefingComplete: (videoUrl: string) => void;
}

const AIVideoBriefingModal: React.FC<AIVideoBriefingModalProps> = ({ isOpen, onClose, incident, onBriefingComplete }) => {
  const { generateBriefing, loading, error, videoUrl, progressMessage, reset } = useGeminiVideoBriefing();
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(incident?.videoBriefingUrl || null);

  useEffect(() => {
    if (isOpen) {
      reset();
      setCurrentVideoUrl(incident?.videoBriefingUrl || null);
    }
  }, [isOpen, incident, reset]);
  
  useEffect(() => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl);
      onBriefingComplete(videoUrl);
    }
  }, [videoUrl, onBriefingComplete]);


  if (!isOpen || !incident) return null;
  
  const handleGenerate = () => {
      generateBriefing(incident);
  };
  
  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-purple-400 mb-4">{React.cloneElement(ICONS.video, { className: "h-12 w-12 animate-pulse" })}</div>
                <p className="text-slate-200 font-semibold text-lg">Generating AI Video Briefing...</p>
                <p className="text-slate-400 text-sm mt-2 animate-pulse">{progressMessage}</p>
            </div>
        )
    }
    
     if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-red-400 mb-4">{React.cloneElement(ICONS.alerts, { className: "h-12 w-12" })}</div>
                <p className="text-slate-200 font-semibold">Error Generating Video</p>
                <p className="text-red-400 text-sm mt-1">{error}</p>
            </div>
        );
    }

    if(currentVideoUrl) {
        return (
             <div className="p-2 bg-black rounded-lg">
                <video key={currentVideoUrl} width="100%" controls autoPlay muted loop className="rounded-md">
                    <source src={currentVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }

    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-purple-400 mb-4">{React.cloneElement(ICONS.video, { className: "h-12 w-12" })}</div>
        <p className="text-slate-200 font-semibold text-lg">Generate AI Video Briefing</p>
        <p className="text-slate-400 text-sm mt-1 mb-6 max-w-md">
            Create a concise, 20-30 second animated video summary of this incident, suitable for management escalation or shift handovers.
        </p>
        <button 
            onClick={handleGenerate} 
            className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center space-x-2"
        >
            {React.cloneElement(ICONS.ai, { className: "h-5 w-5" })}
            <span>Generate Briefing</span>
        </button>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader
          title="AI-Generated Video Briefing"
          icon={React.cloneElement(ICONS.video, { className: "h-7 w-7" })}
          onClose={onClose}
        />
        <main className="p-6 overflow-y-auto">
          {renderContent()}
        </main>
        <footer className="p-4 border-t border-slate-700 flex justify-end">
            <button
                onClick={onClose}
                className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
            >
                Close
            </button>
        </footer>
      </div>
    </div>
  );
};

export default AIVideoBriefingModal;