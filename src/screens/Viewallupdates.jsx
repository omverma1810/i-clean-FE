import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { endpoint } from "../endpoint";

const Viewallupdates = ({ route }) => {
  const { role } = route.params;
  const [userRole, setUserRole] = useState(null);
  const [projectUpdates, setProjectUpdates] = useState([]);

  const getProjectUpdates = async (token) => {
    try {
      const apiUrl = `${endpoint}project/all-updates/`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response:", response.data);
      setProjectUpdates(response.data);
    } catch (error) {
      console.error("Error fetching project updates:", error);
    }
  };

    useEffect(() => {
    if (role) {
      if (role === "project_manager" || role === "superuser") {
        const fetchProjectManagerToken = async () => {
          const storedAccess = await SecureStore.getItemAsync("access");
          if (storedAccess) {
            getProjectUpdates(storedAccess);
          }
        };
        fetchProjectManagerToken();
      }
    }
  }, [role]);


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

  const CloseProject = async (update) => {
    if (role === "project_manager" && update.project && !update.project.closed) {
      const storedAccess = await SecureStore.getItemAsync("access");
      const apiUrl = `${endpoint}project/close-project/${update.project.id}/`;

      try {
        await axios.post(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${storedAccess}`,
          },
        });

        Alert.alert("Project Closed");
      } catch (error) {
        Alert.alert("Error Closing project");
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Project Updates</Text>
      {Array.isArray(projectUpdates) && projectUpdates.length > 0 ? (
        projectUpdates.map((update, index) => (
          <View key={index} style={styles.projectUpdate}>
            <Text style={styles.projectName}>{update.project.name}</Text>
            <Text style={styles.projectDescription}>
              Update: {update.update_desc || "N/A"}
            </Text>
            <Text style={styles.projectBranch}>
              Branch: {update.project.branch}
            </Text>
            <Text style={styles.installedQuantity}>
              Installed Quantity: {update.installed_quatity || "N/A"}
            </Text>
            {/* <Text style={styles.poQuantity}>
              PO Quantity: {update.po_quantity || "N/A"}
            </Text> */}
            <Text style={styles.balanceToBeInstalled}>
              Balance to Be Installed: {update.balance_to_be_installed || "N/A"}
            </Text>
            <Text style={styles.handledOverQuantity}>
              Handled Over Quantity: {update.handed_over_quantity || "N/A"}
            </Text>
            <Text style={styles.balanceToBeHandover}>
              Balance to Be Handover: {update.balance_to_be_handedover || "N/A"}
            </Text>
            {/* Your existing code */}

          <Text style={styles.projectName}>{update.project.name}</Text>
          <Text style={styles.projectDescription}>
            Update: {update.update_desc || "N/A"}
          </Text>
          <Text style={styles.projectBranch}>
            Branch: {update.project.branch}
          </Text>
          <Text style={styles.installationPerson}>
            Installation Person:{" "}
            {update.project.installation_person.user.first_name}
          </Text>
          <Text style={styles.createdAt}>
            {formatTimestampTo12Hour(update.created)}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => CloseProject(update)}
          >
            <Text style={styles.closeButtonText}>Close this project</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text>Loading...</Text> // Or a loading indicator component
    )}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectUpdate: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 30,
  },
  projectName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    marginTop: 20,
  },
  projectBranch: {
    fontSize: 14,
    color: "gray",
  },
  installationPerson: {
    fontSize: 14,
    color: "gray",
  },
  createdAt: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "black",
    marginVertical: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Viewallupdates;

