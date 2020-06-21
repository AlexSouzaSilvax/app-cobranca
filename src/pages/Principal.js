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
  Alert,
  AsyncStorage,
  Keyboard,
} from "react-native";

import { Spinner, Thumbnail } from "native-base";
import ActionButton from "react-native-action-button";
import { createFilter } from "react-native-search-filter";
import Constants from "expo-constants";

import CardTitulos from "../components/CardTitulos";
import Pesquisa from "../components/Pesquisa";
import { api, helper } from "../api";
import iconSair from "../../assets/iconSair.png";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Principal({ navigation }) {
  const [titulos, setTitulos] = useState();
  const [titulosP, setTitulosP] = useState();
  const [titulosLista, setTitulosLista] = useState();

  const [loading, setLoading] = useState(true);
  const [cardPesquisa, setCardPesquisa] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const parametrosPesquisa = ["descricao"];

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const [alturaLista, setAlturaLista] = useState(0);
  const [alturaLista2, setAlturaLista2] = useState(0);

  const [visibleAdc, setVisibleAdc] = useState(true);

  useEffect(() => {
    getTitulos();
  }, []);

  //controle para saber quando a lista scroola para baixo ou pra cima
  useEffect(() => {
    if (alturaLista > alturaLista2) {
      //console.log("para baixo " + alturaLista);

      //esconder btn adc flutuante
      setVisibleAdc(false);

      //Fechar teclado
      Keyboard.dismiss();
    } else if (alturaLista < alturaLista2) {
      //console.log("para cima " + alturaLista);
      //amostrar btn adc flutuante
      setVisibleAdc(true);
    }
    setAlturaLista2(alturaLista);
  }, [alturaLista]);

  async function getTitulos() {
    setCardPesquisa(false);
    setLoading(true);
    await helper.getItem("idUsuario").then((id) => {
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
    setLoading(false);
  }

  function pesquisar(p) {
    setPesquisa(p);
    setTitulosLista(titulosP.filter(createFilter(p, parametrosPesquisa)));
  }

  function alertApagar(id) {
    Alert.alert(
      "Deseja realmente apagar?",
      "Não poderá reverter esta ação",
      [
        {
          text: "Não",
          onPress: () => console.log(""),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => apagar(id),
        },
      ],
      { cancelable: false }
    );
  }

  async function apagar(_id) {
    await api
      .post("/titulos/apagar", {
        _id,
      })
      .then((response) => {
        if (response.status == 200) {
          helper.flashMessage("Apagado com sucesso", "success");
          getTitulos();
        }
      })
      .catch((error) => {
        helper.flashMessage(
          "Não foi possível apagar\nTente novamente",
          "danger"
        );
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Component HeaderPrincipal - Criar Component */}
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
        {cardPesquisa ? (
          <View
            style={{
              backgroundColor: "#444",
              height: 52,
              marginTop: 24,
              flex: 1,
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
          <>
            {/* img */}
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

            {/* Titulo */}
            <Animated.View
              style={{
                flex: 1,
                width: scrollY.interpolate({
                  inputRange: [0, 120],
                  outputRange: [230, 90],
                  extrapolate: "clamp",
                }),
                height: 50,
              }}
              resizeMode="contain"
            >
              <Text
                style={{
                  left: 30,
                  alignSelf: "center",
                  justifyContent: "center",
                  color: "#F3F3F3",
                  fontFamily: "Chewy",
                  marginTop: 7,
                  fontSize: 35,
                }}
              >
                Títulos
              </Text>
            </Animated.View>

            <Animated.View style={{ flexDirection: "row", left: 15 }}>
              {/* Pesquisa */}
              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => setCardPesquisa(true)}
              >
                <Icon
                  name={"search"}
                  size={25}
                  color={"#aaaaaa"}
                  style={styles.iconPesquisa}
                />
              </TouchableOpacity>

              {/* Sair */}
              <TouchableOpacity
                style={{ paddingStart: 10 }}
                onPress={() => {
                  Alert.alert(
                    "Deseja realmente sair?",
                    "",
                    [
                      {
                        text: "Não",
                        onPress: () => console.log(""),
                        style: "cancel",
                      },
                      {
                        text: "Sim",
                        onPress: () => {
                          AsyncStorage.removeItem("idUsuario");
                          navigation.navigate("Loading");
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Image source={iconSair} style={styles.iconSair} />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Animated.View>

      {loading ? (
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Spinner color="#F3F3F3" />
          <Text style={styles.textLoading}>Carregando</Text>
        </View>
      ) : (
        <>
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
              <CardTitulos
                key={item._id}
                titulo={item}
                apagar={() => alertApagar(item._id)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getTitulos} />
            }
            ListEmptyComponent={
              <View style={styles.container}>
                <Text style={styles.textLoading}>Nenhum título encontrado</Text>
              </View>
            }
            onScrollEndDrag={(y) => {
              //console.log(y.nativeEvent.targetContentOffset.y);
              //pega a altura da lista
              var _alturaLista = y.nativeEvent.targetContentOffset.y;
              setAlturaLista(_alturaLista);
            }}
            //          ItemSeparatorComponent={() => <Separator />}
          />
          {visibleAdc ? (
            <ActionButton
              buttonColor="#56565690"
              onPress={() => navigation.navigate("DetalheTitulo")}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

//const Separator = () => (  <View style={{ flex: 1, height: 1, backgroundColor: "#DDD" }} /> );

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
  iconSair: {
    marginTop: 5,
    height: 30,
    width: 30,
    marginEnd: 15,
    alignSelf: "flex-end",
  },
});
