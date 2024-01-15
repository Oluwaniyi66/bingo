import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../routes/screens";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { moderateScale, verticalScale } from "../../lib/utils";

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

const HomeHeader = ({ showLogoutAlert }) => {
  const { user } = useAuth();
  const currentDate = new Date();
  const navigation = useNavigation();
  const isCollector = user?.profile?.userType === "collector";

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
    <View
      className="h-44 bg-green-900 w-full rounded-br-full"
      style={{ height: verticalScale(175) }}
    >
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 px-6 pt-8 flex-row items-center">
        <TouchableOpacity
          className="mr-3"
          onPress={() => navigation.navigate(SCREENS.ProfileUpdateModal)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: user?.profile?.imageUrl || "" }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text
            className="text-white text-lg font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            {getGreeting()},
          </Text>
          {isCollector ? (
            <Text
              className="text-white text-xl font-bold"
              style={{ fontSize: moderateScale(20) }}
            >
              {user?.profile?.companyDetails?.companyName}
            </Text>
          ) : (
            <Text
              className="text-white text-xl font-bold"
              style={{ fontSize: moderateScale(20) }}
            >
              {user?.profile?.firstName} {user?.profile?.lastName}
            </Text>
          )}
          <Text
            className="text-white text-sm font-light mt-2"
            style={{ fontSize: moderateScale(12) }}
          >
            {formattedDate}
          </Text>
        </View>
      </SafeAreaView>
      <View className=" items-end px-3 pt-5">
        <TouchableOpacity
          onPress={showLogoutAlert}
          className="absolute right-1 bottom-0.5 bg-transparent p-1"
        >
          <AntDesign name="logout" size={moderateScale(32)} color="#450a0a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  image: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(75),
  },
});
