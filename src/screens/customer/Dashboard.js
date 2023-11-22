import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SCREENS } from "../../routes/screens";
import HomeHeader from "../../components/headers/HomeHeader";

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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        showLogoutAlert();
        return true; // Returning true prevents the default back action
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View className="flex-1">
      <HomeHeader />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
