import React from 'react';
import { ICONS } from '../../constants';

interface MessageProps {
    role: 'user' | 'model';
    content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
    const isUser = role === 'user';
    const containerClasses = isUser ? 'justify-end' : 'justify-start';
    const messageClasses = isUser
        ? 'bg-cyan-500 text-white rounded-br-none'
        : 'bg-slate-700 text-slate-200 rounded-bl-none';
    
    // A simple markdown-like renderer for lists
    const renderContent = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('- ')) {
                return <li key={index} className="ml-4">{line.substring(2)}</li>;
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div className={`flex ${containerClasses} animate-fade-in`}>
            <div className={`p-3 rounded-lg max-w-sm md:max-w-md ${messageClasses}`}>
                <div className="flex items-start space-x-2">
                    {!isUser && (
                        <div className="flex-shrink-0 text-purple-400 mt-1">
                             {React.cloneElement(ICONS.ai, { className: "h-5 w-5" })}
                        </div>
                    )}
                    <div className="text-sm space-y-2">{renderContent(content)}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
