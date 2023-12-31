import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import useAuth from "../../lib/hooks/useAuth";
import { getDocuments } from "../../api/apiService";
import moment from "moment";
import { SCREENS } from "../../routes/screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { horizontalScale, moderateScale } from "../../lib/utils";
import { useFocusEffect } from "@react-navigation/native";

const PickedRequests = ({ navigation }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRequests = () => {
    getDocuments("requests")
      .then((res) => {
        console.log("RES", res);
        const myRequests = res.filter((req) => {
          return (
            req?.requestData?.acceptedBy?.uid === (user.uid || user.id) &&
            req?.status !== "request completed"
          );
        });
        setRequests(myRequests);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("ERROR", err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Focus gained. Calling getRequests...");
      getRequests();
    }, []) // Include getRequests in the dependencies array
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    getRequests();
  };
  return (
    <View className="flex-1">
      <PageHeader title="My Picked Requests" />
      <View className="px-5 flex-1">
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate(SCREENS.CollectorTracking, {
                    request: item,
                  })
                }
                style={styles.card}
                className="border-green-900 px-3 py-4 my-2 rounded-xl flex-row"
              >
                <View style={styles.content}>
                  <View className="flex-row justify-between items-center">
                    <Text style={styles.title} className="text-green-950">
                      {item.type}
                    </Text>
                    <Text style={styles.amt} className="text-green-950">
                      {item?.paymentRef?.amount
                        ? `₦${Number(item?.paymentRef?.amount).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : ""}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="my-2 w-1/3">
                      <Text style={styles.tags} className="text-green-950">
                        {item.weight} kg
                      </Text>
                      <Text style={styles.tags} className="text-green-950">
                        {item.size} kitchen bags
                      </Text>
                    </View>
                    <View className="items-center ">
                      <Text style={styles.tags} className="text-green-950">
                        status
                      </Text>
                      <Text style={styles.status} className="text-green-950">
                        {item.status}
                      </Text>
                    </View>
                    <View className="items-center w-1/3 ">
                      <Text style={styles.status} className="text-green-950">
                        {item?.profile?.firstName} {item?.profile?.lastName}
                      </Text>
                      <Text style={styles.address} className="text-green-950">
                        {item?.profile?.userDetails?.address}
                      </Text>
                    </View>
                  </View>
                  <ScrollView horizontal>
                    {item.images?.map((img) => (
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
                    {moment(item?.created_on.toMillis()).format(
                      "MMMM D, YYYY HH:mm"
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isLoading ? (
              <View className="flex-1 justify-center items-center h-80">
                <MaterialCommunityIcons
                  name="gauge-empty"
                  size={80}
                  color="#052e16"
                />
                <Text className="text-green-950 text-lg">
                  There are no Requests Presently
                </Text>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={"large"} color={"#052e16"} />
              </View>
            )
          }
          ListFooterComponent={() => <View className="h-10" />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </View>
    </View>
  );
};

export default PickedRequests;

const styles = StyleSheet.create({
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
    fontSize: moderateScale(11),
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
  address: {
    fontSize: moderateScale(10),
    fontWeight: "400",
    width: horizontalScale(120),
    textAlign: "center",
  },
});
