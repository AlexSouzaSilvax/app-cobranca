import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";

import { Camera } from "expo-camera";
import { Spinner } from "native-base";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFeather from "react-native-vector-icons/Feather";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CameraItem({
  modalCameraVisible,
  setModalCameraVisible,
  loadingCamera,
  permissao,
  setCamera,
  capturaFoto,
  preview,
  cameraType,
  setCameraType,
}) {
  const [flashOn, setFlashOn] = useState(false);
  const [flashOff, setFlashOff] = useState(true);
  const [flashAuto, setFlashAuto] = useState(false);
  const [flash, setFlash] = useState("");

  function FlashOn() {
    setFlashOn(true);
    setFlashOff(false);
    setFlashAuto(false);
    setFlash("on");
  }

  function FlashOff() {
    setFlashOn(false);
    setFlashOff(true);
    setFlashAuto(false);
    setFlash("off");
  }

  function FlashAuto() {
    setFlashOn(false);
    setFlashOff(false);
    setFlashAuto(true);
    setFlash("auto");
  }

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={modalCameraVisible}
      onRequestClose={setModalCameraVisible}
    >
      {loadingCamera ? (
        <Text style={styles.container}>Carregando...</Text>
      ) : !permissao ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.camera}
            flashMode={flash}
            type={
              cameraType
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            }
            autoFocus={true}
            permissionDialogTitle={"Permissão para usar a câmera"}
            permissionDialogMessage={
              "Precisamos da sua permissão para usar a câmera do seu smartphone"
            }
            ref={setCamera}
            onMountError={(e) => console.log(e)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                {flashOff ? (
                  <IconMaterialIcons
                    name={"flash-off"}
                    size={30}
                    color={"#FFFFFF"}
                    onPress={() => FlashOn()}
                  />
                ) : (
                  <View></View>
                )}

                {flashOn ? (
                  <IconMaterialIcons
                    name={"flash-on"}
                    size={30}
                    color={"#FFFFFF"}
                    onPress={() => FlashAuto()}
                  />
                ) : (
                  <View></View>
                )}

                {flashAuto ? (
                  <IconMaterialIcons
                    name={"flash-auto"}
                    size={30}
                    color={"#FFFFFF"}
                    onPress={() => FlashOff()}
                  />
                ) : (
                  <View></View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={capturaFoto}
              >
                <IconFeather
                  name="circle"
                  style={{ color: "#fff", fontSize: 70 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={setCameraType}
              >
                <IconMaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>

            {preview ? (
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F3F3F3",
                    borderRadius: 20,
                    width: 200,
                    height: 120,
                    alignSelf: "center",
                    marginTop: -700,
                  }}
                >
                  <Spinner color={"#444"} style={{ marginTop: -8 }} />
                  <Text
                    style={{
                      marginTop: -5,
                      alignSelf: "center",
                      color: "#444",
                      fontSize: 20,
                    }}
                  >
                    Aguarde...
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </Camera>
        </View>
      )}
    </Modal>
  );
}

export default withNavigation(CameraItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: "#EEEEEE",
    borderRadius: 40,
    width: 70,
    height: 70,
    marginTop: Dimensions.get("screen").height - 200,
    //marginRight: "13%"
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  buttonsPreview: {
    flex: 1,
    marginTop: 5,
    padding: 2,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: Dimensions.get("screen").width - 20,
    borderBottomWidth: 1,
    borderColor: "#aaaaaa",
  },
  label: {
    marginEnd: 2,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B75BB",
  },
  labelCancelar: {
    color: "#cc0000",
    marginStart: 2,
    alignSelf: "center",
    fontSize: 20,
  },
});
