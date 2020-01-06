import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Spinner } from "native-base";
import * as Font from "expo-font";

import Routes from "./src/routes";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFont() {
      await Font.loadAsync({
        Chewy: require("./assets/fonts/Chewy.ttf")
      });
      setLoading(false);
    }

    fetchFont();
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner color="#F3F3F3" />
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return <Routes />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center"
  },
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    color: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center"
  }
});
