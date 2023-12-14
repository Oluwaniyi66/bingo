import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PageHeader from "../../components/headers/PageHeader";
import SettingsCard from "../../components/clickables/SettingsCard";
import { SCREENS } from "../../routes/screens";
import useAuth from "../../lib/hooks/useAuth";

const Settings = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <View>
      <PageHeader title="Settings" />
      <ScrollView>
        <SettingsCard
          title="Profile"
          onPress={() => navigation.navigate(SCREENS.ProfileUpdateModal)}
        />
        <SettingsCard title="About Bingo" />
        <SettingsCard title="Terms and Conditions" />
        <SettingsCard title="Contact Us" />
        <SettingsCard title="Logout" onPress={logout} />
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
