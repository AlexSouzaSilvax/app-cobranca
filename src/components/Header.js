import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import { Spinner } from "native-base";
import iconUser from "../../assets/user.png";
import iconVoltar from "../../assets/iconVoltar.png";
import iconSalvar from "../../assets/iconSalvar.png";
import iconSair from "../../assets/iconSair.png";
import iconApagar from "../../assets/iconApagar.png";

function Header({
  navigation,
  titulo,
  user,
  sair,
  voltar,
  salvar,
  apagar,
  onPressSalvar,
  onPressApagar,
  tamanhoTitulo
}) {
  const [t, setT] = useState(titulo);
  const [u] = useState(user);
  const [e] = useState(sair);
  const [v] = useState(voltar);
  const [s] = useState(salvar);
  const [a] = useState(apagar);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadTela}>
        <Spinner color="#F3F3F3" />
      </View>
    );
  } else {
    return (
      <View style={styles.header}>
        {u ? (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(user)}>
              <Image source={iconUser} style={styles.iconUser} />
            </TouchableOpacity>
          </View>
        ) : v ? (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(voltar)}>
              <Image source={iconVoltar} style={styles.iconVoltar} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        <View style={{ flex: 2, paddingTop: 5 }}>
          <Text style={[styles.titulo, { fontSize: tamanhoTitulo }]}>{t}</Text>
        </View>

        {a ? (
          <View>
            <TouchableOpacity onPress={onPressApagar}>
              <Image source={iconApagar} style={styles.iconApagar} />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}

        {e ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Deseja realmente sair?",
                  "",
                  [
                    /*{
                      text: "Ask me later",
                      onPress: () => console.log("Ask me later pressed")
                    },*/
                    {
                      text: "Não",
                      onPress: () => console.log(""),
                      style: "cancel"
                    },
                    {
                      text: "Sim",
                      onPress: () => {
                        AsyncStorage.removeItem("idUsuario");
                        navigation.navigate("Login");
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              {/*<Text style={styles.textSair}>X</Text>*/}
              <Image source={iconSair} style={styles.iconSair} />
            </TouchableOpacity>
          </View>
        ) : s ? (
          <View>
            <TouchableOpacity onPress={onPressSalvar}>
              <Image source={iconSalvar} style={styles.iconSalvar} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#444444",
    height: 42,
    marginTop: 24
  },
  loadTela: {
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    alignSelf: "center",
    justifyContent: "center",
    //fontSize: //28,
    color: "#F3F3F3",
    fontFamily: "Chewy",
    marginTop: 3
  },
  iconUser: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginStart: 15,
    alignSelf: "flex-start"
  },
  iconVoltar: {
    marginTop: 5,
    height: 34,
    width: 34,
    marginStart: 14,
    alignSelf: "flex-start"
  },
  iconSalvar: {
    height: 35,
    width: 35,
    marginTop: 5,
    marginEnd: 14,
    alignSelf: "flex-end"
  },
  iconApagar: {
    height: 35,
    width: 35,
    marginTop: 5,
    marginEnd: 8,
    alignSelf: "flex-end"
  },
  iconSair: {
    marginTop: 5,
    height: 30,
    width: 30,
    marginEnd: 15,
    alignSelf: "flex-end"
  },
  textSair: {
    marginEnd: 12,
    alignSelf: "flex-end",
    color: "red",
    fontSize: 33,
    fontFamily: "Chewy",
    marginTop: 2
  },
  textSalvar: {
    color: "green",
    fontSize: 40,
    paddingEnd: 14,
    marginTop: -5,
    alignSelf: "flex-end",
    fontFamily: "Chewy"
  }
});

export default withNavigation(Header);
