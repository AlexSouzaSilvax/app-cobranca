import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Spinner } from "native-base";
import { withNavigation } from "react-navigation"; // para usar a navegacao de routes por components

const { width, height } = Dimensions.get("screen");

function CardTitulos({ navigation, titulo, _idUsuario }) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Spinner size="large" color={"#F3F3F3"} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetalheTitulo", { titulo })}
      >
        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.textTitulo}>{titulo.descricao}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{ flex: 1, alignSelf: "flex-start", paddingStart: 30 }}
            >
              <Text style={styles.textFix}>Valor</Text>
            </View>

            <View style={{ flex: 1, alignSelf: "flex-end", marginLeft: 100 }}>
              <Text style={styles.textFix}>Data Venc.</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{ flex: 1, alignSelf: "flex-start", paddingStart: 30 }}
            >
              <Text style={styles.textVariavel}>{`R$ ${titulo.valor}`}</Text>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "flex-end",
                marginLeft: 100,
              }}
            >
              <Text style={styles.textVariavel}>{titulo.dataVenc}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(CardTitulos);

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    height: 150,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#303030",
  },
  textTitulo: {
    paddingTop: 15,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#F3F3F3",
  },
  textFix: {
    paddingTop: 15,
    fontSize: 20,
    fontFamily: "Chewy",
    color: "#565656",
  },
  textVariavel: {
    width: 150,
    paddingTop: 15,
    fontSize: 20,
    fontFamily: "Chewy",
    color: "#F3F3F3",
  },
  /*  
  cardStatusGreen: {
    backgroundColor: "#77dd77",
    borderRadius: 22,
    width: width - 200,
    height: height - 800,
    alignItems: "center",
    justifyContent: "center"
  },
  cardStatusRed: {
    backgroundColor: "#ff6961",
    borderRadius: 22,
    width: width - 200,
    height: height - 800,
    alignItems: "center",
    justifyContent: "center"
  },
  cardStatusYellow: {
    backgroundColor: "#eead2d",
    borderRadius: 22,
    width: width - 200,
    height: height - 800,
    alignItems: "center",
    justifyContent: "center"
  },
  textStatus: {
    margin: 15,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#484848" //'#F3F3F3'
  }
  */
});
