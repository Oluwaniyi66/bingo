import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const SettingsCard = ({ title = "Title", onPress = () => {} }) => {
  return (
    <TouchableOpacity
      className="py-8 border-b-2 border-green-800  justify-center px-5"
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text className="font-semibold text-green-900">{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({});
