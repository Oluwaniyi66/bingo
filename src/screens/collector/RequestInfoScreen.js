import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import DropDownPicker from "react-native-dropdown-picker";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import FlatBtn from "../../components/button/FlatBtn";
import { updateDocument } from "../../api/apiService";

const RequestInfoScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { request } = route?.params;
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(request?.status);
  const [isLoading, setIsLoading] = useState(false);
  const [statusList, setStatusList] = useState([
    { label: "type", value: "type" },
  ]);
  console.log("====================================");
  console.log(user?.profile);
  console.log("====================================");
  const updateRequest = () => {
    updateDocument("requests", request.id, {
      ...request,
      status: "accepted",
      requestData: {
        acceptedBy: { ...user?.profile, uid: user?.uid },
      },
    })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View>
      <PageHeader title={request.type} />
      <View className="px-5 mt-2">
        {request?.status === "initiated" ? (
          <FlatBtn
            title="Accept Request"
            color="#86efac"
            textColor="#052e16"
            onPress={updateRequest}
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
              style={{
                borderWidth: 1,
                borderRadius: 8,
                fontSize: responsiveFontSize(1.8),
                borderColor: "#15803d",
              }}
              placeholder={selectedStatus || "select the type of waste"}
              autoScroll
              // listMode="MODAL"
              modalTitle="Select the type of waste"
            />
            {/* {formErrors.wasteType && ( */}
            {/* <Text className="text-red-800 text-xs">{formErrors.wasteType}</Text> */}
            {/* )} */}
          </View>
        )}
      </View>
    </View>
  );
};

export default RequestInfoScreen;

const styles = StyleSheet.create({});
