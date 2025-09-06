import React from 'react';
import { IncidentReport } from '../../hooks/useGeminiReportGenerator';

interface ReportDisplayProps {
  data: IncidentReport;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="font-semibold text-purple-300 mb-2 border-b border-slate-700 pb-1">{title}</h4>
    <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
  </div>
);

const ReportDisplay: React.FC<ReportDisplayProps> = ({ data }) => (
  <div className="space-y-5 animate-fade-in">
    <h3 className="text-lg font-bold text-cyan-400">{data.title}</h3>
    
    <Section title="Executive Summary">
      <p>{data.executiveSummary}</p>
    </Section>

    <Section title="Timeline Summary">
      <p>{data.timelineSummary}</p>
    </Section>
    
    <Section title="Root Cause Analysis">
      <p>{data.rootCauseAnalysis}</p>
    </Section>

    <Section title="Corrective Actions Taken">
      <p>{data.correctiveActionsTaken}</p>
    </Section>
    
    <Section title="Recommendations">
      <ul className="list-disc list-inside space-y-1">
        {data.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
      </ul>
    </Section>
  </div>
);

export default ReportDisplay;
