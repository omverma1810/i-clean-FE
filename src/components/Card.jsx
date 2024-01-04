import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { endpoint } from "../endpoint.js";
import Modal from 'react-native-modal';
import { ScrollView } from "react-native-gesture-handler";


const Card = (props) => {

  const [role, setRole] = useState("");
  const [projectPicked, setProjectPicked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedAccess = await SecureStore.getItemAsync("access");
      const storedRefresh = await SecureStore.getItemAsync("refresh");

      console.log(storedAccess)

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

  const handleConfirmGrab = async () => {
    if (role === 'installation_person' && props.taken === false) {
      const storedAccess = await SecureStore.getItemAsync("access");
      const apiUrl = `${endpoint}project/pick-project/${props.id}/`;

      try {
        await axios.put(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${storedAccess}`,
          },
        });

        alert("Project picked");
        setProjectPicked(true);
        setModalVisible(false); // Close the modal after successful project pick
      } catch (error) {
        alert("Error picking project");
        console.log(error);
        setModalVisible(false); // Close the modal even if there is an error
      }
    }
  };



  const handleCancelGrab = () => {

    setModalVisible(false);
  };


  const handleGrabNowClick = async () => {
    if (role === 'installation_person' && props.taken === false) {
      // Open the modal when Grab Now is clicked
      setModalVisible(true);
    }
  };
  
  const CloseProject = async () => {
    if (role === 'project_manager' && props.closed != true) {
      const storedAccess = await SecureStore.getItemAsync("access");
      const apiUrl = `${endpoint}project/close-project/${props.id}/`;

      try {
        await axios.post(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${storedAccess}`,
          },
        });

        alert("Project Closed");
        setProjectPicked(true);
        navigation.goBack()
      } catch (error) {
        alert("Error Closing project");
        console.log(error)
      }
    }
  };

  return (
    <View>
      <View className={`${props.taken?"bg-gray-600": "bg-[#f4fafe]"} w-[90%] space-y-2 rounded-lg px-4 py-4 shadow-sm mt-3 mx-auto`}>
        <Text className={`font-semibold text-2xl ${props.taken?"text-gray-200": "text-[#000]"}`}>{props.name}</Text>
        <Text className={`font-light ${props.taken?"text-gray-200": "text-zinc-600"} text-sm`}>{props.created}</Text>
        <Text className={`${props.taken?"hidden": "block"}`}>{props.desc}</Text>
        <View className="flex flex-row flex-wrap justify-around">
          <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
            <Text className="text-gray-500 font-semibold">Branch: {props.branch}</Text>
          </View>
          <View className="border border-gray-500 px-2 py-1 rounded-lg flex flex-row my-2">
            <Text className="text-gray-500 font-semibold">
              Added By: {props.sales}
            </Text>
          </View>

          {/* Conditionally render "Grab Now" button based on the user's role */
          role === 'installation_person' && props.installation === "" ? (
            <View className="border shadow-sm bg-green-600 px-2 py-1 rounded-lg flex flex-row my-2">
              <TouchableOpacity className="bg-green-600" onPress={handleGrabNowClick}>
                <Text className="text-white font-xl font-bold">Grab Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}

          {/* Conditionally render "Close Project" button based on the user's role */
          (role === 'project_manager') ? (
            <View>
              <TouchableOpacity className="bg-black px-2 py-1 mt-2 rounded-xl" onPress={CloseProject}>
                <Text className="text-lg text-white font-semibold">Close Project</Text>
              </TouchableOpacity>
            </View>
          ) : null}

        </View>
      </View>

      <Modal isVisible={isModalVisible} style={{ margin: 0, backgroundColor: 'white', height: '50%' }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
      <Text>Are you sure you want to grab this project?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleConfirmGrab}
          style={{
            backgroundColor: 'blue',
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderRadius: 15,
            marginRight: 20,
          }}
        >
          <Text style={{ color: 'white' }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancelGrab}
          style={{
            backgroundColor: 'red',
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: 'white' }}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
</View>


  );
};
  
  

export default Card;
