import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import PageHeader from "../../components/headers/PageHeader";
import { horizontalScale, moderateScale, verticalScale } from "../../lib/utils";
import moment from "moment";

const TrackRequest = ({ navigation, route }) => {
  const { request = {} } = route?.params;

  const getStatusColor = (status) => {
    if (request.status === status) {
      return "#15803d";
    }
    return "#bdc3c7";
  };

  const renderStatusLine = () => {
    const statuses = [
      "initiated",
      "accepted",
      "on_the_way",
      "arrived",
      "trash_picked",
      "completed",
    ];

    console.log("====================================");
    console.log(request);
    console.log("====================================");

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
                    color: getStatusColor(status),
                  },
                ]}
              >
                {status}
              </Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView className="px-5">
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
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader title={request.type} />
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
    alignrequests: "center",
    marginBottom: verticalScale(35),
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
