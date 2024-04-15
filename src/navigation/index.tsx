import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import MapStack from './mapStack';

const MainStackNavigator = createStackNavigator<RootStackParamList>();

const MainNavigationStack = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainStackNavigator.Screen name="MapStack" component={MapStack} />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationStack;
