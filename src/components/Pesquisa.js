import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input } from "native-base";
import { withNavigation } from "react-navigation";

function Pesquisa({ placeHolder, valor, onChangeText, onPressBackPesquisa }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        //position: "absolute",
        height: 50,
        width: "96%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 4
        //padding: 10,
        //marginTop: -65
      }}
    >
      <Ionicons
        name={"ios-close"}
        size={42}
        color={"#aaaaaa"}
        style={{ alignSelf: "center", paddingStart: 10 }}
        onPress={onPressBackPesquisa}
      />
      <Input
        placeholder={placeHolder}
        placeholderTextColor="#aaaaaa"
        style={{ alignSelf: "center", marginLeft: 10, color: "#444" }}
        value={valor}
        onChangeText={onChangeText}
        autoFocus={true}
      />
      <Icon
        name={"search"}
        size={18}
        color={"#aaaaaa90"}
        style={{ alignSelf: "center", paddingEnd: 10 }}
      />
    </View>
  );
}
export default withNavigation(Pesquisa);
