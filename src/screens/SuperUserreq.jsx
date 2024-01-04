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
import { endpoint } from "../endpoint";

export default function SuperUserreq({ route }) {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const apiUrl = `${endpoint}user/request-superuser/`;

      const payload = {
        username: phoneNumber,
        password: password,
      };

      const response = await axios.post(apiUrl, payload);

      console.log("Login successful");

      navigation.goBack()
      alert("You'll be able to login once you're approved")

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <View className="flex flex-1 justify-center items-center bg-[#f4fafe] text-white">
      <StatusBar style="auto" />
      <View className="my-10 flex flex-row items-center space-x-2">
        <Image source={require("../../assets/logo.png")}></Image>
        <Text className="text-3xl text-[#439eff] font-bold">IClean</Text>
      </View>
      <View className="flex space-y-2 bg-[#fff] py-10 w-[90%] px-3 rounded-xl shadow">
        <Text className="text-2xl font-semibold text-[#0c192f] text-center my-4">
          Create Superuser Request
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
          <Text className="text-white text-lg font-semibold">Create Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
