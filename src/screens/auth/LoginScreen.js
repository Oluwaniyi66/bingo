import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREENS } from "../../routes/screens";
import AuthHeader from "../../components/headers/AuthHeader";
import FlatBtn from "../../components/button/FlatBtn";
import CustomInput from "../../components/inputs/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../lib/hooks/useAuth";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^.{8,}$/;

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "267109392898-8ul7abiio1395l0ga2e52bgp435o8r5g.apps.googleusercontent.com",
    iosClientId:
      "267109392898-gv35n3knvsiomhdl53n0lh1jjdk5pebv.apps.google.googleusercontent.com",
  });

  // Add states to manage email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Add state for validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle text input changes
  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(""); // Clear the error when the user starts typing
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(""); // Clear the error when the user starts typing
  };

  const handleGoogleSignIn = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      if (response.type === "success") {
        console.log(response);
        await getUserInfo(response.authentication.accessToken);
      }
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await res.json();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    }
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

  const handleSignIn = () => {
    if (validateInputs()) {
      // Perform sign-in logic here
    }
  };

  return (
    <View className="flex-1">
      <AuthHeader title="Login" />

      <KeyboardAwareScrollView className="px-5">
        <View className="my-6">
          <FlatBtn
            icon={<AntDesign name="googleplus" size={24} color="#fbbc05" />}
            title="Sign in with Google"
            color="#4285f4"
            onPress={() => promptAsync()}
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
            <FlatBtn title="Sign In" onPress={handleSignIn} />
          </View>
        </View>
        <TouchableOpacity
          className="py-2 mx-10 my-10"
          activeOpacity={0.7}
          onPress={() => navigation.navigate(SCREENS.Register)}
        >
          <Text className="text-center text-xl text-green-800 font-bold">
            Create Account
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
