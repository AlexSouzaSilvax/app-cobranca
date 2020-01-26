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
      // 01012020
      data = data.replace(" ", "");
      data = data.replace(".", "");
      data = data.replace(",", "");
      data = data.replace("-", "");
      data = data.replace("/", "");
      var dia = data.substr(0, 2);
      var mes = data.substr(2, 2);
      var ano = data.substr(4, 4);

      data = `${dia}/${mes}/${ano}`;

      return data;
    } else {
      return "-";
    }
  },
  formatDataInput(data) {
    //03/03/2020
    data = data.replace(" ", "");
    data = data.replace(".", "");
    data = data.replace(",", "");
    data = data.replace("-", "");
    data = data.replace("/", "");
    //03032001

    if (data.length === 8) {
      var dia = data.substr(0, 2);
      var mes = data.substr(2, 2);
      var ano = data.substr(4, 4);
      return `${dia}/${mes}/${ano}`;
    } else {
      return data;
    }
  },
  numberToReal(n) {
    if (n) {
      n = parseFloat(n).toFixed(2);
      n = n.replace(".", ",");
      n = n.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
      return `R$ ${n}`;
    } else {
      return "-";
    }
  },
  numberToRealInput(n) {
    n = n.replace(/\D/g, "");
    n = (n / 100).toFixed(2) + "";
    n = n.replace(".", ",");
    n = n.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    n = n.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return n;
  }
};
