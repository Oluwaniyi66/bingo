import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import { getDocuments, setDocument } from "../../api/apiService";
import DropDownPicker from "react-native-dropdown-picker";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingComponent from "../../components/loaders/LoadingComponent";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import FlatBtn from "../../components/button/FlatBtn";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../../lib/hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import CustomInput from "../../components/inputs/CustomInput";
import { serverTimestamp } from "firebase/firestore";

const RequestPickup = ({ navigation }) => {
  const [wasteTypes, setWasteTypes] = useState([]);
  const [wasteSizes, setWasteSizes] = useState([]);
  const [wasteWeights, setWasteWeights] = useState([]);
  const [selectedWasteType, setSelectedWasteType] = useState("");
  const [selectedWasteWeight, setSelectedWasteWeight] = useState("");
  const [selectedWasteSize, setSelectedWasteSize] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { user } = useAuth();

  const getWasteTypes = () => {
    getDocuments("waste-types")
      .then((res) => {
        setWasteTypes(
          res[0].types.map((type) => {
            return {
              label: type,
              value: type,
            };
          })
        );
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      });
  };
  console.log("====================================");
  console.log(user.uid);
  console.log("====================================");
  const getWasteSizes = () => {
    getDocuments("size-bands")
      .then((res) => {
        setWasteSizes(
          res[0].bands.map((type) => {
            return {
              label: `${type} kitchen bags`,
              value: type,
            };
          })
        );
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      });
  };
  const getWasteWeights = () => {
    getDocuments("weight-bands")
      .then((res) => {
        setWasteWeights(
          res[0].bands.map((type) => {
            return {
              label: `${type} kg`,
              value: type,
            };
          })
        );
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      });
  };
  useEffect(() => {
    getWasteTypes();
    getWasteSizes();
    getWasteWeights();
  }, []);

  const pickImage = async () => {
    ImagePicker.requestCameraPermissionsAsync().then(async (res) => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      if (!res.granted) {
        Alert.alert("Error", "WE nee");
      } else {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [8, 10],
          quality: 0.5,
        });

        if (!result.canceled) {
          try {
            setImageLoading(true);

            setSelectedImages([...selectedImages, result.assets[0].uri]);
            // Convert URI to Blob
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();

            // Generate a unique filename
            const filename = `${user.uid}_${new Date().getTime()}.jpg`;

            // Reference to the storage location
            const storageRef = ref(storage, `request_images/${filename}`);

            // Upload image to Firebase Storage
            const uploadTask = uploadBytesResumable(storageRef, blob);

            // Get download URL after successful upload
            uploadTask.on("state_changed", null, null, async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Update the image state
              // setImage(downloadURL);
              setImages([...images, downloadURL]);
              setImageLoading(false);
            });
          } catch (error) {
            console.error("Error uploading image: ", error);
            setImageLoading(false);
          }
        }
      }
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedWasteType) {
      errors.wasteType = "Waste Type is required";
    }
    if (!selectedWasteSize) {
      errors.wasteSize = "Waste Size is required";
    }
    if (!selectedWasteSize) {
      errors.wasteWeight = "Waste Size is required";
    }
    if (!images[0]) {
      errors.images = "At least one Image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      const docId = `${user.uid}_${new Date().getTime()}`;
      setDocument("requests", docId, {
        type: selectedWasteType,
        weight: selectedWasteWeight,
        size: selectedWasteSize,
        status: "initiated",
        message,
        images,
        profile: user.profile,
        user: user.uid,
        created_on: serverTimestamp(),
      })
        .then((res) => {
          Alert.alert(
            "Success",
            "Request Successfully created",
            [
              {
                text: "Okay",
                onPress: () => {
                  // Perform the desired action when "Okay" is pressed
                  navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      Alert.alert("Validation Error", "Please fill in all required fields.");
    }
  };

  console.log("====================================");
  console.log("IMAGES", selectedWasteType);
  console.log("====================================");
  console.log("====================================");
  console.log("SEKECTED IMAGES", selectedImages);
  console.log("====================================");

  return (
    <View className="flex-1">
      <PageHeader title="Request Pickup" />
      {imageLoading && (
        <LoadingComponent text="Uploading..." isLoading={true} />
      )}
      {isLoading && <LoadingComponent text="Making Request" isLoading={true} />}
      <KeyboardAwareScrollView className="px-5 py-5 flex-1 mb-4">
        <View className="mb-4">
          <Text
            className="font-medium text-base text-green-950 mb-2"
            style={{ fontSize: responsiveFontSize(2) }}
          >
            Waste Type
          </Text>
          <DropDownPicker
            open={open}
            value={selectedWasteType}
            items={wasteTypes}
            setOpen={setOpen}
            setValue={setSelectedWasteType}
            setItems={setWasteTypes}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              fontSize: responsiveFontSize(1.8),
              borderColor: "#15803d",
            }}
            placeholder="select the type of waste"
            autoScroll
            listMode="MODAL"
            modalTitle="Select the type of waste"
          />
          {formErrors.wasteType && (
            <Text className="text-red-800 text-xs">{formErrors.wasteType}</Text>
          )}
        </View>
        <View className="mb-4">
          <Text
            className="font-medium text-base text-green-950 mb-2"
            style={{ fontSize: responsiveFontSize(2) }}
          >
            Approximate weight (kg)
          </Text>
          <DropDownPicker
            open={openWeight}
            value={selectedWasteWeight}
            items={wasteWeights}
            setOpen={setOpenWeight}
            setValue={setSelectedWasteWeight}
            setItems={setWasteWeights}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              fontSize: responsiveFontSize(1.8),
              borderColor: "#15803d",
            }}
            placeholder="select the approximate weight of waste"
            autoScroll
            listMode="MODAL"
            modalTitle="Select the approximate weight of waste"
          />
          {formErrors.wasteWeight && (
            <Text className="text-red-800 text-xs">
              {formErrors.wasteWeight}
            </Text>
          )}
        </View>
        <View className="mb-1">
          <Text
            className="font-medium text-base text-green-950 mb-2"
            style={{ fontSize: responsiveFontSize(2) }}
          >
            Approximate Size (kitchen bags)
          </Text>
          <DropDownPicker
            open={openSize}
            value={selectedWasteSize}
            items={wasteSizes}
            setOpen={setOpenSize}
            setValue={setSelectedWasteSize}
            setItems={setWasteSizes}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              fontSize: responsiveFontSize(1.8),
              borderColor: "#15803d",
            }}
            placeholder="select the approximate size of waste"
            autoScroll
            listMode="MODAL"
            modalTitle="Select the approximate size of waste"
          />
          {formErrors.wasteSize && (
            <Text className="text-red-800 text-xs">{formErrors.wasteSize}</Text>
          )}
        </View>
        <View>
          <CustomInput
            label="Any Other Information"
            style={{
              height: 120,
              borderRadius: 12,
              backgroundColor: "white",
            }}
            numberOfLines={5}
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <ScrollView horizontal>
          {images[0] &&
            images?.map((img) => (
              <Image source={{ uri: img }} style={styles.images} key={img} />
            ))}
        </ScrollView>
        {images[0] && (
          <Text className="text-right">
            {images.length} {images.length > 1 ? "images" : "image"} added
          </Text>
        )}

        <View className="mt-3">
          <FlatBtn
            title={"Add Images"}
            onPress={pickImage}
            isLoading={imageLoading}
            color="transparent"
            textColor="#052e16"
            icon={<FontAwesome name="camera-retro" size={24} color="#052e16" />}
          />
          {formErrors.images && (
            <Text className="text-red-800 text-xs">{formErrors.images}</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
      <View className="mb-5 px-5">
        <FlatBtn
          title="Send Request"
          onPress={onSubmit}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default RequestPickup;

const styles = StyleSheet.create({
  images: {
    height: 80,
    width: 80,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
