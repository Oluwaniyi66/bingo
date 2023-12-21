import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import DropDownPicker from "react-native-dropdown-picker";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import FlatBtn from "../../components/button/FlatBtn";
import {
  getDocuments,
  setDocument,
  subscribeToDocumentSnapshot,
  updateDocument,
} from "../../api/apiService";
import LoadingComponent from "../../components/loaders/LoadingComponent";
import { horizontalScale, moderateScale } from "../../lib/utils";
import moment from "moment";
import { serverTimestamp } from "firebase/firestore";

const RequestInfoScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { request } = route?.params;
  const [requestData, setRequestData] = useState({});
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(request?.status);
  const [isLoading, setIsLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [paymentInfo, setpaymentInfo] = useState({});

  const getStatuses = () => {
    getDocuments("status")
      .then((res) => {
        setStatusList(
          res[0].status.map((stat) => {
            return {
              label: stat,
              value: stat,
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

  const getRequestInfo = () => {
    subscribeToDocumentSnapshot("requests", request.id, (data) => {
      if (data) {
        // Handle the updated data
        setRequestData(data);
        setSelectedStatus(data.status);
        console.log(data);
      } else {
        // Handle the case when the document does not exist
        console.log("Document does not exist.", data);
      }
    });
  };

  const acceptRequest = () => {
    setIsLoading(true);
    updateDocument("requests", request.id, {
      ...request,
      status: "accepted",
      requestData: {
        acceptedBy: {
          ...user?.profile,
          uid: user?.uid || user?.id,
          accepted_on: serverTimestamp(),
        },
      },
    })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
        getRequestInfo();
      });
  };

  const handleStatusUpdate = (val) => {
    setIsLoading(true);
    updateDocument("requests", request.id, {
      ...request,
      status: val,
      status_updated_on: serverTimestamp(),
    })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
        getRequestInfo();
      });
  };

  useEffect(() => {
    getStatuses();
    getRequestInfo();
    getPaymentInfo();
  }, []);

  const requestForPayment = () => {
    setIsLoading(true);
    setDocument("payment-requests", requestData.id, {
      request: requestData,
      status: "requested",
    })
      .then((res) => {
        alert(
          "Payment Successfully requested. Please wait for the admin to contact you"
        );
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getPaymentInfo = () => {
    subscribeToDocumentSnapshot("payment-requests", request.id, (data) => {
      if (data) {
        // Handle the updated data
        setpaymentInfo(data);
        console.log(data);
      } else {
        // Handle the case when the document does not exist
        console.log("Document does not exist. (payment)", data);
      }
    });
  };

  return (
    <View className="flex-1">
      <PageHeader title={request.type} />

      <LoadingComponent isLoading={isLoading} />
      <View className="px-5 mt-2 z-20">
        {requestData?.status === "initiated" ? (
          <FlatBtn
            title="Accept Request"
            color="#86efac"
            textColor="#052e16"
            onPress={acceptRequest}
          />
        ) : (
          <View className="mb-4">
            <Text
              className="font-medium text-base text-green-950 mb-2"
              style={{ fontSize: responsiveFontSize(2) }}
            >
              Update Status
            </Text>
            <DropDownPicker
              open={openStatus}
              value={selectedStatus}
              items={statusList}
              setOpen={setOpenStatus}
              setValue={setSelectedStatus}
              setItems={setStatusList}
              onChangeValue={(val) => {
                if (val === requestData.status || val === request.status) {
                  return;
                }
                Alert.alert(
                  "Notice",
                  `Are you sure you want to update status to "${val}"`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        handleStatusUpdate(val);
                      },
                    },
                  ],
                  { cancelable: false } // Set cancelable to false to prevent dismissing by tapping outside the alert
                );
              }}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                fontSize: responsiveFontSize(1.8),
                borderColor: "#15803d",
              }}
              placeholder={selectedStatus || "Accepted"}
              autoScroll
              // listMode="MODAL"
              modalTitle="Select status"
              disabled={selectedStatus === "request completed"}
            />
            {/* {formErrors.wasteType && ( */}
            {/* <Text className="text-red-800 text-xs">{formErrors.wasteType}</Text> */}
            {/* )} */}
          </View>
        )}
      </View>
      {selectedStatus === "request completed" && (
        <View className="px-5">
          <FlatBtn
            title={
              paymentInfo.status
                ? `Payment ${paymentInfo.status}`
                : "Request Payment"
            }
            onPress={requestForPayment}
            disabled={paymentInfo.status !== "rejected"}
          />
        </View>
      )}
      <Text
        className="text-green-950 font-bold text-center my-4 underline underline-offset-4"
        style={{ fontSize: moderateScale(20) }}
      >
        Request Details
      </Text>
      <ScrollView className="px-5 border-green-900 border-2 rounded-lg">
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Type of waste:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.type}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Amount Paid:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.paymentRef?.amount
              ? `₦${Number(requestData?.paymentRef?.amount).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`
              : "--"}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Weight of waste:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.weight}kg
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Size of waste:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.size} kitchen bags
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Date:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {moment(requestData?.created_on?.toMillis()).format(
              "MMMM D, YYYY HH:mm"
            )}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            message:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.message}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Address:
          </Text>
          <Text
            className="text-green-950 font-bold text-right"
            style={{ fontSize: moderateScale(16), width: "65%" }}
          >
            {requestData?.profile?.userDetails?.address}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Customer:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.profile?.firstName} {requestData?.profile?.lastName}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text
            className="text-green-800 font-semibold"
            style={{ fontSize: moderateScale(16) }}
          >
            Customer phone:
          </Text>
          <Text
            className="text-green-950 font-bold"
            style={{ fontSize: moderateScale(16) }}
          >
            {requestData?.profile?.phoneNumber}
          </Text>
        </View>
        <ScrollView horizontal className="my-4">
          {requestData.images?.map((img) => (
            <Image
              key={img}
              source={{
                uri: img,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default RequestInfoScreen;

const styles = StyleSheet.create({
  image: {
    width: moderateScale(180),
    height: moderateScale(160),
    borderRadius: moderateScale(15),
    marginRight: horizontalScale(8),
  },
});
