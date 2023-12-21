import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressModal = ({ setAddress, openModal = true, closeModal }) => {
  return (
    <Modal isVisible={openModal} onBackdropPress={closeModal}>
      <View style={{ flex: 0.5 }} className="bg-white rounded-lg p-3">
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
            setAddress({
              location: details.geometry.location,
              description: data.description,
            });
            closeModal();
          }}
          returnKeyType={"search"}
          styles={{
            container: {
              borderWidth: 1,
              flex: 0,
              borderColor: "#052e16",
              borderRadius: 12,
            },
          }}
          fetchDetails={true}
          query={{
            // key: process.env.FB_API_KEY,
            key: "AIzaSyC_5hDyvo0dHqvopWI_k2KcDkeV4LWpF_k",
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
        />
      </View>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({});
