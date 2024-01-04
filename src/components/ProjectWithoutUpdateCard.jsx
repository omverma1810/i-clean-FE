import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { endpoint } from "../endpoint";

const ProjectWithoutUpdateCard = (props) => {

  const CloseProject = async () => {
      const storedAccess = await SecureStore.getItemAsync("access");
      const apiUrl = `${endpoint}project/close-project/${props.id}/`;

      try {
        await axios.post(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${storedAccess}`,
          },
        });

        alert("Project Closed");
      } catch (error) {
        alert("Error Closing project");
        console.log(error)
      }
  };

  return (
    <View className={`bg-[#f4fafe] w-[90%] space-y-2 rounded-lg px-4 py-4 shadow-sm mt-3 mx-auto`}>
      <Text className={`font-semibold text-2xl text-black`}>{props.name}</Text>
      <Text className={`font-light text-black text-sm`}>{props.created}</Text>
      <Text className={`text-black`}>{props.desc}</Text>
      <View className="flex flex-row flex-wrap justify-around">
        <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
          <Text className="text-gray-500 font-semibold">Branch: {props.branch}</Text>
        </View>
        <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
          <Text className="text-gray-500 font-semibold">
            Added By: {props.sales}
          </Text>
        </View>
        <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
          <Text className="text-gray-500 font-semibold">
            Taken By: {props.installation}
          </Text>
        </View>

          <View>
            <TouchableOpacity className="bg-black px-2 py-1 mt-2 rounded-xl" onPress={CloseProject}>
              <Text className="text-lg text-white font-semibold">Close Project</Text>
            </TouchableOpacity>
          </View>

      </View>
    </View>
  );
};

export default ProjectWithoutUpdateCard;
