import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Spinner, Thumbnail } from "native-base";
import iconUser from "../../assets/user.png";
import iconVoltar from "../../assets/iconVoltar.png";
import iconSalvar from "../../assets/iconSalvar.png";
import iconSair from "../../assets/iconSair.png";
import iconApagar from "../../assets/iconApagar.png";
import iconPesquisa from "../../assets/iconPesquisa.png";
import iconTemaBranco from "../../assets/iconTemaBranco.png";
import iconTemaPreto from "../../assets/iconTemaPreto.png";

import Icon from "react-native-vector-icons/FontAwesome";

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
  tamanhoTitulo,
  pesquisa,
  onPressPesquisa,
  trocaTema,
}) {
  const [t, setT] = useState(titulo);
  const [u] = useState(user);
  const [e] = useState(sair);
  const [v] = useState(voltar);
  const [s] = useState(salvar);
  const [a] = useState(apagar);
  const [loading, setLoading] = useState(false);
  const [p] = useState(pesquisa);
  const [iconTema, setIconTema] = useState(iconTemaPreto);

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
            <TouchableOpacity
              onPress={() => navigation.navigate(user)}
              style={styles.iconUser}
            >
              {/*
                <Image source={iconUser} style={styles.iconUser} /> 
              */}
              <Thumbnail
                small
                source={{
                  uri:
                    "https://pbs.twimg.com/media/DtZj0C3X4AETbeF?format=jpg&name=large",
                }}
              />
            </TouchableOpacity>
        ) : v ? (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(voltar)}>
              <Image source={iconVoltar} style={styles.iconVoltar} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {trocaTema ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                if (iconTema === iconTemaBranco) {
                  setIconTema(iconTemaPreto);
                } else {
                  setIconTema(iconTemaBranco);
                }
                Alert.alert("Em desenvolvimento.");
              }}
            >
              <Image source={iconTema} style={styles.iconTema} />
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}

        <View style={{ flex: 2, paddingTop: 5 }}>
          <Text style={[styles.titulo, { fontSize: tamanhoTitulo }]}>{t}</Text>
        </View>

        {p ? (
          <View>
            <TouchableOpacity onPress={onPressPesquisa}>
              <Icon
                name={"search"}
                size={25}
                color={"#aaaaaa"}
                style={styles.iconPesquisa}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}

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
    marginTop: 24,
  },
  loadTela: {
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#F3F3F3",
    fontFamily: "Chewy",
    marginTop: 3,
  },
  iconUser: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginStart: 10,
    alignSelf: "flex-start",
  },
  iconVoltar: {
    marginTop: 5,
    height: 34,
    width: 34,
    marginStart: 14,
    alignSelf: "flex-start",
  },
  iconTema: {
    marginTop: 5,
    height: 30,
    width: 30,
    marginStart: 14,
    alignSelf: "flex-start",
  },
  iconSalvar: {
    height: 35,
    width: 35,
    marginTop: 5,
    marginEnd: 14,
    alignSelf: "flex-end",
  },
  iconApagar: {
    height: 35,
    width: 35,
    marginTop: 5,
    marginEnd: 8,
    alignSelf: "flex-end",
  },
  iconPesquisa: {
    marginTop: 7,
    marginEnd: 10,
    alignSelf: "flex-end",
  },
  iconSair: {
    marginTop: 5,
    height: 30,
    width: 30,
    marginEnd: 15,
    alignSelf: "flex-end",
  },
  textSair: {
    marginEnd: 12,
    alignSelf: "flex-end",
    color: "red",
    fontSize: 33,
    fontFamily: "Chewy",
    marginTop: 2,
  },
  textSalvar: {
    color: "green",
    fontSize: 40,
    paddingEnd: 14,
    marginTop: -5,
    alignSelf: "flex-end",
    fontFamily: "Chewy",
  },
});

export default withNavigation(Header);
