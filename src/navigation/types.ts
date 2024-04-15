import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  MapStack: NavigatorScreenParams<MapStackParamList>;
};

export type MapStackParamList = {
  Map: undefined;
};
