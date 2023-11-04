import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";

const AuthHeader = ({ title = "Page" }) => {
  return (
    <View className="h-56 bg-green-800 pt-40 px-5" style={styles.container}>
      <View style={styles.largeCircle} />
      <View style={styles.SmallCircle} />
      <StatusBar style="light" />
      <Animatable.Text
        className="text-white text-3xl font-extrabold"
        animation="slideInLeft"
      >
        {title}
      </Animatable.Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  largeCircle: {
    borderWidth: 1.2,
    width: 200,
    height: 200,
    borderRadius: 250,
    position: "absolute",
    right: -50,
    top: -50,
    borderColor: "#f1f1f1",
  },
  SmallCircle: {
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 60,
    position: "absolute",
    right: 100,
    top: 100,
    borderColor: "#f1f1f1",
  },
  container: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
});
