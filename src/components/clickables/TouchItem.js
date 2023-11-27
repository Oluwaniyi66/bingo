import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

const TouchItem = ({
  bg = "",
  textColor,
  right,
  left,
  title = "TouchItem",
  fullWidth,
  onPress = () => {},
}) => {
  const borderSetting = () => {
    if (right) {
      return "rounded-l-none";
    } else if (left) {
      return "rounded-r-none";
    } else {
      return "rounded-2xl";
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`p-6 rounded-2xl items-center justify-center ${
        bg ? bg : "bg-green-200"
      } ${borderSetting()}`}
      style={[styles.container, { width: fullWidth ? "100%" : "48%" }]}
    >
      <Text
        className={`text-lg font-semibold ${
          textColor ? textColor : "text-green-950"
        } text-center`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchItem;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(24),
  },
});
