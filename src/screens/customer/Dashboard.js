import {
  Alert,
  BackHandler,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SCREENS } from "../../routes/screens";
import HomeHeader from "../../components/headers/HomeHeader";
import TouchItem from "../../components/clickables/TouchItem";
import useAuth from "../../lib/hooks/useAuth";

const Dashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            logout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       showLogoutAlert();
  //       return true; // Returning true prevents the default back action
  //     }
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  return (
    <View className="flex-1">
      <HomeHeader showLogoutAlert={showLogoutAlert} />
      <ScrollView className="px-5">
        <View className="flex-row justify-between items-center my-2 ">
          <TouchItem
            left
            title="Request"
            bg="bg-fuchsia-300"
            textColor="text-fuchsia-950"
            onPress={() => navigation.navigate(SCREENS.CustomerRequest)}
          />
          <TouchItem
            right
            title="My Requests"
            bg="bg-amber-300"
            textColor="text-amber-950"
            onPress={() => navigation.navigate(SCREENS.CustomerViewRequests)}
          />
        </View>
        <View className="flex-row justify-between items-center my-2">
          {/* <TouchItem
            left
            title="Tracking"
            bg="bg-sky-300"
            textColor="text-sky-950"
            onPress={() => navigation.navigate(SCREENS.CustomerTracking)}
          /> */}
          <TouchItem
            fullWidth
            title="Support"
            bg="bg-rose-300"
            textColor="text-rose-950"
            onPress={() => navigation.navigate(SCREENS.Support)}
          />
        </View>
        <View className=" justify-between items-center my-2">
          <TouchItem
            fullWidth
            title="Settings"
            bg="bg-emerald-300"
            textColor="text-emerald-950"
            onPress={() => navigation.navigate(SCREENS.Settings)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
