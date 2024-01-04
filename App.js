import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home"; // Import your Signup component
import Admin from "./src/screens/Admin";
import Webview from "./src/components/Webview";
import * as SecureStore from "expo-secure-store";
import Createroles from "./src/screens/Createroles";
import ListProjects from "./src/screens/ListProjects";
import { View, ActivityIndicator } from "react-native";
import PickedProjects from "./src/screens/PickedProjects";
import GiveUpdate from "./src/screens/GiveUpdate";
import ProjectWithoutUpdate from "./src/screens/ProjectWithoutUpdate";
import SuperUserreq from "./src/screens/SuperUserreq";
import Viewallupdates from "./src/screens/Viewallupdates";
import Createproject from "./src/screens/Createproject";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAccessToken() {
      try {
        const access = await SecureStore.getItemAsync("access");
        if (access) {
          setInitialRoute("Dashboard");
        } else {
          setInitialRoute("Home");
        }
      } catch (error) {
        console.error("Error checking access token:", error);
        setInitialRoute("Home");
      } finally {
        setIsLoading(false);
      }
    }
    checkAccessToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Dashboard"
          component={Admin}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Createroles"
          component={Createroles}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="All Projects"
          component={ListProjects}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Your Projects"
          component={PickedProjects}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Superuser Request"
          component={SuperUserreq}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="View all updates"
          component={Viewallupdates}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Createproject"
          component={Createproject}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Give Update"
          component={GiveUpdate}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Projects without update"
          component={ProjectWithoutUpdate}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="WebView"
          component={Webview}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ isSignedin: false }}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
