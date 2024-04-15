import { StationData } from '../../../types/station_data';

export type MarkerData = {
  latlng: {
    latitude: number;
    longitude: number;
  };
  description: string;
  title: string;
  pinColor: string;
  station: StationData;
};
