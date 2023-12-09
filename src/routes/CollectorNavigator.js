import React from "react";
import Dashboard from "../screens/collector/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "./screens";
import AvailableRequests from "../screens/collector/AvailableRequests";
import PickedRequests from "../screens/collector/PickedRequests";
import RequestInfoScreen from "../screens/collector/RequestInfoScreen";

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
      <Stack.Screen
        name={SCREENS.CollectorRequest}
        component={AvailableRequests}
      />
      <Stack.Screen
        name={SCREENS.CollectorViewRequests}
        component={PickedRequests}
      />
      <Stack.Screen
        name={SCREENS.CollectorTracking}
        component={RequestInfoScreen}
      />
    </Stack.Navigator>
  );
};

export default CollectorNavigator;
