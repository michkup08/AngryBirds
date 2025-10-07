import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Slot />
    </SafeAreaView>
  );
}
