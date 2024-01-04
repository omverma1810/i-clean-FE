import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import { endpoint } from "../endpoint";
import * as SecureStore from 'expo-secure-store';

export default function Createroles({ route }) {
  const navigation = useNavigation();

  const { role } = route.params;
  console.log(role)

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Branch, setBranch] = useState("");

  const [access, setAccess] = useState("");

  useEffect(() => {
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        setAccess(result);
      } else {
        alert("No values stored under that key.");
      }
    }
    getValueFor("access");
  }, [access]);


  const createRole = async () => {
    try {
      const apiUrl =
        `${endpoint}user/create-${role}/`;

        let payload = {}

        if(role != "superuser"){
          payload = {
            user: {
              username: phoneNumber,
              password: password,
              first_name: Firstname,
              last_name: Lastname,
            },
            branch: Branch,
          };
        }
        else if(role == "superuser"){
          payload = {
            username: phoneNumber,
            password: password,
          };
        }

      console.log(payload)

      const headers = {
        Authorization: `Bearer ${access}`,
      };

      const response = await axios.post(apiUrl, payload, { headers });

      console.log("Login successful");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error during login", error);
    }
  };
  return (
    <ScrollView>
    <SafeAreaView className="flex flex-1 justify-center items-center bg-[#f4fafe] text-white">
      <StatusBar style="auto" />

      <View className="my-5 flex flex-row items-center space-x-2">
        <Image source={require("../../assets/logo.png")}></Image>
        <Text className="text-3xl text-[#439eff] font-bold">IClean</Text>
      </View>
      <View className="flex space-y-2 bg-[#fff] py-10 w-[90%] px-3 rounded-xl shadow mb-7">
        <Text className="text-2xl font-semibold text-[#0c192f] text-center my-4">
          Create Role
        </Text>
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Username
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto"
          placeholder="Username"
          keyboardType="default"
          autoCapitalize='none'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        ></TextInput>
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Password
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Password"
          value={password}
          autoCapitalize='none'
          onChangeText={setPassword}
          secureTextEntry
        ></TextInput>

        {
          role != "superuser"?(
            <>
                    <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          First Name
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Password"
          value={Firstname}
          autoCapitalize='none'
          onChangeText={setFirstname}
        ></TextInput>

        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Last Name
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Password"
          value={Lastname}
          onChangeText={setLastname}
          autoCapitalize='none'
        ></TextInput>

        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Branch
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Password"
          value={Branch}
          onChangeText={setBranch}
          autoCapitalize='none'
        ></TextInput></>
          ):
          <></>
        }

        <TouchableOpacity
          className="px-10 rounded-2xl py-4 w-[90%] flex items-center bg-[#49a2ff] mx-auto shadow"
          onPress={createRole}
        >
          <Text className="text-white text-lg font-semibold">Confirm Role</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
