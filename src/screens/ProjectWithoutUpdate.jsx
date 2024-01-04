import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import axios from "axios";
import ProjectWithoutUpdateCard from "../components/ProjectWithoutUpdateCard";
import { endpoint } from "../endpoint";
import { useNavigation } from "@react-navigation/native";

const ProjectWithoutUpdate = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await axios.get(
        `${endpoint}project/projects-without-updates/`
      );
      setProjects(allProjects.data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // Add more fields to search here
      project.sales_person.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.installation_person
        ? project.installation_person.user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        : false)
    );
  });

  return (
    <View>
      <TextInput
        placeholder="Search by name, desc, branch, sales, installation..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          margin: 10,
        }}
      />
      <ScrollView>
        {filteredProjects.map((item, index) => (
          <View key={index}>
            {item.installation_person && !item.closed ? (
              <ProjectWithoutUpdateCard
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
                created={item.created}
                closed={item.closed}
              />
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProjectWithoutUpdate;
