import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { Spinner, Thumbnail } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from "../components/Header";
import InputComponent from "../components/Input";
import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";
import { api, helper } from "../api";
import SelecionaOpcoes from "../components/SelecionaOpcoes";
import CameraItem from "../components/CameraItem";
import ImagemFullScreen from "../components/ImagemFullScreen.js";

const { width, height } = Dimensions.get("screen");

export default function DetalheUsuario({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  //Camera
  const [modalCameraVisible, setModalCameraVisible] = useState(false);
  const [preview, setPreview] = useState(false);
  const [permissao, setPermissao] = useState(null);
  const [camera, setCamera] = useState();
  const [loadingCamera, setLoadingCamera] = useState(true);
  //"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3617V4nHEX2MO8rjmsjK1dZmmgJJyqkDWhB4deFzKd7LMJuBk&usqp=CAU"
  const [imageUri, setImageUri] = useState("../../assets/sem_foto.png");
  const [base64, setBase64] = useState(null);
  const [visibleOpcoesImg, setVisibleOpcoesImg] = useState(true); //aqui
  const [cameraType, setCameraType] = useState(true); //true === back, false === front
  //ImagemFullScreen
  const [
    modalVisibleImagemFullScreen,
    setModalVisibleImagemFullScreen,
  ] = useState(false);

  const opcoes = [
    "Cancelar", //0
    "Visualizar foto", //1
    "Câmera", //2
    "Galeria", //3
    "Remover foto", //4
  ];

  useEffect(() => {
    async function getDadosUsuario() {
      await AsyncStorage.getItem("emailUsuario").then((email) =>
        setEmail(email)
      );
      await AsyncStorage.getItem("loginUsuario").then((login) =>
        setLogin(login)
      );
      await AsyncStorage.getItem("senhaUsuario").then((senha) =>
        setSenha(senha)
      );
      setLoading(false);
    }

    getDadosUsuario();
  }, []);

  async function salvar() {
    AsyncStorage.getItem("idUsuario").then((id) => {
      api
        .post("/usuarios/atualizar", {
          _id: id,
          email: email,
          login: login,
          senha: senha,
          foto: `data:image/jpeg;base64,${base64}`,
        })
        .then((response) => {
          if (response.status == 200) {
            AsyncStorage.setItem("emailUsuario", email);
            AsyncStorage.setItem("loginUsuario", login);
            AsyncStorage.setItem("senhaUsuario", senha);
            helper.flashMessage("Salvo com sucesso", "success");
          }
        })
        .catch((error) => {
          helper.flashMessage(
            "Não foi possível salvar\nTente novamente",
            "danger"
          );
        });
    });
  }

  async function onPressSelecaoImagem(index) {
    if (index === 0) {
      //cancelar
    }
    if (index === 1) {
      //vizualizar foto
      setModalVisibleImagemFullScreen(!modalVisibleImagemFullScreen);
    }
    if (index === 2) {
      //camera
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == "granted") {
        setPermissao(status);
        setLoadingCamera(false);
        setModalCameraVisible(true);
      } else {
        setPermissao(null);
        setLoadingCamera(false);
        setPreview(false);
        setModalCameraVisible(false);
        setVisibleOpcoesImg(false);
        helper.flashMessage(
          "Para acessar a câmera, é preciso liberar acesso para o aplicativo",
          "warning"
        );
      }
    }
    if (index === 3) {
      // pega img da galeria
      getImgGaleria();
    }
    if (index === 4) {
      //remover foto
      setImageUri("../../assets/sem_foto.png");
      setBase64("");
      setVisibleOpcoesImg(false);
    }
    setVisibleOpcoesImg(false);
  }

  async function getImgGaleria() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      helper.flashMessage(
        "Para acessar a galeria, é preciso liberar acesso para o aplicativo",
        "warning"
      );
      setVisibleOpcoesImg(false);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 0.5,
      });
      if (result.uri) {
        setImageUri(result.uri);
        setBase64(result.base64);
        setVisibleOpcoesImg(false);
      }
    }
  }

  //Camera
  async function capturaFoto() {
    setPreview(true);
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
      };
      await camera.takePictureAsync(options).then((c) => {
        setBase64(c.base64);
        setImageUri(c.uri);
        setPreview(false);
        setModalCameraVisible(false);
        setVisibleOpcoesImg(false);
      });
    }
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Principal");
    return true;
  });

  if (loading) {
    return (
      <View style={styles.containerLogin}>
        <Spinner color="#F3F3F3" />
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header
          titulo={"Suas Informações"}
          tamanhoTitulo={25}
          voltar={"Principal"}
          salvar
          onPressSalvar={salvar}
        />

        <KeyboardAwareScrollView
          style={styles.cardTitulo}
          keyboardShouldPersistTaps="handled"
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardOpeningTime={0}
          scrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingTop: 15,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setVisibleOpcoesImg(!visibleOpcoesImg)}
            >
              <Thumbnail
                large
                defaultSource={require("../../assets/sem_foto.png")}
                source={{ uri: imageUri }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.textFix}>Email</Text>
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

          <Text style={styles.textFix}>Login *</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconUser}
              valor={login}
              onChangeText={(l) => setLogin(l)}
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
              onChangeText={(s) => setSenha(s)}
              autoCorrect={false}
              placeholder="Sua senha"
              placeholderTextColor="#565656"
              autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
              autoCorrect={false} //não permitir fazer correção do texto
            />
          </View>

          {modalVisibleImagemFullScreen ? (
            <ImagemFullScreen
              nome={login}
              imagem={imageUri}
              modalVisibleImagemFullScreen={modalVisibleImagemFullScreen}
              setModalVisibleImagemFullScreen={() =>
                setModalVisibleImagemFullScreen(!modalVisibleImagemFullScreen)
              }
            />
          ) : (
            <></>
          )}

          {/* Card seleciona as opcoes */}
          {visibleOpcoesImg ? (
            <SelecionaOpcoes
              titulo={"Escolha uma foto"}
              onPress={onPressSelecaoImagem}
              opcoes={opcoes}
              visible={true}
            />
          ) : (
            <></>
          )}

          <CameraItem
            cameraType={cameraType}
            setCameraType={() => setCameraType(!cameraType)}
            camera={camera}
            modalCameraVisible={modalCameraVisible}
            loadingCamera={loadingCamera}
            permissao={permissao}
            setModalCameraVisible={() =>
              setModalCameraVisible(!modalCameraVisible)
            }
            setCamera={(ref) => setCamera(ref)}
            capturaFoto={capturaFoto}
            preview={preview}
          />
          <View style={{ height: 40 }} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444",
  },
  containerLogin: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitulo: {
    width: width - 10,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: "#303030",
    alignSelf: "center",
  },
  input: {
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    paddingTop: 8,
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
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    //fontFamily: 'Chewy',
    color: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
});
