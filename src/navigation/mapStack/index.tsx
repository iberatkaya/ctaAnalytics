import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MapStackParamList } from '../types';
import MapView from '../../features/map/mapView';
import ChartView from '../../features/charts/chartView';

const MapStackNavigator = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  return (
    <MapStackNavigator.Navigator
      screenOptions={{
        headerBackTitle: ' ',
      }}>
      <MapStackNavigator.Screen
        name="Map"
        component={MapView}
        options={{
          headerTitle: 'CTA Ridership Analytics',
        }}
      />
      <MapStackNavigator.Screen name="Chart" component={ChartView} />
    </MapStackNavigator.Navigator>
  );
};

export default MapStack;
