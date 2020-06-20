import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  View,
  FlatList,
  StyleSheet,
  Text,
  Animated,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { Spinner, Thumbnail } from "native-base";
import ActionButton from "react-native-action-button";
import { createFilter } from "react-native-search-filter";
import Constants from "expo-constants";

import Header from "../components/Header";
import CardTitulos from "../components/CardTitulos";
import Pesquisa from "../components/Pesquisa";
import { api, helper } from "../api";

export default function Principal({ navigation }) {
  const [titulos, setTitulos] = useState();
  const [titulosP, setTitulosP] = useState();
  const [titulosLista, setTitulosLista] = useState();

  const [loading, setLoading] = useState(true);
  const [cardPesquisa, setCardPesquisa] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const parametrosPesquisa = ["descricao"];

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    setCardPesquisa(false);
    setLoading(true);
    getTitulos();
    setLoading(false);
  }, []);

  async function getTitulos() {
    helper.getItem("idUsuario").then((id) => {
      api
        .post("/titulos", { _idUsuario: id })
        .then((response) => {
          setTitulos(response.data);
          setPesquisa("");
          setTitulosLista(response.data);
          setTitulosP(response.data);
        })
        .catch((error) => {
          helper.flashMessage("Falha a procurar títulos", "danger");
        });
    });
  }

  function pesquisar(p) {
    setPesquisa(p);
    setTitulosLista(titulosP.filter(createFilter(p, parametrosPesquisa)));
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*
      {cardPesquisa ? (
        <View
          style={{
            backgroundColor: "#444444",
            height: 52,
            marginTop: 24,
          }}
        >
          <Pesquisa
            placeHolder="Pesquisar títulos..."
            valor={pesquisa}
            onChangeText={(p) => pesquisar(p)}
            onPressBackPesquisa={() => setCardPesquisa(false)}
          />
        </View>
      ) : (
        <Header
          //titulo={"Títulos"}
          tamanhoTitulo={28}
          user={"DetalheUsuario"}
          sair
          pesquisa
          onPressPesquisa={() => setCardPesquisa(true)}
          // trocaTema
        />
      )}
      
        */}

      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [10, 120, 145],
              outputRange: [60, 10, 0],
              extrapolate: "clamp",
            }),
            opacity: scrollY.interpolate({
              inputRange: [1, 80, 170],
              outputRange: [1, 0.5, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(user)}
          style={styles.iconUser}
        >
          <Thumbnail
            small
            source={{
              uri:
                "https://pbs.twimg.com/media/DtZj0C3X4AETbeF?format=jpg&name=large",
            }}
          />
        </TouchableOpacity>
        <Animated.Image
          source={require("../../assets/icon.png")}
          style={{
            width: scrollY.interpolate({
              inputRange: [0, 120],
              outputRange: [230, 90],
              extrapolate: "clamp",
            }),
            height: 50,
          }}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </Animated.View>

      {loading ? (
        <View style={styles.container}>
          <Spinner color="#F3F3F3" />
          <Text style={styles.textLoading}>Carregando...</Text>
        </View>
      ) : titulos ? (
        <FlatList
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          showsVerticalScrollIndicator={false} //remove a barra lateral scroll
          style={styles.viewCardTitulos}
          data={titulosLista}
          keyExtractor={(t) => t._id}
          renderItem={({ item }) => (
            <CardTitulos key={item._id} titulo={item} />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getTitulos} />
          }
          ListEmptyComponent={
            <View style={styles.container}>
              <Text style={styles.textLoading}>Nenhum título encontrado</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.textLoading}>Nenhum título encontrado...</Text>
        </View>
      )}

      <ActionButton
        buttonColor="#56565690" //"#565656"
        onPress={() => navigation.navigate("DetalheTitulo")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#444",
    paddingTop: Constants.statusBarHeight,
  },
  viewCardTitulos: {
    paddingTop: 15,
  },
  textLoading: {
    fontSize: 20,
    color: "#F3F3F3",
    alignSelf: "center",
    justifyContent: "center",
  },
});
