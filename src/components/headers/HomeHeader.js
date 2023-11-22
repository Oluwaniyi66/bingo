import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

const HomeHeader = () => {
  const { user, logout } = useAuth();
  const currentDate = new Date();

  // Format options for date and time
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  // Get formatted date and time strings
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
  const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

  return (
    <View className="h-40 bg-green-900 w-full rounded-br-3xl">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 px-6 pt-6 flex-row items-center">
        <View className="mr-3">
          <Image source={{ uri: user.profile.imageUrl }} style={styles.image} />
        </View>
        <View>
          <Text className="text-white text-lg font-semibold">
            {getGreeting()},
          </Text>
          <Text className="text-white text-xl font-bold">
            {user?.profile.firstName} {user?.profile.lastName}
          </Text>
          <Text className="text-white text-sm font-light mt-2">
            {formattedDate}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
});
