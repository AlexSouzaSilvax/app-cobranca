import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Root } from "native-base";
import Routes from "./src/routes";
import { AppLoading } from "expo";
import { StatusBar } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFont() {
      await Font.loadAsync({
        Chewy: require("./assets/fonts/Chewy.ttf"),
      });
      setLoading(false);
    }

    fetchFont();
  });

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <Root>
        <Routes />
        <StatusBar barStyle="light-content" />
      </Root>
    );
  }
}
