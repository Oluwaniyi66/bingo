import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/customer/Dashboard";
import { SCREENS } from "./screens";
import RequestPickup from "../screens/customer/RequestPickup";
import TrackRequest from "../screens/customer/TrackRequest";
import ViewRequests from "../screens/customer/ViewRequests";

const Stack = createNativeStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen name={SCREENS.CustomerDashboard} component={Dashboard} />
      <Stack.Screen name={SCREENS.CustomerRequest} component={RequestPickup} />
      <Stack.Screen name={SCREENS.CustomerTracking} component={TrackRequest} />
      <Stack.Screen
        name={SCREENS.CustomerViewRequests}
        component={ViewRequests}
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
