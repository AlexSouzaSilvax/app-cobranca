import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import Header from "../components/Header";
import InputComponent from "../components/Input";

import { api, helper } from "../api";

const { width, height } = Dimensions.get("screen");

import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  return (
    <View style={styles.container}>
      <Header
        titulo={"Nova Senha"}
        tamanhoTitulo={30}
        voltar={"Login"}
        salvar
        onPressSalvar={salvar}
      />

      <View style={styles.cardTitulo}>
        <Text style={styles.textFix}>Email *</Text>
        <View style={styles.widthInput}>
          <InputComponent
            icon={iconUser}
            valor={email}
            onChangeText={(e) => setEmail(e)}
            autoCorrect={false}
            placeholder="Seu email"
            placeholderTextColor="#565656"
            keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
            autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
            autoCorrect={false} //não permitir fazer correção do texto
          />
        </View>

        <Text style={styles.textFix}>Nova Senha *</Text>
        <View style={styles.widthInput}>
          <InputComponent
            icon={iconPassword}
            valor={senha}
            onChangeText={(s) => setSenha(s)}
            autoCorrect={false}
            placeholder="Sua nova senha"
            placeholderTextColor="#565656"
            autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
            autoCorrect={false} //não permitir fazer correção do texto
          />
        </View>
      </View>
    </View>
  );

  async function salvar() {
    await api
      .post("/usuarios/esqueciSenha", {
        email,
        senha,
      })
      .then((response) => {
        if (response.status == 200) {
          helper.flashMessage("Senha atualizada com sucesso", "success");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        helper.flashMessage(
          "Não foi possível atualizar sua senha\nTente novamente",
          "danger"
        );
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444",
  },
  cardTitulo: {
    width: width - 10,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: "#303030",
    alignSelf: "center",
  },
  button: {
    marginTop: 15,
    height: 50,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#F3F3F3",
    fontFamily: "Chewy",
    fontSize: 28,
  },
  cardInput: {
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    height: 44,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textFix: {
    //alignSelf: "center",
    paddingTop: 5,
    marginStart: 7,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#565656",
  },
  widthInput: {
    //width: width - 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});
