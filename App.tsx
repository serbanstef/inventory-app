import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { InventoryProvider } from "./contexts/inventory";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    "Circular-Regular": require("./assets/fonts/CircularStd-Book.otf"),
    "Circular-Bold": require("./assets/fonts/CircularStd-Bold.otf"),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <InventoryProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </InventoryProvider>
      </SafeAreaProvider>
    );
  }
}
