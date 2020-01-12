import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Spinner } from "native-base";
import { withNavigation } from "react-navigation"; // para usar a navegacao de routes por components
import { helper } from "../api";

function CardTitulos({ navigation, titulo, _idUsuario }) {
  const [loading, setLoading] = useState(false);
  const [corSttsR, setCorSttsR] = useState();
  const [corSttsP, setCorSttsP] = useState();

  useEffect(() => {
    if (titulo.status == "Recebido") {
      setCorSttsR("green");
    } else if (titulo.status == "Pendente") {
      setCorSttsP("yellow");
    }
  });

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <Spinner size="large" color={"#F3F3F3"} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetalheTitulo", { titulo, _idUsuario })
        }
      >
        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.textTitulo}>{titulo.descricao}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 1, alignSelf: "flex-start", paddingStart: 30 }}
            >
              <Text style={styles.textFix}>Valor</Text>
            </View>

            <View style={{ flex: 1, alignSelf: "flex-end", marginLeft: 150 }}>
              <Text style={styles.textFix}>Data Venc.</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 1, alignSelf: "flex-start", paddingStart: 30 }}
            >
              <Text style={styles.textVariavel}>
                {helper.numberToReal(titulo.valor)}
              </Text>
            </View>

            <View style={{ flex: 1, alignSelf: "flex-end", marginLeft: 140 }}>
              <Text style={styles.textVariavel}>
                {helper.formatData(titulo.dataVenc)}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {corSttsR ? (
              <View style={styles.cardStatusGreen}>
                <Text style={styles.textStatus}>{titulo.status}</Text>
              </View>
            ) : corSttsP ? (
              <View style={styles.cardStatusYellow}>
                <Text style={styles.textStatus}>{titulo.status}</Text>
              </View>
            ) : (
              <View style={styles.cardStatusRed}>
                <Text style={styles.textStatus}>{titulo.status}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(CardTitulos);

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 220,
    margin: 5,
    borderRadius: 12,
    backgroundColor: "#303030"
  },
  textTitulo: {
    paddingTop: 15,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#F3F3F3"
  },
  textFix: {
    paddingTop: 15,
    fontSize: 20,
    fontFamily: "Chewy",
    color: "#565656"
  },
  textVariavel: {
    paddingTop: 15,
    fontSize: 20,
    fontFamily: "Chewy",
    color: "#F3F3F3"
  },
  cardStatusGreen: {
    backgroundColor: "#77dd77",
    borderRadius: 22,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  cardStatusRed: {
    backgroundColor: "#ff6961",
    borderRadius: 22,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  cardStatusYellow: {
    backgroundColor: "#eead2d",
    borderRadius: 22,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  textStatus: {
    margin: 15,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#484848" //'#F3F3F3'
  }
});
