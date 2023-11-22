import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import CustomerNavigator from "./CustomerNavigator";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardFlow } from "react-native-onboard";
import { StatusBar } from "expo-status-bar";
import HomeNavigator from "./HomeNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../lib/hooks/useAuth";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [onboardShow, setOnboardShow] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { user } = useAuth();

  const setUserDataObj = async () => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setUserDataObj();
  }, [user]);

  if (!appIsReady) {
    return null;
  }
  // if (onboardShow) {
  //   return (
  //     <View>
  //       <StatusBar style="auto" backgroundColor="#DCF9ED" />
  //       <OnboardFlow
  //         pages={[
  //           {
  //             title: "Welcome to Bingo",
  //             subtitle: "Dispose your trash with ease...",
  //             imageUri: Image.resolveAssetSource(
  //               require("../assets/trashman.png")
  //             ).uri,
  //           },
  //           {
  //             title: "Experience Ease",
  //             subtitle: "With simple clicks, have a collector come pick up",
  //             imageUri: Image.resolveAssetSource(require("../assets/truck.png"))
  //               .uri,
  //             primaryButtonTitle: "Explore",
  //           },
  //         ]}
  //         type={"fullscreen"}
  //         style={{ backgroundColor: "#DCF9ED" }}
  //         onDone={() => setOnboardShow(false)}
  //       />
  //     </View>
  //   );
  // }

  return authenticated ? <HomeNavigator /> : <AuthNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
