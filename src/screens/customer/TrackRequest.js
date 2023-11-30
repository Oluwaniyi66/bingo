import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import PageHeader from "../../components/headers/PageHeader";
import { horizontalScale, moderateScale, verticalScale } from "../../lib/utils";

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

    return (
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
    // alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default TrackRequest;
