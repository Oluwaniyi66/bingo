import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import PageHeader from "../../components/headers/PageHeader";
import { horizontalScale, moderateScale, verticalScale } from "../../lib/utils";
import moment from "moment";
import { getDocuments } from "../../api/apiService";
import LoadingComponent from "../../components/loaders/LoadingComponent";

const TrackRequest = ({ navigation, route }) => {
  const { request = {} } = route?.params;
  const [statusList, setStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStatusColor = (status) => {
    if (request.status === status) {
      return "#15803d";
    }
    return "#bdc3c7";
  };
  const getStatuses = () => {
    getDocuments("status")
      .then((res) => {
        setStatusList(res[0].status);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getStatuses();
  }, []);

  const renderStatusLine = () => {
    const statuses = statusList || [
      "initiated",
      "accepted",
      "driver enroute",
      "driver arrived",
      "trash collected",
      "request completed",
    ];

    const requestData = request?.requestData;

    return (
      <View>
        <ScrollView
          vertical
          scrollEnabled={false}
          contentContainerStyle={styles.statusLineContainer}
          className="px-6 pt-4"
        >
          <View style={styles.line} />
          {statuses.map((status, index) => (
            <View key={index} style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(status) },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    fontWeight: request.status === status ? "bold" : "normal",
                    fontSize:
                      request.status === status
                        ? moderateScale(18)
                        : moderateScale(14),
                    color: getStatusColor(status),
                  },
                ]}
              >
                {status}
              </Text>
              {status === request.status && status === "accepted" && (
                <Text
                  className="text-green-800"
                  style={{
                    fontSize: moderateScale(11),
                    marginLeft: horizontalScale(10),
                  }}
                >
                  {moment(request?.status_updated_on?.toMillis()).format(
                    "MMMM D, YYYY HH:mm"
                  )}
                </Text>
              )}
              {status === request.status &&
                status !== "accepted" &&
                status !== "initiated" && (
                  <Text
                    className="text-green-800"
                    style={{
                      fontSize: moderateScale(11),
                      marginLeft: horizontalScale(10),
                    }}
                  >
                    {moment(
                      requestData?.acceptedBy.accepted_on.toMillis()
                    ).format("MMMM D, YYYY HH:mm")}
                  </Text>
                )}
            </View>
          ))}
        </ScrollView>
        <ScrollView className="px-5 mb-80 pb-32">
          <View>
            <View
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate(SCREENS.CustomerTracking, {
                  request: request,
                })
              }
              style={styles.card}
              className="border-green-900 px-3 py-4 my-2 rounded-xl flex-row"
            >
              <View style={styles.content}>
                <Text style={styles.title} className="text-green-950">
                  {request.type}
                </Text>
                <View className="flex-row justify-between requests-center">
                  <Text style={styles.tags} className="text-green-950">
                    {request.weight} kg
                  </Text>
                  <Text style={styles.tags} className="text-green-950">
                    {request.size} kitchen bags
                  </Text>
                  <View className="requests-center ">
                    <Text style={styles.tags} className="text-green-950">
                      status
                    </Text>
                    <Text style={styles.status} className="text-green-950">
                      {request.status}
                    </Text>
                  </View>
                </View>
                <ScrollView horizontal>
                  {request.images?.map((img) => (
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
                <Text style={styles.time} className="text-green-950">
                  {moment(request?.created_on.toMillis()).format(
                    "MMMM D, YYYY HH:mm"
                  )}
                </Text>
              </View>
            </View>
          </View>
          {requestData && (
            <View>
              <Text
                className="text-green-950 font-bold text-center my-4 underline underline-offset-4"
                style={{ fontSize: moderateScale(20) }}
              >
                Collector Details
              </Text>
              <View>
                <View className="flex-row justify-between my-2">
                  <Text
                    className="text-green-800 font-semibold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    Company Name:
                  </Text>
                  <Text
                    className="text-green-950 font-bold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    {requestData?.acceptedBy.companyDetails.companyName}
                  </Text>
                </View>
                <View className="flex-row justify-between my-2">
                  <Text
                    className="text-green-800 font-semibold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    Company Address:
                  </Text>
                  <Text
                    className="text-green-950 font-bold text-right"
                    style={{ fontSize: moderateScale(16), width: "60%" }}
                  >
                    {requestData?.acceptedBy.companyDetails.companyAddress}
                  </Text>
                </View>
                <View className="flex-row justify-between my-2">
                  <Text
                    className="text-green-800 font-semibold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    State of Op:
                  </Text>
                  <Text
                    className="text-green-950 font-bold text-right"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    {requestData?.acceptedBy.companyDetails.state}
                  </Text>
                </View>
                <View className="flex-row justify-between my-2">
                  <Text
                    className="text-green-800 font-semibold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    Company Phone:
                  </Text>
                  <Text
                    className="text-green-950 font-bold text-right"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    {requestData?.acceptedBy.phoneNumber}
                  </Text>
                </View>
                <View className="flex-row justify-between my-2">
                  <Text
                    className="text-green-800 font-semibold"
                    style={{ fontSize: moderateScale(16) }}
                  >
                    Company Email:
                  </Text>
                  <Text
                    className="text-green-950 font-bold text-right"
                    style={{ fontSize: moderateScale(16), width: "61%" }}
                  >
                    {requestData?.acceptedBy.emailAddress}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader title={request.type} />
      <LoadingComponent isLoading={isLoading} />
      {renderStatusLine()}
      <ScrollView>
        <View></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusLineContainer: {
    // alignrequests: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(25),
  },
  statusDot: {
    width: horizontalScale(20),
    height: verticalScale(20),
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
  },
  statusText: {
    fontSize: moderateScale(16),
  },
  line: {
    height: "100%",
    width: 1,
    backgroundColor: "#15803d",
    position: "absolute",
    left: horizontalScale(10),
  },
  card: {
    borderWidth: 1.5,
  },
  content: {
    width: "100%",
  },
  image: {
    width: moderateScale(70),
    height: moderateScale(60),
    borderRadius: moderateScale(15),
    marginRight: horizontalScale(8),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "700",
  },
  tags: {
    fontSize: moderateScale(12),
  },
  status: {
    fontWeight: "600",
  },
  time: {
    position: "absolute",
    right: 10,
    bottom: -10,
    fontSize: moderateScale(10),
  },
});

export default TrackRequest;
