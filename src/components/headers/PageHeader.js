import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, verticalScale } from "../../lib/utils";

const PageHeader = ({ title = "Page Title", backPress }) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    if (backPress) {
      backPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      className="bg-green-900 h-32 px-5 flex-row items-center "
      style={{ height: verticalScale(125), paddingTop: verticalScale(70) }}
    >
      <TouchableOpacity
        onPress={onBackPress}
        style={{ padding: moderateScale(5) }}
      >
        <Ionicons
          name="chevron-back-circle-outline"
          size={moderateScale(45)}
          color="white"
        />
      </TouchableOpacity>
      <Text
        className="text-white font-semibold ml-5"
        style={{ fontSize: moderateScale(24) }}
      >
        {title}
      </Text>
      <View style={styles.largeCircle} />
      <View style={styles.SmallCircle} />
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  largeCircle: {
    borderWidth: 0.8,
    width: 170,
    height: 170,
    borderRadius: 250,
    position: "absolute",
    right: -50,
    top: -50,
    borderColor: "#f1f1f1",
  },
  SmallCircle: {
    borderWidth: 0.8,
    width: 50,
    height: 50,
    borderRadius: 60,
    position: "absolute",
    right: 60,
    top: 100,
    borderColor: "#f1f1f1",
  },
});
