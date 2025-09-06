import React, { useState } from 'react';

interface AttachmentUploaderProps {
    onUpload: (file: File, note: string) => void;
}

const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [note, setNote] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                window.alert("File size exceeds 5MB limit.");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        // The actual file reading is done in the parent to keep this component stateless regarding file content
        await onUpload(file, note);
        setFile(null);
        setNote('');
        setIsUploading(false);
    };

    return (
        <div className="mt-6 pt-6 border-t border-slate-700">
            <h4 className="font-semibold text-white mb-3">Add New Attachment</h4>
            <div className="space-y-4">
                <div>
                    <label htmlFor="file-upload" className="w-full sm:w-auto text-center cursor-pointer px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors inline-block">Select File</label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" capture="environment" />
                    {file && <span className="ml-4 text-slate-300 text-sm">{file.name}</span>}
                </div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a descriptive note... (optional)" rows={2} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                <button onClick={handleUpload} disabled={!file || isUploading} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md disabled:bg-slate-500 disabled:cursor-not-allowed">
                    {isUploading ? 'Uploading...' : 'Upload & Add to Log'}
                </button>
            </div>
        </div>
    );
};

export default AttachmentUploader;