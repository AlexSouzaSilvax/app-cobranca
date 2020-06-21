import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { Spinner } from "native-base";
import { withNavigation } from "react-navigation"; // para usar a navegacao de routes por components
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("screen");

function CardTitulos({ navigation, titulo, apagar }) {
  function LeftActions(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Concluir
        </Animated.Text>
      </View>
    );
  }

  function RightActions({ progress, dragX, onPress }) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onPress} style={styles.rightAction}>
        <Animated.View
          style={[
            { padding: 20, alignSelf: "center" },
            { transform: [{ scale: scale }] },
          ]}
        >
          <Icon name="trash" size={40} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable
      //renderLeftActions={LeftActions}
      //onSwipeableLeftOpen={() => {}}
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={apagar} />
      )}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("DetalheTitulo", { titulo })}
      >
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text numberOfLines={1} style={styles.textTitulo}>
              {titulo.descricao}
            </Text>
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
              marginBottom: 10,
            }}
          >
            <View
              style={{ flex: 1, alignSelf: "flex-start", paddingStart: 30 }}
            >
              <Text
                numberOfLines={1}
                style={styles.textVariavel}
              >{`R$ ${titulo.valor}`}</Text>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "flex-end",
                marginLeft: 100,
              }}
            >
              <Text numberOfLines={1} style={styles.textVariavel}>
                {titulo.dataVenc}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default withNavigation(CardTitulos);

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    height: 110,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitulo: {
    //width: width - 25,
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
    fontSize: 20,
    fontFamily: "Chewy",
    color: "#F3F3F3",
  },
  text: {
    fontSize: 17,
    color: "#222",
  },
  leftAction: {
    width: 80,
    height: 150,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
  },
  rightAction: {
    width: 80,
    height: 110,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-end",
  },
  actionText: {
    fontSize: 17,
    color: "#FFF",
    padding: 20,
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
