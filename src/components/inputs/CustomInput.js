import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const CustomInput = ({
  label = "Input",
  placeholder = `Input ${label}`,
  value,
  onChangeText,
  error,
  keyboardType,
  secureTextEntry,
  ...rest
}) => {
  const [passwordInput, setPasswordInput] = useState(secureTextEntry);
  return (
    <View className="my-3">
      <Text
        className="font-medium text-base text-green-950 mb-2"
        style={{ fontSize: responsiveFontSize(1.9) }}
      >
        {label}
      </Text>
      <TextInput
        className=" h-14 border border-green-700 px-4"
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
    borderRadius: 8,
    fontSize: responsiveFontSize(1.8),
    backgroundColor: "#fff",
  },
});
