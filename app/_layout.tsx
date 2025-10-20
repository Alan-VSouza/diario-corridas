import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Disclaimer from '../components/Disclaimer';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/dashboard" options={{ title: 'Dashboard' }} />
        <Stack.Screen name="(tabs)/historico" options={{ title: 'Histórico' }} />
      </Stack>
      <Slot />
      <Disclaimer />
    </SafeAreaProvider>
  );
}
