import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeContainer = ({ title = "Page Title" }) => {
  return <View className="flex-1"></View>;
};

export default SafeContainer;

const styles = StyleSheet.create({});
