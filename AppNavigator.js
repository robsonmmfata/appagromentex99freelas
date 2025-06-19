import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './Dashboard';
import TelaMedicaoArea from './TelaMedicaoArea';
import TelaVisualizacaoNDVI from './TelaVisualizacaoNDVI';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="MedicaoArea" component={TelaMedicaoArea} options={{ title: 'Medição de Área' }} />
        <Stack.Screen name="VisualizacaoNDVI" component={TelaVisualizacaoNDVI} options={{ title: 'Visualização NDVI' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
