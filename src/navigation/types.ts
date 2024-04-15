import { NavigatorScreenParams } from '@react-navigation/native';
import { StationData } from '../types/station_data';

export type RootStackParamList = {
  MapStack: NavigatorScreenParams<MapStackParamList>;
};

export type MapStackParamList = {
  Map: undefined;
  Chart: { stationData: StationData };
};
