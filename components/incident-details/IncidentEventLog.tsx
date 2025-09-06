import React from 'react';
import { IncidentLogEntry } from '../../types';
import { ICONS } from '../../constants';

interface IncidentEventLogProps {
    log: IncidentLogEntry[];
}

// A more capable markdown-like renderer
const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] | null = null;

    const flushList = () => {
        if (currentList) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
                    {currentList.map((item, idx) => {
                        const processedItem = item
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');
                        return <li key={idx} dangerouslySetInnerHTML={{ __html: processedItem }} />;
                    })}
                </ul>
            );
            currentList = null;
        }
    };

    lines.forEach((line, index) => {
        if (line.trim().startsWith('- ')) {
            if (!currentList) {
                currentList = [];
            }
            currentList.push(line.trim().substring(2));
        } else {
            flushList(); // End any existing list

            if (line.startsWith('### ')) {
                elements.push(<h4 key={index} className="text-md font-semibold text-purple-300 mt-4 mb-2">{line.substring(4)}</h4>);
            } else if (line.trim()) {
                const processedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');
                elements.push(<p key={index} dangerouslySetInnerHTML={{ __html: processedLine }} />);
            }
        }
    });

    flushList(); // Flush any remaining list at the end

    return elements;
};

const AIBriefLogEntry: React.FC<{ entry: IncidentLogEntry }> = ({ entry }) => (
    <div className="ml-4 bg-slate-900/30 p-4 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center mb-2">
            <span className="text-purple-400 mr-3">{React.cloneElement(ICONS.ai, { className: "h-6 w-6" })}</span>
            <div>
                <p className="text-md font-semibold text-white">AI Strategy Brief</p>
                <p className="text-xs text-slate-500">{entry.timestamp}</p>
            </div>
        </div>
        <div className="text-sm space-y-2">{renderContent(entry.entry)}</div>
    </div>
);

const StandardLogEntry: React.FC<{ entry: IncidentLogEntry }> = ({ entry }) => (
     <div className="ml-4">
        <p className="text-md font-semibold text-slate-200">{entry.entry}</p>
        <p className="text-sm text-slate-400">by <span className="font-semibold text-slate-300">{entry.operator}</span></p>
        <p className="text-xs text-slate-500 mt-1">{entry.timestamp}</p>
        {entry.notes && <p className="mt-2 text-sm text-slate-300 bg-slate-700/50 p-2 rounded-md">Note: {entry.notes}</p>}
    </div>
);


const IncidentEventLog: React.FC<IncidentEventLogProps> = ({ log }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Incident Log</h3>
        <div className="relative pl-6">
            <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
            <ul className="space-y-6">
                {log.map((entry, index) => (
                    <li key={index} className="relative pl-6">
                        <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center">
                            {entry.type === 'ai_brief' ? React.cloneElement(ICONS.ai, { className: "h-5 w-5 text-purple-400" }) : ICONS.dashboard}
                        </div>
                        {entry.type === 'ai_brief' ? <AIBriefLogEntry entry={entry} /> : <StandardLogEntry entry={entry} />}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default IncidentEventLog;