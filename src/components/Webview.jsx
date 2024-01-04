import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { endpoint } from "../endpoint";

const Webview = () => {
  const webViewRef = useRef(null);
  const [error, setError] = useState(false);

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: `https://i-clean.tech/admin` }}
          onError={handleError}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#417690',
    padding: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Webview;
