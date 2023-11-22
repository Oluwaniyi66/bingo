import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AuthHeader from "../../components/headers/AuthHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FlatBtn from "../../components/button/FlatBtn";

import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../../components/inputs/CustomInput";
import { SCREENS } from "../../routes/screens";
import useAuth from "../../lib/hooks/useAuth";
import LoadingComponent from "../../components/loaders/LoadingComponent";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^.{8,}$/;

const RegisterScreen = ({ navigation }) => {
  const { promptAsync, loading, signUpWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(""); // Clear the error when the user starts typing
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(""); // Clear the error when the user starts typing
  };

  // Validation function for email and password
  const validateInputs = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = () => {
    if (validateInputs()) {
      // Perform sign-in logic here
      signUpWithEmailAndPassword(email, password);
    }
  };

  return (
    <View className="flex-1">
      <AuthHeader title="Register" />
      <LoadingComponent isLoading={loading} />
      <KeyboardAwareScrollView className="px-5">
        <View className="my-6">
          <FlatBtn
            icon={<AntDesign name="googleplus" size={24} color="#fbbc05" />}
            title="Sign up with Google"
            color="#4285f4"
          />
        </View>
        <Text className="my-5 text-center text-green-900 font-bold text-lg">
          OR
        </Text>
        <View>
          <CustomInput
            label="Email"
            placeholder="Input your email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            error={emailError}
          />
          <CustomInput
            label="Password"
            placeholder="**************"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            error={passwordError}
          />
          <View className="mt-8">
            <FlatBtn title="Sign Up" onPress={handleSignUp} />
          </View>
        </View>

        <TouchableOpacity
          className="py-2 mx-10 my-10"
          activeOpacity={0.7}
          onPress={() => navigation.navigate(SCREENS.Login)}
        >
          <Text className="text-center text-xl text-green-800 font-bold">
            Login
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
