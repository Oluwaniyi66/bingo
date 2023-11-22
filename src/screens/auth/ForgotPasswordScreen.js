import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/inputs/CustomInput";
import AuthHeader from "../../components/headers/AuthHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import FlatBtn from "../../components/button/FlatBtn";
import LoadingComponent from "../../components/loaders/LoadingComponent";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SCREENS } from "../../routes/screens";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ForgotPasswordScreen = ({ navigation }) => {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(""); // Clear the error when the user starts typing
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setResetSent(true);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };
  return (
    <View className="flex-1">
      <AuthHeader title="Reset Password" />
      <LoadingComponent isLoading={loading} />
      <KeyboardAwareScrollView className="px-5 pt-10">
        <CustomInput
          label="Email"
          placeholder="Input your email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          error={emailError}
        />
        <View className="mt-7">
          <FlatBtn title="Reset Password" onPress={handleForgotPassword} />
        </View>

        {resetSent && (
          <Animatable.Text
            animation="shake"
            className="py-12 text-green-800 text-xl font-semibold text-center"
          >
            Password reset email sent. Check your inbox.
          </Animatable.Text>
        )}
      </KeyboardAwareScrollView>
      <TouchableOpacity
        className="items-center flex-row justify-center absolute bottom-12 left-0 right-0"
        onPress={() => navigation.navigate(SCREENS.Login)}
      >
        <Ionicons name="arrow-back-circle-sharp" size={32} color="black" />
        <Text className="ml-2 text-lg">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
