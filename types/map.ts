export type MapAnnotationType = 'area' | 'text';

export interface MapAnnotation {
  id: string;
  type: MapAnnotationType;
  points: { x: number; y: number }[];
  color: string;
  label?: string;
  createdBy: string;
}
