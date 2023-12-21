import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import useAuth from "../../lib/hooks/useAuth";
import HomeHeader from "../../components/headers/HomeHeader";
import { moderateScale, verticalScale } from "../../lib/utils";
import TouchItem from "../../components/clickables/TouchItem";
import { SCREENS } from "../../routes/screens";
import { useFocusEffect } from "@react-navigation/native";
import { getDocuments } from "../../api/apiService";

const Dashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tabs, setTabs] = useState({
    pickups: 0,
    completed: 0,
  });

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

  const getRequests = () => {
    getDocuments("requests")
      .then((res) => {
        console.log("RES", res);
        const myPickups = res.filter((req) => {
          return (
            req?.requestData?.acceptedBy?.uid === (user.uid || user.id) &&
            req?.status !== "request completed"
          );
        });
        const myCompleted = res.filter((req) => {
          return (
            req?.requestData?.acceptedBy?.uid === (user.uid || user.id) &&
            req?.status === "request completed"
          );
        });
        setTabs({
          pickups: myCompleted.length + myPickups.length,
          completed: myCompleted.length,
        });
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Focus gained. Calling getRequests...");
      getRequests();
    }, []) // Include getRequests in the dependencies array
  );
  return (
    <View>
      <HomeHeader showLogoutAlert={showLogoutAlert} />
      <View className="mt-2 flex-row justify-between items-center px-6">
        <View style={styles.topCard}>
          <Text style={styles.cardHeadText}>No of Pickups</Text>
          <Text style={styles.cardText}>{tabs.pickups}</Text>
        </View>
        <View style={styles.topCard}>
          <Text style={styles.cardHeadText}>Completed</Text>
          <Text style={styles.cardText}>{tabs.completed}</Text>
        </View>
      </View>
      <ScrollView className="mt-2 px-6 mb-72">
        <View className="flex-row justify-between items-center my-2 ">
          <TouchItem
            left
            title="Available Requests"
            bg="bg-fuchsia-300"
            textColor="text-fuchsia-950"
            onPress={() => navigation.navigate(SCREENS.CollectorRequest)}
          />
          <TouchItem
            right
            title="Picked Requests"
            bg="bg-amber-300"
            textColor="text-amber-950"
            onPress={() => navigation.navigate(SCREENS.CollectorViewRequests)}
          />
        </View>
        <View className="flex-row justify-between items-center my-2 ">
          <TouchItem
            left
            title="Completed Requests"
            bg="bg-sky-300"
            textColor="text-sky-950"
            onPress={() => navigation.navigate(SCREENS.CollectorCompleted)}
          />
          <TouchItem
            right
            title="Support"
            bg="bg-rose-300"
            textColor="text-rose-950"
            onPress={() => navigation.navigate(SCREENS.Support)}
          />
        </View>
        <View className=" justify-between items-center my-2 mb-24">
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

const styles = StyleSheet.create({
  topCard: {
    height: verticalScale(100),
    backgroundColor: "#86efac",
    width: "48%",
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeadText: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#052e16",
  },
  cardText: {
    fontSize: moderateScale(24),
    fontWeight: "800",
    color: "#052e16",
  },
});
