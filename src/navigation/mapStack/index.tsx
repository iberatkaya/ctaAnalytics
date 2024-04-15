import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MapStackParamList } from '../types';
import MapView from '../../features/map/mapView';

const MapStackNavigator = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  console.log('render');
  return (
    <MapStackNavigator.Navigator>
      <MapStackNavigator.Screen name="Map" component={MapView} />
    </MapStackNavigator.Navigator>
  );
};

export default MapStack;
