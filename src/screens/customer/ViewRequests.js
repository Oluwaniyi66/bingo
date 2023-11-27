import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/headers/PageHeader";
import { getDocuments } from "../../api/apiService";
import useAuth from "../../lib/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ViewRequests = ({ navigation }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRequests = () => {
    getDocuments("requests")
      .then((res) => {
        console.log("====================================");
        console.log("RES", res);
        setRequests(res);
        console.log("====================================");
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
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.card}>
              <Image
                source={{
                  uri: "https://media.post.rvohealth.io/wp-content/uploads/2020/11/Runners-High-732x549-thumbnail.jpg",
                }}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.content}>
                <Text style={styles.title}>{"yoooo"}</Text>
                <Text style={styles.status}>{"status"}</Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && (
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
          )
        }
        ListFooterComponent={() => <View className="h-10" />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default ViewRequests;

const styles = StyleSheet.create({});
