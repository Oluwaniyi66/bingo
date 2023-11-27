import { Button, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import useAuth from "../lib/hooks/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "./screens";
import Dashboard from "../screens/customer/Dashboard";
import WelcomeInScreen from "../screens/shared/WelcomeInScreen";
import ProfileUpdateModalScreen from "../screens/shared/ProfileUpdateModalScreen";
import CustomerNavigator from "./CustomerNavigator";
import CollectorNavigator from "./CollectorNavigator";
import Settings from "../screens/shared/Settings";
import Support from "../screens/shared/Support";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const { logout, user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name={SCREENS.WelcomeInScreen}
        component={WelcomeInScreen}
      />
      <Stack.Screen
        name={SCREENS.ProfileUpdateModal}
        component={ProfileUpdateModalScreen}
        options={{
          presentation: Platform.OS === "ios" ? "formSheet" : "modal",
          // animation: "flip",
        }}
      />
      <Stack.Screen
        name={SCREENS.stacks.Customer}
        component={CustomerNavigator}
        
      />
      <Stack.Screen
        name={SCREENS.stacks.Collector}
        component={CollectorNavigator}
      />
      <Stack.Screen name={SCREENS.Settings} component={Settings} />
      <Stack.Screen name={SCREENS.Support} component={Support} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
