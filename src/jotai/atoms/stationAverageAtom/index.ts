import { atom } from 'jotai';
import { StationAverageData } from '../../../types/station_average_data';

export const stationAverageAtom = atom<StationAverageData[]>([]);
