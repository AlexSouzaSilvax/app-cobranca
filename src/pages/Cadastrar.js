import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import Header from "../components/Header";
import InputComponent from "../components/Input";

import { api } from "../api";

const { width, height } = Dimensions.get("screen");

import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";

export default function Cadastrar({ navigation }) {
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  return (
    <View style={styles.container}>
      <Header
        titulo={"Cadastrar-se"}
        tamanhoTitulo={25}
        voltar={"Login"}
        salvar
        onPressSalvar={salvar}
      />

      <View style={styles.cardTitulo}>
        <Text style={styles.textFix}>Email</Text>
        <View style={styles.widthInput}>
          <InputComponent
            icon={iconUser}
            valor={email}
            onChangeText={e => setEmail(e)}
            autoCorrect={false}
            placeholder="Seu email"
            placeholderTextColor="#565656"
            keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
            autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
            autoCorrect={false} //não permitir fazer correção do texto
          />
        </View>

        <Text style={styles.textFix}>Login *</Text>
        <View style={styles.widthInput}>
          <InputComponent
            icon={iconUser}
            valor={login}
            onChangeText={l => setLogin(l)}
            autoCorrect={false}
            placeholder="Seu login"
            placeholderTextColor="#565656"
            autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
            autoCorrect={false} //não permitir fazer correção do texto
          />
        </View>

        <Text style={styles.textFix}>Senha *</Text>
        <View style={styles.widthInput}>
          <InputComponent
            icon={iconPassword}
            valor={senha}
            onChangeText={s => setSenha(s)}
            autoCorrect={false}
            placeholder="Sua senha"
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
      .post("/usuarios/criar", {
        email,
        login,
        senha
      })
      .then(response => {
        //console.log(response.data);

        if (response.status == 200) {
          Alert.alert("Cadastrado com sucesso.");
          navigation.navigate("Login");
        }
      })
      .catch(error => {
        Alert.alert(`Serviço indisponível`);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444"
  },
  cardTitulo: {
    width: width - 10,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: "#303030",
    alignSelf: "center"
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
    //alignSelf: "center",
    paddingTop: 5,
    marginStart: 7,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#565656"
  },
  widthInput: {
    //width: width - 20,
    justifyContent: "center",
    alignSelf: "center"
  }
});
