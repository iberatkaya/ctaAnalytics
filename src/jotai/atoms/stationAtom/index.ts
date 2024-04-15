import { atom } from 'jotai';
import { StationData } from '../../../types/station_data';

export const stationAtom = atom<StationData[]>([]);
