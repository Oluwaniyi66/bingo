import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./src/routes/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/lib/hooks/useAuth";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

// ios: 267109392898-gv35n3knvsiomhdl53n0lh1jjdk5pebv.apps.googleusercontent.com
// android: 267109392898-8ul7abiio1395l0ga2e52bgp435o8r5g.apps.googleusercontent.com
