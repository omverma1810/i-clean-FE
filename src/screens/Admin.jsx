import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { endpoint } from "../endpoint";

export default function Admin({ navigation, route }) {
  const [role, setRole] = useState("");

  //NOTIFICATION START
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync(role).then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Notification end

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedAccess = await SecureStore.getItemAsync("access");
      const storedRefresh = await SecureStore.getItemAsync("refresh");

      console.log(storedAccess);

      if (storedAccess && storedRefresh) {
        const profileUrl = `${endpoint}user/profile/`;

        try {
          const profileResponse = await axios.get(profileUrl, {
            headers: {
              Authorization: `Bearer ${storedAccess}`,
            },
          });

          const get_role = profileResponse.data.user;
          setRole(get_role);

          // Handle the 'role' data here
        } catch (error) {
          alert(error);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    SecureStore.deleteItemAsync("access").then(
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <SafeAreaView>
      <View className="h-full w-full flex justify-around items-center">
        <Text className="text-black mt-9 text-2xl font-bold capitalize">
          hello {role}
        </Text>

        {/* View for conditional Rendering  */}
        <View className="h-full w-full flex flex-col  justify-center space-y-3 px-6">
          {role == "superuser" ? (
            <View className="space-y-4">
              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() => navigation.navigate("WebView")}
              >
                <Text className="text-lg text-white font-semibold">
                  View Admin Panel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", {
                    role: "superuser",
                  })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Superuser
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", {
                    role: "project-manager",
                  })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Project Manager
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", { role: "sales-person" })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Sales Person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", {
                    role: "installation-person",
                  })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Installation Person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("View all updates", { role: role })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  View All Updates
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() => navigation.navigate("Projects without update")}
              >
                <Text className="text-lg text-white font-semibold">
                  Projects Without Update
                </Text>
              </TouchableOpacity>

            </View>
          ) : (
            <></>
          )}

          {role == "project_manager" ? (
            <View className="space-y-2">
              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", { role: "sales-person" })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Sales Person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createroles", {
                    role: "installation-person",
                  })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Installation Person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("View all updates", { role: role })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  View All Updates
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() => navigation.navigate("Projects without update")}
              >
                <Text className="text-lg text-white font-semibold">
                  Projects Without Update
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          {role == "sales_person" ? (
            <View className="space-y-2">
              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() =>
                  navigation.navigate("Createproject", {
                    role: "sales_person",
                  })
                }
              >
                <Text className="text-lg text-white font-semibold">
                  Create Project
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          {role == "installation_person" ? (
            <View className="space-y-2">
              <TouchableOpacity
                className="bg-pink-600 px-5 py-2 rounded-xl"
                onPress={() => navigation.navigate("Your Projects")}
              >
                <Text className="text-lg text-white font-semibold">
                  Project grabbed by you
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            className="bg-pink-600 px-5 py-2 rounded-xl"
            onPress={() => navigation.navigate("All Projects")}
          >
            <Text className="text-lg text-white font-semibold">
              All Projects
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-black px-5 py-2 rounded-xl mb-8"
          >
            <Text className="text-lg text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Nofication system 
async function registerForPushNotificationsAsync(role) {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice && role === "project_manager") {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(
        "You need to provide notification permission in order to use Push Notification"
      );
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    console.log(token);
    if (token && role === "project_manager") {
      const storedAccess = await SecureStore.getItemAsync("access");
      try {
        const response = await axios.post(
          `${endpoint}user/store-push-token/`,
          {
            expo_push_token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAccess}`,
            },
          }
        );
        console.log(response.data, response.status);
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  }

  return token;
}
