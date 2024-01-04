import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import { endpoint } from "../endpoint";
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from "react-native-gesture-handler";

export default function Createproject({ route }) {
  const navigation = useNavigation();

  const { role } = route.params;
  console.log(role)

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [branch, setBranch] = useState("");
  const [access, setAccess] = useState("");
  const [clientName, setClientName] = useState(""); // State for Client Name
  const [poQuantity, setPOQuantity] = useState(""); // State for PO Quantity
  const [suppliedQuantity, setSuppliedQuantity] = useState(""); // State for Supplied Quantity


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
        `${endpoint}project/create-project/`;

      const payload = {
          name: name,
          desc: desc,
          branch: branch,
          client_name: clientName, // Include client name in the payload
          po_quantity: poQuantity, // Include PO Quantity in the payload
          supplied_quantity: suppliedQuantity, // Include Supplied Quantity in the payload
  
      };

      console.log(payload)

      const headers = {
        Authorization: `Bearer ${access}`,
      };

      const response = await axios.post(apiUrl, payload, { headers });

      console.log("Project Created Successfully");
      navigation.goBack()
    } catch (error) {
      console.error("Error while creating project", error);
      console.error(error)

    }
  };
  return (
    <SafeAreaView className="flex flex-1 justify-center items-center bg-[#f4fafe] text-white">
      <StatusBar style="auto" />
      <View className="my-5 flex flex-row items-center space-x-2">
        <Image source={require("../../assets/logo.png")}></Image>
        <Text className="text-3xl text-[#439eff] font-bold">Add Project</Text>
      </View>

      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}
>
      
      <View className="flex space-y-2 bg-[#fff] py-10 w-[90%] px-3 rounded-xl shadow mb-7">
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Name
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto"
          placeholder="Name"
          keyboardType="default"
          autoCapitalize='none'
          value={name}
          onChangeText={setName}
        ></TextInput>
        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
            Description
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Description"
          autoCapitalize='none'
          value={desc}
          onChangeText={setDesc}
          multiline={true}
        ></TextInput>

        <Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Branch
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Branch"
          value={branch}
          autoCapitalize='none'
          onChangeText={setBranch}
        ></TextInput>

<Text className="text-xl text-[#919aa9] font-semibold mx-5">
          Client Name
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Client Name"
          value={clientName}
          autoCapitalize='none'
          onChangeText={setClientName}
        ></TextInput>


<Text className="text-xl text-[#919aa9] font-semibold mx-5">
          PO Quantity
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="PO Quantity"
          value={poQuantity}
          autoCapitalize='none'
          onChangeText={setPOQuantity}
        ></TextInput>

<Text className="text-xl text-[#919aa9] font-semibold mx-5">
Supplied Quantity
        </Text>
        <TextInput
          className="text-black w-[90%] rounded-xl border border-[#f3ecec] px-4 py-4 mx-auto mb-4"
          placeholder="Supplied Quantity"
          value={suppliedQuantity}
          autoCapitalize='none'
          onChangeText={setSuppliedQuantity}
        ></TextInput>


        <TouchableOpacity
          className="px-10 rounded-2xl py-4 w-[90%] flex items-center bg-[#49a2ff] mx-auto shadow"
          onPress={createRole}
        >
          <Text className="text-white text-lg font-semibold">Create Project</Text>
        </TouchableOpacity>
  
      </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}
