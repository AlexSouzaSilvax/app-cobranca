import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import Header from "../components/Header";

import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");

export default function DetalheUsuario({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        titulo={"Detalhe Usuário"}
        tamanhoTitulo={25}
        voltar={"Principal"}
        salvar
        //onPressSalvar={salvar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444"
  },
  cardTitulo: {
    width: width - 30,
    height: height - 200,
    marginTop: 25,
    borderRadius: 8,
    backgroundColor: "#303030",
    alignSelf: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontSize: 18,
    fontFamily: "Chewy",
    color: "#aaaaaa",
    marginBottom: 8
  },
  input: {
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    paddingTop: 8
  },
  button: {
    marginTop: 15,
    height: 50,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#F3F3F3",
    fontFamily: "Chewy",
    fontSize: 28
  },
  cardInput: {
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    height: 44,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  textFix: {
    alignSelf: "center",
    paddingTop: 5,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#565656"
  },
  viewStatus: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  cardStatus: {
    borderWidth: 2,
    borderRadius: 25
  },
  textStatus: {
    margin: 10,
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Chewy"
  }
});
