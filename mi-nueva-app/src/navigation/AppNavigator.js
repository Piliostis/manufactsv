import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ControlTemperaturaScreen from '../screens/ControlTemperaturaScreen';
import SeleccionMaquinaScreen from '../screens/SeleccionMaquinaScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />

      <Stack.Screen
        name="SeleccionMaquina"
        component={SeleccionMaquinaScreen}
        options={{ title: 'Seleccionar Máquina' }}
      />

      <Stack.Screen
        name="ControlTemperatura"
        component={ControlTemperaturaScreen}
        options={({ route }) => ({ title: `Control - ${route.params?.maquina || 'Temperatura'}` })}
      />
    </Stack.Navigator>
  );
}
