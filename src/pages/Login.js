import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Spinner } from "native-base";
import * as Font from "expo-font";
import { api } from "../api";

import InputComponent from "../components/Input";

import logo from "../../assets/icon.png";
import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [login, setLogin] = useState("alex.silva");
  const [senha, setSenha] = useState("@lex");
  const [btnLoading, setBtnLoading] = useState(false);
  const [textBtnLogar, setTextBtnLogar] = useState("Acessar");

  useEffect(() => {
    AsyncStorage.getItem("idUsuario").then(idUsuario => {
      if (idUsuario) {
        navigation.navigate("Principal");
        //console.log("ja existe login feito");
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner color="#F3F3F3" />
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.titulo}>Cobrança</Text>

        <View style={styles.form}>
          <Text style={[styles.label, { paddingTop: 30 }]}>LOGIN</Text>
          <InputComponent
            icon={iconUser}
            placeholder="Seu login"
            placeholderTextColor="#565656"
            //keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
            autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
            autoCorrect={false} //não permitir fazer correção do texto
            valor={login}
            onChangeText={e => setLogin(e)}
          />

          <Text style={styles.label}>SENHA</Text>
          <InputComponent
            icon={iconPassword}
            placeholder="Sua senha"
            placeholderTextColor="#565656"
            autoCorrect={false} //não permitir fazer correção do texto
            secureTextEntry={true}
            valor={senha}
            onChangeText={s => setSenha(s)}
          />

          <TouchableOpacity style={styles.button} onPress={validacaoLogin}>
            {btnLoading ? (
              <Spinner color="#F3F3F3" />
            ) : (
              <Text style={styles.buttonText}>{textBtnLogar}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  async function validacaoLogin() {
    setBtnLoading(true);
    if (!login || !senha) {
      console.log("Login/Senha é obrigatorio");
      setBtnLoading(false);
      setTextBtnLogar("Login/Senha é obrigatório");
      //entrar um toast
    } else {
      await api
        .post("/usuarios/buscar", { login, senha })
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setBtnLoading(false);
        })
        .catch(error => {
          //console.error(error);
          setBtnLoading(false);
          Alert.alert(`Serviço indisponível`);
          //setTextBtnLogar("Serviço indisponível");
        });

      if (data == null) {
        console.log("Usuário não encontrado");
        setBtnLoading(false);
        setTextBtnLogar("Acessar");
      } else {
        if (login == data.login && senha == data.senha) {
          AsyncStorage.setItem("idUsuario", data._id);
          navigation.navigate("Principal");
          //console.log("Bem vindo: " + data[0].login);
          //setBtnLoading(false);
        } else {
          console.log("usuario ou senha inválidos.");
          setBtnLoading(false);
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center"
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
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    height: 44,
    marginBottom: 20,
    borderRadius: 5
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
  logo: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    paddingTop: 15,
    fontSize: 58,
    height: 90,
    fontFamily: "Chewy",
    color: "#F3F3F3"
  },
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    //fontFamily: 'Chewy',
    color: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center"
  }
});
