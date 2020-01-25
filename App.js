import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

import Routes from "./src/routes";
import Loading from "./src/components/Loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFont() {
      await Font.loadAsync({
        Chewy: require("./assets/fonts/Chewy.ttf")
      });
      setLoading(false);
    }

    fetchFont();
  });

  if (loading) {
    return <Loading />;
  } else {
    return <Routes />;
  }
}
