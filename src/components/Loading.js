import React from "react";
import { Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import logo from "../../assets/icon.png";

export default function Loading() {
  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.textLoading}>Carregando...</Text>
      <Spinner color="#aaa" size={60} style={{ marginTop: 25 }} />
    </SafeAreaView>
  );
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
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 250,
    alignSelf: "center",
    resizeMode: "cover"
  }
});
