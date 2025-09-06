export const TRANSPORT_LINES = {
    'Red Line': { color: '#f87171', path: 'M 50 125 H 650' }, // A bit more vibrant red
    'Blue Line': { color: '#60a5fa', path: 'M 150 50 V 250' },
    'Green Line': { color: '#4ade80', path: 'M 550 50 L 350 175 L 50 225' },
};

export const STATION_POSITIONS: { [key: string]: { x: number; y: number } } = {
  'P-VIB-001': { x: 50, y: 125 },
  'P-VIB-002': { x: 150, y: 125 }, // Interchange station
  'P-VIB-003': { x: 350, y: 125 },
  'P-VIB-006': { x: 550, y: 125 },
  'P-VIB-004': { x: 150, y: 50 },
  'P-VIB-005': { x: 150, y: 225 },
  'P-VIB-007': { x: 550, y: 50 },
  'P-VIB-008': { x: 200, y: 200 },
};
