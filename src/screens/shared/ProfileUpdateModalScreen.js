import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/inputs/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {
  SCREEN_WIDTH,
  isAndroid,
  moderateScale,
  verticalScale,
} from "../../lib/utils";
import FlatBtn from "../../components/button/FlatBtn";
import { setDocument } from "../../api/apiService";
import { SCREENS } from "../../routes/screens";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import LoadingComponent from "../../components/loaders/LoadingComponent";
import { AntDesign } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileUpdateModalScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [userType, setUserType] = useState(user?.profile?.userType || "");
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    phoneNumber: user?.profile?.phoneNumber || "",
    emailAddress: user?.email || "",
    userType: user?.profile?.userType || "",
    companyDetails: {
      companyName: user?.profile?.companyDetails?.companyName || "",
      companyAddress: user?.profile?.companyDetails?.companyAddress || "",
      numberOfTrucks: user?.profile?.companyDetails?.numberOfTrucks || "",
      state: user?.profile?.companyDetails?.state || "",
      country: user?.profile?.companyDetails?.country || "",
    },
    userDetails: {
      address: user?.profile?.userDetails?.address || "",
      state: user?.profile?.userDetails?.state || "",
      country: user?.profile?.userDetails?.country || "",
    },
    imageUrl: user?.profile?.imageUrl || "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (fieldName, value, section = "") => {
    if (section) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [section]: {
          ...prevValues[section],
          [fieldName]: value,
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formValues.imageUrl.trim()) {
      errors.imageUrl = "Profile Image is required";
    }

    // Validate first name
    if (!formValues.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    // Validate last name
    if (!formValues.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    // Validate phone number
    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.emailAddress.trim()) {
      errors.emailAddress = "Email Address is required";
    } else if (!emailRegex.test(formValues.emailAddress)) {
      errors.emailAddress = "Invalid email format";
    }

    // Validate user type
    if (!formValues.userType.trim()) {
      errors.userType = "User Type is required";
    }

    // Validate nested fields based on user type
    if (formValues.userType === "user") {
      // Validate home address
      if (!formValues.userDetails.address.trim()) {
        errors.userDetails = {
          ...errors.userDetails,
          address: "Home Address is required",
        };
      }
      // Validate state
      if (!formValues.userDetails.state.trim()) {
        errors.userDetails = {
          ...errors.userDetails,
          state: "State is required",
        };
      }
      // Validate country
      if (!formValues.userDetails.country.trim()) {
        errors.userDetails = {
          ...errors.userDetails,
          country: "Country is required",
        };
      }
    } else if (formValues.userType === "collector") {
      // Validate company name
      if (!formValues.companyDetails.companyName.trim()) {
        errors.companyDetails = {
          ...errors.companyDetails,
          companyName: "Company Name is required",
        };
      }
      // Validate company address
      if (!formValues.companyDetails.companyAddress.trim()) {
        errors.companyDetails = {
          ...errors.companyDetails,
          companyAddress: "Company Address is required",
        };
      }
      // Validate state
      if (!formValues.companyDetails.state.trim()) {
        errors.companyDetails = {
          ...errors.companyDetails,
          state: "State is required",
        };
      }
      // Validate country
      if (!formValues.companyDetails.country.trim()) {
        errors.companyDetails = {
          ...errors.companyDetails,
          country: "Country is required",
        };
      }
      // Validate number of trucks
      if (!formValues.companyDetails.numberOfTrucks.trim()) {
        errors.companyDetails = {
          ...errors.companyDetails,
          numberOfTrucks: "Number of Trucks is required",
        };
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      setDocument("users", user.uid, formValues)
        .then((res) => {
          Alert.alert(
            "Success",
            "Profile Successfully submitted",
            [
              {
                text: "Okay",
                onPress: () => {
                  // Perform the desired action when "Okay" is pressed
                  navigation.navigate(SCREENS.WelcomeInScreen);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormValues({
        ...formValues,
        imageUrl: "",
      });
      try {
        setImageLoading(true);

        // Convert URI to Blob
        setImage(result.assets[0]);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        // Generate a unique filename
        const filename = `${user.uid}_${new Date().getTime()}.jpg`;

        // Reference to the storage location
        const storageRef = ref(storage, `profile_images/${filename}`);

        // Upload image to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // Get download URL after successful upload
        uploadTask.on("state_changed", null, null, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update the image state
          // setImage(downloadURL);
          handleInputChange("imageUrl", downloadURL);
          setImageLoading(false);
        });
      } catch (error) {
        console.error("Error uploading image: ", error);
        setImageLoading(false);
      }
    }
  };

  useEffect(() => {
    if (formValues.imageUrl) {
      setImageLoading(false);
    }
  }, [formValues.imageUrl]);

  return (
    <View className="flex-1  px-4 bg-green-50 ">
      <TouchableOpacity
        className="  bg-red-100 items-center justify-center p-3 rounded-b-lg"
        onPress={() => navigation.goBack()}
        style={{ paddingTop: isAndroid && verticalScale(50) }}
      >
        <MaterialIcons name="cancel" size={moderateScale(30)} color="#ef4444" />
      </TouchableOpacity>
      {imageLoading && (
        <View style={styles.loadingBlock}>
          <LoadingComponent text="Uploading..." isLoading={imageLoading} />
        </View>
      )}
      {user?.profile?.imageUrl ? (
        <View className="items-center justify-center mt-4">
          <Image
            source={{
              uri: formValues?.imageUrl,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: "#f1f1f1",
            }}
          />
        </View>
      ) : (
        <View className="mt-6">
          <Text
            className=" font-semibold text-center text-green-950"
            style={{ fontSize: responsiveFontSize(2.5) }}
          >
            Welcome,
          </Text>
          <Text
            className="text-xl font-semibold text-center my-2 text-green-950"
            style={{ fontSize: responsiveFontSize(2.3) }}
          >
            "{user?.displayName || user?.email}"
          </Text>
        </View>
      )}
      {!user?.profile?.imageUrl && (
        <Text className="font-semibold mt-4 mb-4">Complete Your Profile</Text>
      )}
      <KeyboardAwareScrollView className="flex-1  px-4 bg-green-50">
        <View>
          <CustomInput
            label="First Name"
            value={formValues.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
            error={formErrors.firstName}
          />
          <CustomInput
            label="Last Name"
            value={formValues.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
            error={formErrors.lastName}
          />
          <CustomInput
            label="Phone Number"
            value={formValues.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
            keyboardType="phone-pad"
            error={formErrors.phoneNumber}
          />
          <CustomInput
            label="Email Address"
            value={formValues.emailAddress}
            onChangeText={(text) => handleInputChange("emailAddress", text)}
            keyboardType="email-address"
            error={formErrors.emailAddress}
          />
          <View className="h-1 bg-green-950 rounded-md my-3" />

          {/* UserType Section */}
          <Text className="font-semibold text-2xl text-green-950 mb-2 text-center">
            You are a
          </Text>
          <View className="my-5 flex-row justify-around items-center">
            <TouchableOpacity
              style={
                formValues.userType === "customer"
                  ? styles.selectedBlock
                  : styles.usageBlock
              }
              onPress={() => handleInputChange("userType", "customer")}
            >
              <Ionicons
                name="person"
                size={moderateScale(29)}
                color={formValues.userType === "customer" ? "white" : "#052e16"}
              />

              <Text
                className={`mt-3 ${
                  formValues.userType === "customer"
                    ? "text-white"
                    : "text-green-950"
                }`}
                style={{ fontSize: moderateScale(15) }}
              >
                CUSTOMER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                formValues.userType === "collector"
                  ? styles.selectedBlock
                  : styles.usageBlock
              }
              onPress={() => handleInputChange("userType", "collector")}
            >
              <Fontisto
                name="truck"
                size={moderateScale(29)}
                color={
                  formValues.userType === "collector" ? "white" : "#052e16"
                }
              />
              <Text
                className={`mt-3 ${
                  formValues.userType === "collector"
                    ? "text-white"
                    : "text-green-950"
                }`}
                style={{ fontSize: moderateScale(15) }}
              >
                COLLECTOR
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-1 bg-green-950 rounded-md my-3" />
          {formValues.userType === "customer" && (
            <View>
              <CustomInput
                label="Home Address"
                value={formValues.userDetails.address}
                onChangeText={(text) =>
                  handleInputChange("address", text, "userDetails")
                }
                error={formErrors?.userDetails?.address}
              />
              <CustomInput
                label="State"
                value={formValues.userDetails.state}
                onChangeText={(text) =>
                  handleInputChange("state", text, "userDetails")
                }
                error={formErrors?.userDetails?.state}
              />
              <CustomInput
                label="Country"
                value={formValues.userDetails.country}
                onChangeText={(text) =>
                  handleInputChange("country", text, "userDetails")
                }
                error={formErrors?.userDetails?.country}
              />
            </View>
          )}
          {formValues.userType === "collector" && (
            <View>
              <CustomInput
                label="Company Name"
                value={formValues.companyDetails.companyName}
                onChangeText={(text) =>
                  handleInputChange("companyName", text, "companyDetails")
                }
                error={formErrors?.companyDetails?.companyName}
              />
              <CustomInput
                label="Company Address"
                value={formValues.companyDetails.companyAddress}
                onChangeText={(text) =>
                  handleInputChange("companyAddress", text, "companyDetails")
                }
                error={formErrors?.companyDetails?.companyAddress}
              />
              <CustomInput
                label="State"
                value={formValues.companyDetails.state}
                onChangeText={(text) =>
                  handleInputChange("state", text, "companyDetails")
                }
                error={formErrors?.companyDetails?.state}
              />
              <CustomInput
                label="Country"
                value={formValues.companyDetails.country}
                onChangeText={(text) =>
                  handleInputChange("country", text, "companyDetails")
                }
                error={formErrors?.companyDetails?.country}
              />
              <CustomInput
                label="Number of Trucks"
                value={formValues.companyDetails.numberOfTrucks}
                onChangeText={(text) =>
                  handleInputChange("numberOfTrucks", text, "companyDetails")
                }
                keyboardType="numeric"
                error={formErrors?.companyDetails?.numberOfTrucks}
              />
            </View>
          )}
          {image && (
            <View className="items-center justify-center">
              <Image
                source={{
                  uri: image?.uri,
                }}
                style={styles.image}
              />
            </View>
          )}
          {formValues.userType && (
            <TouchableOpacity className="mt-5 border-green-950 border-2 rounded-xl">
              <FlatBtn
                title={
                  formValues.userType === "customer"
                    ? "Upload Profile Image"
                    : "Upload Company Logo"
                }
                onPress={pickImage}
                isLoading={isLoading}
                color="transparent"
                textColor="#052e16"
                icon={
                  <AntDesign name="cloudupload" size={24} color="#052e16" />
                }
              />
            </TouchableOpacity>
          )}
          {formValues.userType && (
            <View className="mt-5">
              <FlatBtn
                title="Update Profile"
                onPress={onSubmit}
                isLoading={isLoading}
              />
            </View>
          )}
        </View>
        <View className="h-8" />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProfileUpdateModalScreen;

const styles = StyleSheet.create({
  usageBlock: {
    paddingVertical: 40,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#052e16",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 2.8,
  },
  selectedBlock: {
    paddingVertical: 40,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#052e16",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 2.8,
  },
  loadingBlock: {
    position: "absolute",
    width: "110%",
    height: "100%",
    zIndex: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
