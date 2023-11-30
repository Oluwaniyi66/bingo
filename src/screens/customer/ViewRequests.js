import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import { getDocuments } from "../../api/apiService";
import useAuth from "../../lib/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { horizontalScale, moderateScale } from "../../lib/utils";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { SCREENS } from "../../routes/screens";

const ViewRequests = ({ navigation }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRequests = () => {
    getDocuments("requests")
      .then((res) => {
        const myRequests = res.filter((req) => {
          return req.user === user.uid;
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
  useEffect(() => {
    getRequests();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    getRequests();
  };

  return (
    <View className="flex-1">
      <PageHeader title="My Requests" />

      <View className="px-5 flex-1">
        <FlatList
          data={requests.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate(SCREENS.CustomerTracking, {
                    request: item,
                  })
                }
                style={styles.card}
                className="border-green-900 px-3 py-4 my-2 rounded-xl flex-row"
              >
                <View style={styles.content}>
                  <Text style={styles.title} className="text-green-950">
                    {item.type}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text style={styles.tags} className="text-green-950">
                      {item.weight} kg
                    </Text>
                    <Text style={styles.tags} className="text-green-950">
                      {item.size} kitchen bags
                    </Text>
                    <View className="items-center ">
                      <Text style={styles.tags} className="text-green-950">
                        status
                      </Text>
                      <Text style={styles.status} className="text-green-950">
                        {item.status}
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
                  You have no Requests
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

export default ViewRequests;

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
