import React from "react";
import Dashboard from "../screens/collector/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "./screens";

const Stack = createNativeStackNavigator();

const CollectorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen name={SCREENS.CustomerDashboard} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default CollectorNavigator;
