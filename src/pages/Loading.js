import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated, StatusBar, BackHandler } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Logo from "../../assets/icon.png";
import { helper } from '../api';

const switchToAuth = () => {
  Actions.replace('auth')
};

export default function Loading({ navigation }) {
  const [logoAnime, setLogoAnime] = useState(new Animated.Value(0));
  const [logoText, setLogoText] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 4000,//1000,
      }).start(),
      Animated.timing(logoText, {
        toValue: 1,
        duration: 1500,//1200,
      }),
    ]).start(() => {
      //quando acabar animacao
      verificaUsuarioLogado();
      setTimeout(switchToAuth, 1500);
    });
  }, []);

  async function verificaUsuarioLogado() {
    await helper.getItem("idUsuario").then(idUsuario => {
      if (idUsuario) {
        navigation.navigate("Principal");
      } else {
        navigation.navigate("Login");
      }
    });
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Loading");
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={{
          opacity: logoAnime,
          top: logoAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [80, 0],
          }),
        }}>
        <Image source={Logo} style={styles.logo} />
      </Animated.View>
      <Animated.View style={{ opacity: logoText }}>
        <Text style={styles.logoText}> Cobrança </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#F3F3F3',
    fontSize: 58,
    marginTop: 10,
    fontWeight: '500',
    fontFamily: "Chewy",
  },
  logo: {
    marginTop: -150,
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "cover",
  },
});