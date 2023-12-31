import { Alert, StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { FB_IOS_CLIENT_ID, FB_ANDROID_CLIENT_ID } from "@env";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loadingInit, setLoadingInit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: FB_ANDROID_CLIENT_ID,
    iosClientId: FB_IOS_CLIENT_ID,
  });

  useEffect(() => {
    handleGoogleSignIn();
  }, [response]);

  useEffect(() => {
    // Check if there is data in AsyncStorage
    const checkAsyncStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          // If there is data, parse it and set the user
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function to check AsyncStorage
    checkAsyncStorage();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        setUser(userInfo);
      } else {
        setUser(null);
        AsyncStorage.removeItem("user").then((res) =>
          console.log("User removed from storage")
        );
      }
    });
    setLoadingInit(false);

    return unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      if (response.type === "success") {
        console.log(response);
        const credentials = GoogleAuthProvider.credential(
          response.authentication.idToken,
          response.authentication.accessToken
        );
        await signInWithCredential(auth, credentials);
        await getUserInfo(response.authentication.accessToken);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userObj = await res.json();
      console.log("RES", userObj);
      if (userObj.name) {
        await AsyncStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Error", "Something went wrong. please try again");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const signUpWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      Alert.alert("Error", error.code);
    }
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      Alert.alert("Error", error.code);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      // Password reset email sent successfully
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
      Alert.alert("Error", error.code);
    }
  };

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .then((res) => {
        console.log("res", res);
        AsyncStorage.removeItem("user").then((res) =>
          console.log("User removed from storage")
        );
        setUser(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const updateProfile = async (profile) => {
    setLoading(true);
    try {
      const userUpdated = { ...user, profile }; // assuming `profile` is an object
      await AsyncStorage.setItem("user", JSON.stringify(userUpdated));
      setUser(userUpdated);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // const memoValue = useMemo(
  //   () => ({
  //     user,
  //     promptAsync,
  //     error,
  //     loading,
  //     logout,
  //     signUpWithEmailAndPassword,
  //     signInUserWithEmailAndPassword,
  //     forgotPassword,
  //     updateProfile,
  //   }),
  //   [user, loading, error]
  // );

  return (
    <AuthContext.Provider
      value={{
        user,
        promptAsync,
        error,
        loading,
        logout,
        signUpWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        forgotPassword,
        updateProfile,
      }}
    >
      {!loadingInit && children}
    </AuthContext.Provider>
  );
};

export default useAuth = () => {
  return useContext(AuthContext);
};
