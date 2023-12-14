import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PageHeader from "../../components/headers/PageHeader";
import Mailer from "react-native-mail";
import { verticalScale } from "../../lib/utils";
import CustomInput from "../../components/inputs/CustomInput";
import FlatBtn from "../../components/button/FlatBtn";

const Support = () => {
  const [title, setTitle] = useState("");
  const [concerns, setConcerns] = useState("");

  const sendEmail = () => {
    if (title.trim() === "" || concerns.trim() === "") {
      // You may want to add some validation here
      alert("Please enter a title and your concerns before sending.");
      return;
    }

    // Use the Mailer module to send an email
    Mailer.mail(
      {
        subject: title,
        recipients: ["abolaoni@gmail.com"], // Add your email here
        body: concerns,
        isHTML: false,
      },
      (error, event) => {
        if (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          alert(error);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Support" />
      <View style={styles.contentContainer}>
        <CustomInput
          label="Title"
          placeholder="What is the title of your concern"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <CustomInput
          label="Message"
          placeholder="Enter your concerns"
          value={concerns}
          onChangeText={(text) => setConcerns(text)}
          multiline
          numberOfLines={4}
          style={styles.textInput}
        />

        <FlatBtn title="Send" onPress={sendEmail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  textInput: {
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
    height: verticalScale(120),
  },
  sendButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Support;
