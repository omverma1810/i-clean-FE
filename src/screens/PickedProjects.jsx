import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import PickedCard from "../components/PickedCards";
import { endpoint } from "../endpoint";

const PickedProjects = () => {
  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const storedAccess = await SecureStore.getItemAsync("access");
      if (storedAccess) {
        try {
          const all_projects = await axios.get(
            `${endpoint}project/list-picked-projects/`,
            {
              headers: {
                Authorization: `Bearer ${storedAccess}`,
              },
            }
          );
          setProjects(all_projects.data);
        } catch (error) {
          alert("Some error occured, try to login again or contact the Admin")
        }
      } else {
        alert("Please login with your installation account");
      }
    };
  
    // Call fetchProjects here, not inside the useEffect
    fetchProjects();
  }, [0]); // Use an empty dependency array to ensure this effect runs only once


  function formatTimestampTo12Hour(timestamp) {
    const date = new Date(timestamp);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,  // Use 12-hour format
    };
  
    return date.toLocaleString('en-US', options);
  }
  

  return (
    <ScrollView>
      {Projects.map((item, index) => (
        <View key={index}>
          <PickedCard
            id={item.id}
            name={item.name}
            desc={item.desc}
            branch={item.branch}
            sales={item.sales_person.user.first_name}
            installation={
              item.installation_person
                ? item.installation_person.user.first_name
                : ""
            }
            taken={item.already_taken}
            created={formatTimestampTo12Hour(item.created)}
            closed={item.closed}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default PickedProjects;
