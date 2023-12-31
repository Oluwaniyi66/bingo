import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { moderateScale } from "../../lib/utils";

const CustomInput = ({
  label = "Input",
  placeholder = `Input ${label}`,
  value,
  onChangeText,
  error,
  keyboardType,
  secureTextEntry,
  pressable = false,
  onPress = () => {},
  ...rest
}) => {
  const [passwordInput, setPasswordInput] = useState(secureTextEntry);
  return (
    <View className="my-3">
      {pressable && (
        <TouchableOpacity style={styles.pressable} onPress={onPress} />
      )}
      <Text
        className="font-medium text-base text-green-950 mb-2"
        style={{ fontSize: moderateScale(15) }}
      >
        {label}
      </Text>
      <TextInput
        className="h-14 border border-green-700 px-4"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={passwordInput}
        {...rest}
      />
      {secureTextEntry && (
        <Text
          className="text-gray-600 absolute right-2 top-12"
          onPress={() => setPasswordInput(!passwordInput)}
        >
          {passwordInput ? "SHOW" : "HIDE"}
        </Text>
      )}

      {error ? (
        <Animatable.Text animation="shake" className="text-red-400 mt-2">
          {error}
        </Animatable.Text>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: moderateScale(8),
    fontSize: moderateScale(16),
    backgroundColor: "#fff",
  },
  pressable: {
    zIndex: 10,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
