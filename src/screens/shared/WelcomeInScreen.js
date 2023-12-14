import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { SCREENS } from "../../routes/screens";
import { subscribeToDocumentSnapshot } from "../../api/apiService";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "../../lib/utils";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";

const WelcomeInScreen = ({ navigation }) => {
  const { user, logout, updateProfile } = useAuth();
  const [loadingText, setLoadingText] = useState("Welcome");

  useFocusEffect(() => {
    console.log(user?.uid, user?.id);
    const unsubscribe = subscribeToDocumentSnapshot(
      "users",
      user?.uid || user?.id,
      (data) => {
        if (data) {
          // Handle the updated data
          updateProfile(data);
          if (data?.userType === "customer") {
            navigation.navigate(SCREENS.stacks.Customer);
          } else {
            navigation.navigate(SCREENS.stacks.Collector);
          }
        } else {
          // Handle the case when the document does not exist
          console.log("Document does not exist.", data);
          navigation.navigate(SCREENS.ProfileUpdateModal);
        }
      }
    );

    // Clean up the subscription when the component unmounts or as needed
    return () => unsubscribe();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      switch (loadingText) {
        case "Welcome":
          setLoadingText("Checking your profile");
          break;
        case "Checking your profile":
          setLoadingText("Setting up your dashboard");
          break;
        case "Setting up your dashboard":
          setLoadingText("Welcome");
          break;
        default:
          break;
      }
    }, 3000); // Adjust the interval duration as needed

    return () => clearInterval(interval);
  }, [loadingText]);

  return (
    <View className="flex-1  bg-green-50">
      <SafeAreaView className="flex-1 px-6">
        <View className=" items-end px-3 pt-5">
          <TouchableOpacity onPress={logout}>
            <AntDesign name="logout" size={32} color="#450a0a" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center">
          <Animatable.Text
            animation="fadeIn"
            duration={3000}
            iterationCount="infinite"
            className="text-2xl text-green-800 mb-5 font-semibold"
          >
            {loadingText}...
          </Animatable.Text>
          <ActivityIndicator size="large" color={"green"} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.ProfileUpdateModal)}
        >
          <Text className="text-center text-xl text-blue-600">
            Complete your Profile
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeInScreen;

const styles = StyleSheet.create({});
