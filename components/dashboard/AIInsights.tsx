import React, { useState, useEffect } from 'react';
import { AIInsight } from '../../types';
import { ICONS } from '../../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AIInsightsProps {
    insights: AIInsight[];
}

const getCategoryStyle = (category: AIInsight['category']): { color: string, icon: JSX.Element } => {
    switch (category) {
        case 'Predictive Maintenance':
            return { color: 'text-yellow-400', icon: ICONS.predictiveMaintenance };
        case 'Operational Efficiency':
            return { color: 'text-cyan-400', icon: ICONS.operationalEfficiency };
        case 'Risk Assessment':
            return { color: 'text-red-400', icon: ICONS.riskAssessment };
        case 'Network Health':
            return { color: 'text-purple-400', icon: ICONS.lorawan };
        default:
            return { color: 'text-slate-400', icon: ICONS.ai };
    }
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (insights.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length);
        }, 8000); // 8 seconds per slide

        return () => clearInterval(timer);
    }, [insights.length]);

    if (insights.length === 0) {
        return null;
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % insights.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + insights.length) % insights.length);
    };


    return (
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="flex items-center mb-3 text-purple-400">
                <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                <h3 className="font-semibold text-white text-lg">AI Insights</h3>
            </div>
            
            <div className="relative h-[120px]">
                 {insights.map((insight, index) => {
                    const { color, icon } = getCategoryStyle(insight.category);
                    return (
                        <div
                            key={insight.id}
                            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            style={{pointerEvents: index === currentIndex ? 'auto' : 'none'}}
                        >
                            {index === currentIndex && (
                                <div className="animate-fade-in">
                                    <div className={`flex items-center text-sm font-semibold mb-2 ${color}`}>
                                        {React.cloneElement(icon, { className: "h-5 w-5 mr-2" })}
                                        <span>{insight.category}</span>
                                    </div>
                                    <p className="font-semibold text-slate-200 mb-1">{insight.title}</p>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {insight.insight}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                {insights.length > 1 && (
                    <>
                        <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-4 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 transition-colors duration-200 z-10" aria-label="Previous slide">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-4 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 transition-colors duration-200 z-10" aria-label="Next slide">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {insights.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-cyan-400 w-4' : 'bg-slate-600 hover:bg-slate-500'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AIInsights;