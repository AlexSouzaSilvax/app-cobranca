import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  View,
  FlatList,
  StyleSheet,
  Platform,
  Text
} from "react-native";
import { Spinner } from "native-base";
import ActionButton from "react-native-action-button";
import Header from "../components/Header";
import CardTitulos from "../components/CardTitulos";
import { api } from "../api";

export default function Principal({ navigation }) {
  const [titulos, setTitulos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTitulos() {
    await api.get("/titulos").then(response => {
      // console.log(response.data);
      setTitulos(response.data);
      setLoading(false);
      //console.log("ja foi carai");
    });
  }

  useEffect(() => {
    getTitulos();
  }, []);

  return (
    <View style={styles.container}>
      <Header titulo={"Títulos"} tamanhoTitulo={28} user sair />

      {loading ? (
        <View style={styles.container}>
          <Spinner color="#F3F3F3" />
          <Text style={styles.textLoading}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.viewCardTitulos}
          data={titulos}
          keyExtractor={t => t._id}
          renderItem={({ item }) => (
            <CardTitulos key={item._id} titulo={item} />
          )}
          //refreshControl={<RefreshControl getTitulos />}
        />
      )}

      <ActionButton
        buttonColor="#565656"
        onPress={() =>
          navigation.navigate("DetalheTitulo", { titulo: titulos })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    paddingTop: 10
  },
  viewCardTitulos: {
    marginTop: 15
  },
  textLoading: {
    fontSize: 20,
    color: "#F3F3F3",
    alignSelf: "center",
    justifyContent: "center"
  }
});
