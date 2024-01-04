import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import * as SecureStore from "expo-secure-store";
import { endpoint } from "../endpoint";

export default function Login({ route }) {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const apiUrl = `${endpoint}user/token/`;

      const payload = {
        username: phoneNumber,
        password: password,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const { access, refresh } = data;

        await SecureStore.setItemAsync("access", access);
        await SecureStore.setItemAsync("refresh", refresh);

        alert("Login successful");

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });

        const storedAccess = await SecureStore.getItemAsync("access");
        const storedRefresh = await SecureStore.getItemAsync("refresh");

        if (storedAccess && storedRefresh) {
          const profileUrl = `${endpoint}user/profile/`;

          const profileResponse = await fetch(profileUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedAccess}`,
            },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            const role = profileData.user;

            switch (role) {
              case "project_manager":
              case "sales_person":
              case "installation_person":
              case "superuser":
                navigation.navigate("Dashboard");
                break;
              default:
                alert("Unknown role");
            }
          } else {
            alert("Error while fetching profile data");
          }
        } else {
          alert("Token missing");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert(error);
      console.error("Error during login", error);
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-[#f4fafe] text-white">
      <StatusBar style="auto" />
      <View className="my-10 flex flex-row items-center space-x-2">
        <Image source={require("../../assets/logo.png")}></Image>
        <Text className="text-3xl text-[#439eff] font-bold">IClean</Text>
      </View>
      <View className="flex space-y-2 bg-[#fff] py-10 w-[90%] px-3 rounded-xl shadow">
        <Text className="text-2xl font-semibold text-[#0c192f] text-center my-4">
          Login
        </Text>
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Username
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto"
          placeholder="Username"
          keyboardType="default"
          value={phoneNumber}
          autoCapitalize='none'
          onChangeText={setPhoneNumber}
        ></TextInput>
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Password
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          secureTextEntry
        ></TextInput>

        <TouchableOpacity
          className="px-10 rounded-2xl py-4 w-[90%] flex items-center bg-[#49a2ff] mx-auto shadow"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
