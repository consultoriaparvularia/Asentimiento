// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CoverScreen from './src/screens/CoverScreen';
import Lamina1Screen from './src/screens/Lamina1Screen';
import Lamina2Screen from './src/screens/Lamina2Screen';
import Lamina3Screen from './src/screens/Lamina3Screen';
import Lamina4Screen from './src/screens/Lamina4Screen';
import Lamina5Screen from './src/screens/Lamina5Screen';
import Lamina6Screen from './src/screens/Lamina6Screen';
import ConsentScreen from './src/screens/ConsentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
      headerShown: false,
      orientation: 'landscape',
      animation: 'slide_from_right', // 👈 transición lateral bonita
  }}
      >
        <Stack.Screen name="Cover" component={CoverScreen} />
        <Stack.Screen name="Lamina1" component={Lamina1Screen} />
        <Stack.Screen name="Lamina2" component={Lamina2Screen} />
        <Stack.Screen name="Lamina3" component={Lamina3Screen} />
        <Stack.Screen name="Lamina4" component={Lamina4Screen} />
        <Stack.Screen name="Lamina5" component={Lamina5Screen} />
        <Stack.Screen name="Lamina6" component={Lamina6Screen} />
        <Stack.Screen name="Consent" component={ConsentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
