import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import { Button } from "react-native";
import { SCREENS } from "./screens";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import OnboardingScreen from "../screens/auth/OnboardingScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
      }}
    >
      {/* <Stack.Screen name={SCREENS.Onboarding} component={OnboardingScreen}  /> */}
      <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
      <Stack.Screen name={SCREENS.Register} component={RegisterScreen} />
      <Stack.Screen
        name={SCREENS.ForgotPass}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
