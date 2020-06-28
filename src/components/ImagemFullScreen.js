import React from "react";
import { StyleSheet, Dimensions, Image, Modal } from "react-native";
import Header from "./Header";

export default function ImagemFullScreen({
  imagem,
  nome,
  modalVisibleImagemFullScreen,
  setModalVisibleImagemFullScreen,
}) {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={modalVisibleImagemFullScreen}
      onRequestClose={setModalVisibleImagemFullScreen}
    >
      <Header
        titulo={nome}
        tamanhoTitulo={22}
        styleTitulo={{
          alignSelf: "center",
          fontWeight: "bold",
          marginTop: 10,
          right: 15,
        }}
        styleVoltar={{
          marginTop: 15,
        }}
        tamanhoHeader={55}
        voltar={setModalVisibleImagemFullScreen}
      />
      <Image source={{ uri: imagem }} style={styles.imagem} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
