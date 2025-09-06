export interface Attachment {
  type: 'image' | 'audio';
  data: string; // base64 encoded data URI
  mimeType: string;
  fileName: string;
  aiAnalysis?: string;
}
