import axios from "axios";
import { AsyncStorage } from "react-native";

export const api = axios.create({
  baseURL: "https://alex-api-cobranca.herokuapp.com"
});

export function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

export const helper = {
  async setItem(key, value) {
    try {
      console.log(value);
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key).then(val => {
        return val;
      });
      return value;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async removeItem(key) {
    return await AsyncStorage.removeItem(key);
  },
  async clear() {
    return await AsyncStorage.clear();
  },
  formatData(data) {
    if (data) {
      data = data.replace(/-/g, "/").substr(0, 10);
      return data;
    }
    return "Não informado";
  },
  numberToReal(n) {
    return (
      "R$ " +
      n
        //.toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
    );
  }
};
