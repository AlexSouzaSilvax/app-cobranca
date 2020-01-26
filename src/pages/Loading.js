import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import logo from "../../assets/icon.png";
import { helper } from "../api";

export default function Loading({ navigation }) {
  const [progresso, setProgresso] = useState(0);

  function animacao() {
    let progress = 0;
    setTimeout(() => {
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        setProgresso(progress);
      }, 500);
    }, 1500);
  }

  async function verificaUsuarioLogado() {
    await helper.getItem("idUsuario").then(idUsuario => {
      if (idUsuario) {
        navigation.navigate("Principal");
        //console.log(`navigation.navigate("Principal");`);
      } else {
        navigation.navigate("Login");
        //console.log(`navigation.navigate("Login");`);
      }
    });
  }

  useEffect(() => {
    animacao();
    verificaUsuarioLogado();
  }, []);

  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ProgressBar
        style={{ width: 200, marginTop: 50 }}
        progress={progresso}
        color={"#ddd"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
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
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "cover"
  }
});
