import { Asset, SensorType, MaintenanceTask } from '../../types';
import { getRelativeDate } from '../../utils/time';
import { SENSORS } from './sensors';
import { TECHNICIANS, MAINTENANCE_SCHEDULE } from './maintenance';
import { QA_CHECKS } from './projectData';

const getSpecsForModel = (model: string) => {
    if (model.startsWith('Acoustic')) {
        return {
            operatingTemp: '-20°C to 60°C',
            accuracy: { pressure: 'N/A', vibration: '±0.05g' },
        };
    }
    if (model.startsWith('FlowMaster')) {
        return {
            operatingTemp: '-10°C to 50°C',
            accuracy: { pressure: '±1.0 PSI', vibration: 'N/A' },
        };
    }
    return { // VibraPress-Pro
        operatingTemp: '-40°C to 85°C',
        accuracy: { pressure: '±0.5 PSI', vibration: '±0.02g' },
    };
};


export const ASSETS: Asset[] = SENSORS.map((sensor, index) => {
    const model = sensor.type === SensorType.Acoustic ? 'Acoustic-X2' : (sensor.type === SensorType.Flowmeter ? 'FlowMaster-5k' : 'VibraPress-Pro');
    const relevantQaChecks = QA_CHECKS.filter(q => q.sensorId === sensor.id);
    const qaCheck = relevantQaChecks.length > 0 ? relevantQaChecks[0] : QA_CHECKS[index % QA_CHECKS.length];
    const assetMaintenanceHistory = MAINTENANCE_SCHEDULE.filter(task => task.sensorId === sensor.id);
    
    return {
      assetId: `ASSET-0${index + 1}`,
      sensorId: sensor.id,
      model: model,
      serialNumber: `SN-18${index}XYZ${index * 3}`,
      deploymentDate: getRelativeDate({ years: -1, months: -(index % 6), days: -15 }),
      warrantyEndDate: getRelativeDate({ years: 2, months: -(index % 6), days: -15 }),
      status: sensor.status === 'Offline' ? 'In Repair' : 'Active',
      imageUrl: `https://picsum.photos/seed/${sensor.id}/400/300`,
      firmwareVersion: `v1.2.${index % 4 + 1}`,
      technicalSpecifications: getSpecsForModel(model),
      installationDetails: {
          installedBy: TECHNICIANS[index % TECHNICIANS.length].name,
          qaCheckId: qaCheck.id,
      },
      maintenanceHistory: assetMaintenanceHistory,
    };
});