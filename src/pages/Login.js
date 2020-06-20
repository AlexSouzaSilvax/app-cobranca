import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Keyboard,
  Alert,
  AsyncStorage,
} from "react-native";

import InputComponent from "../components/Input";
import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";
import Constants from "expo-constants";
import { Spinner } from "native-base";
import { api, helper } from "../api";

export default function Login({ navigation }) {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 150, y: 150 }));
  const [logoText, setLogoText] = useState(new Animated.Value(0));

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [textBtnLogar, setTextBtnLogar] = useState("Acessar");

  useEffect(() => {
    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      KeyboardDidShow
    );
    const KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 1,
        bounciness: 5,
      }).start(),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(logoText, {
        toValue: 1,
        duration: 1500, //1200,
      }),
    ]).start();
  }, []);

  function KeyboardDidShow() {
    //console.log('teclado aberto');
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
      }),
      Animated.timing(logoText, {
        toValue: 0,
        duration: 0, //1200,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    //console.log('teclado fechado');
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 0,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 0,
      }),
      Animated.timing(logoText, {
        toValue: 1,
        duration: 0, //1200,
      }),
    ]).start();
  }

  async function validacaoLogin() {
    setBtnLoading(true);
    if (!login || !senha) {
      setBtnLoading(false);
      helper.flashMessage("Login/Senha é obrigatório", "warning");
    } else {
      await api
        .post("/usuarios/buscar", { login, senha })
        .then((response) => {
          setBtnLoading(false);
          if (response.data) {
            const { status } = response;
            if (status === 200) {
              AsyncStorage.setItem("idUsuario", response.data._id);
              AsyncStorage.setItem("emailUsuario", response.data.email);
              AsyncStorage.setItem("loginUsuario", response.data.login);
              AsyncStorage.setItem("senhaUsuario", response.data.senha);
              navigation.navigate("Principal");
            } else {
              helper.flashMessage("Falha ao validar usuário", "danger");
            }
          } else {
            helper.flashMessage("Usuário não encontrado", "danger");
          }
        })
        .catch((error) => {
          setBtnLoading(false);
          helper.flashMessage(`Serviço indisponível`, "danger");
        });
    }
  }

  function cadastrar() {
    navigation.navigate("Cadastrar");
  }

  function esqueciSenha() {
    //Alert.alert("Função/Tela em desenvolvimento.");
    navigation.navigate("EsqueciSenha");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#444" }}>
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <View style={styles.containerLogo}>
          <Animated.Image
            style={{ width: logo.x, height: logo.y, marginTop: 15 }}
            source={require("../../assets/icon.png")}
          />
          <Animated.View style={{ opacity: logoText }}>
            <Text style={styles.logoText}> Cobrança </Text>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [{ translateY: offset.y }],
              paddingHorizontal: 30,
              marginTop: 30,
            },
          ]}
        >
          <View>
            <Text style={styles.label}>LOGIN</Text>
            <InputComponent
              icon={iconUser}
              placeholder="Seu login"
              placeholderTextColor="#565656"
              //keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
              autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
              autoCorrect={false} //não permitir fazer correção do texto
              valor={login}
              onChangeText={(e) => setLogin(e)}
            />

            <Text style={styles.label}>SENHA</Text>
            <InputComponent
              icon={iconPassword}
              placeholder="Sua senha"
              placeholderTextColor="#565656"
              autoCorrect={false} //não permitir fazer correção do texto
              secureTextEntry={true}
              valor={senha}
              onChangeText={(s) => setSenha(s)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={validacaoLogin}>
            {btnLoading ? (
              <Spinner color="#F3F3F3" />
            ) : (
              <Text style={styles.buttonText}>{textBtnLogar}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>

      {/*
      <TouchableOpacity style={styles.buttonEsqueciSenha} onPress={esqueciSenha} >
        <Text style={styles.buttonTextEsqueciSenha}>Não lembro minha senha</Text>
      </TouchableOpacity>

      <View style={styles.linha} />

      <TouchableOpacity style={styles.buttonCadastrar} onPress={cadastrar}>
        <Text style={styles.buttonTextCadastrar}>Cadastrar-se</Text>
      </TouchableOpacity>
    */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    paddingTop: Constants.statusBarHeight,
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 50,
  },
  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: "#FFF",
  },
  logoText: {
    color: "#F3F3F3",
    fontSize: 58,
    marginTop: 10,
    fontWeight: "500",
    fontFamily: "Chewy",
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: "Chewy",
    color: "#aaaaaa",
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
    height: 50,
    width: Dimensions.get("screen").width - 22,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonCadastrar: {
    padding: 8,
    width: Dimensions.get("screen").width - 22,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEsqueciSenha: {
    width: Dimensions.get("screen").width - 22,
    marginTop: 5,
    padding: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#F3F3F3",
    fontFamily: "Chewy",
    fontSize: 28,
  },
  buttonTextCadastrar: {
    color: "#aaaaaa",
    fontFamily: "Chewy",
    fontSize: 25,
  },
  buttonTextEsqueciSenha: {
    color: "#aaaaaa",
    fontFamily: "Chewy",
    fontSize: 20,
  },
  logo: {
    marginTop: 15,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    paddingTop: 15,
    fontSize: 58,
    height: 90,
    fontFamily: "Chewy",
    color: "#F3F3F3",
  },
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    //fontFamily: 'Chewy',
    color: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  linha: {
    borderWidth: 1,
    borderColor: "#777777",
    width: 300,
    alignSelf: "center",
  },
});
