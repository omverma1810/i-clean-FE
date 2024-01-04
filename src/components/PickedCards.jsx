import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PickedCard = (props) => {
  const navigation = useNavigation();

  return (
    <View
      className={`bg-[#f4fafe] w-[90%] space-y-2 rounded-lg px-4 py-4 shadow-sm mt-3 mx-auto`}
    >
      <Text className={`font-semibold text-2xl text-black`}>{props.name}</Text>
      <Text className={`text-zinc-600" text-sm`}>{props.created}</Text>
      <Text className={`text-black`}>{props.desc}</Text>
      <View className="flex flex-row flex-wrap justify-around">
        <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
          <Text className="text-gray-500 font-semibold">
            Branch: {props.branch}
          </Text>
        </View>
        <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
          <Text className="text-gray-500 font-semibold">
            Added By: {props.sales}
          </Text>
        </View>
        <View className="border shadow-sm bg-green-600 px-2 py-1 rounded-lg flex flex-row my-2">
          <TouchableOpacity
            className="bg-green-600"
            onPress={() =>
              navigation.navigate("Give Update", { project_id: props.id })
            }
          >
            <Text className="text-white font-xl font-bold">Give Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PickedCard;
