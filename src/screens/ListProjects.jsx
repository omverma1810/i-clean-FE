import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import Card from "../components/Card";
import axios from "axios";
import { endpoint } from "../endpoint";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await axios.get(`${endpoint}project/list_projects/`);
      setProjects(allProjects.data);
    };
    fetchProjects();
  }, []);

  function formatTimestampTo12Hour(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // Add more fields to search here
      formatTimestampTo12Hour(project.created)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View>
      <TextInput
        placeholder="Search by name, desc, branch, date..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          margin: 10,
          borderRadius: 7
        }}
      />
      <ScrollView>
        {filteredProjects.map((item, index) => (
          <View key={index}>
            <Card
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
    </View>
  );
};

export default ListProjects;
