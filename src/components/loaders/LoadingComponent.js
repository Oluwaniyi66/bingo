import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingComponent = ({ color, text = "Loading...", isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={color} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the alpha value for transparency

    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "black", // Adjust the text color
  },
});

export default LoadingComponent;
