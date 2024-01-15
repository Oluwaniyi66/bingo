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
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../lib/hooks/useAuth";
import { auth } from "../../../firebase";
import LoadingComponent from "../../components/loaders/LoadingComponent";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^.{8,}$/;

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { promptAsync, loading, signInUserWithEmailAndPassword } = useAuth();
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

  const handleSignIn = () => {
    if (validateInputs()) {
      // Perform sign-in logic here
      signInUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <View className="flex-1">
      <AuthHeader title="Login" />
      <LoadingComponent isLoading={loading} />

      <KeyboardAwareScrollView className="px-5">
        {/* <View className="my-5">
          <FlatBtn
            icon={<AntDesign name="googleplus" size={24} color="#fbbc05" />}
            title="Sign in with Google"
            color="#4285f4"
            onPress={() => promptAsync()}
          />
        </View> */}
        {/* <Text className="my-3 text-center text-green-900 font-bold text-lg">
          OR
        </Text> */}
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

          <View className="flex-row align-middle justify-end">
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.ForgotPass)}
            >
              <Text className="text-gray-700 font-medium text-sm py-1">
                Forgot/Reset Password
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-7">
            <FlatBtn title="Sign In" onPress={handleSignIn} />
          </View>
        </View>
        <TouchableOpacity
          className="py-2 mx-10 my-8"
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
