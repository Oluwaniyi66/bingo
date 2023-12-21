import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { moderateScale } from "../../lib/utils";

const FlatBtn = ({
  icon,
  title = "Title",
  color = "#052e16",
  onPress = () => {},
  isLoading,
  disabled,
  textColor = "white",
  textStyles,
}) => {
  return (
    <TouchableOpacity
      className="w-full bg-green-700 p-4 items-center flex-row justify-center"
      style={[
        styles.btnContainer,
        { backgroundColor: disabled ? `${color}70` : color },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {icon && <View className="mr-2">{icon}</View>}
      {isLoading ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        <Text
          className="text-xl text-white font-semibold "
          style={{
            color: textColor,
            fontSize: moderateScale(16),
            ...textStyles,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FlatBtn;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 8,
  },
});
