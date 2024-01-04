import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { endpoint } from "../endpoint.js";

const GiveUpdate = ({ route }) => {
  const { project_id } = route.params;
  const [updateDesc, setUpdateDesc] = useState(""); 
  const [installedQuantity, setInstalledQuantity] = useState(""); 
  const [balanceToBeInstalled, setBalanceToBeInstalled] = useState(""); 
  const [handledOverQuantity, setHandledOverQuantity] = useState(""); 
  const [balanceToBeHandover, setBalanceToBeHandover] = useState("");

  const navigation = useNavigation();

  const giveUpdate = async () => {
    console.log("updateDesc:", updateDesc);
    console.log("installedQuantity:", installedQuantity);
    console.log("balanceToBeInstalled:", balanceToBeInstalled);
    console.log("handledOverQuantity:", handledOverQuantity);
    console.log("balanceToBeHandover:", balanceToBeHandover);

    const storedAccess = await SecureStore.getItemAsync("access");
    const apiUrl = `${endpoint}project/notify-update/${project_id}/`;
    
    try {
      await axios.post(
        apiUrl,
        {
          update_desc: updateDesc,
          installed_quatity: installedQuantity,
          balance_to_be_installed: balanceToBeInstalled,
          handed_over_quantity: handledOverQuantity,
          balance_to_be_handedover: balanceToBeHandover,
        },
        {
          headers: {
            Authorization: `Bearer ${storedAccess}`,
          },
        }
      );
      alert("Successfully Notified");
      navigation.goBack();
    } catch (error) {
      alert("Error giving update");
      console.error(error);
    }
  };

  return (
    <View>
      <Text className="text-black text-2xl font-semibold px-2 py-4 text-center">
        Recent development on the project?
      </Text>

      <View className="border mt-3 mx-6 rounded">
        <TextInput
          placeholder="Installed Quantity"
          value={installedQuantity}
          onChangeText={setInstalledQuantity}
          className="px-2 py-3 text-black text-lg"
        />
      </View>

      <View className="border mt-7 mx-6 rounded">
        <TextInput
          placeholder="Balance to be installed"
          value={balanceToBeInstalled}
          onChangeText={setBalanceToBeInstalled}
          className="px-2 py-3 text-black text-lg"
        />
      </View>

      <View className="border mt-7 mx-6 rounded">
        <TextInput
          placeholder="Handled Over Quantity"
          value={handledOverQuantity}
          onChangeText={setHandledOverQuantity}
          className="px-2 py-3 text-black text-lg"
        />
      </View>

      <View className="border mt-7 mx-6 rounded">
        <TextInput
          placeholder="Balance to be handed over"
          value={balanceToBeHandover}
          onChangeText={setBalanceToBeHandover}
          className="px-2 py-3 text-black text-lg"
        />
      </View>

      <View className="border mt-7 mx-6 rounded">
        <TextInput
          multiline
          numberOfLines={null}
          placeholder="Write your update here"
          value={updateDesc}
          onChangeText={setUpdateDesc}
          className="px-2 py-3 text-black text-lg"
        />
      </View>

      <TouchableOpacity className="mx-auto my-3 mt-7 px-10 py-3 bg-blue-300 rounded-md shadow" onPress={giveUpdate}>
        <Text className="text-black text-lg font-semibold">Notify Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiveUpdate;
