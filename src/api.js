import axios from "axios";
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

export const api = axios.create({
  baseURL: "https://alex-api-cobranca.herokuapp.com",
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
      const value = await AsyncStorage.getItem(key).then((val) => {
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
    return "";
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
  },
  flashMessage(message, type) {
    Toast.show({
      text: message,
      buttonText: "Ok",
      position: "top",
      type: type === "info" ? "warning" : type,
      duration: 2000,
      textStyle: {
        color: "#F3F3F3",
        fontSize: 17,
      },
      buttonTextStyle: {
        color: "#F3F3F3",
        fontWeight: "600",
        fontSize: 17,
      },
      buttonStyle: {},
      style: {
        margin: 5,
        borderRadius: 8,
        borderColor: "#e6e6e680",
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
      },
    });
  },
  getDataHoje() {
    var date = new Date();
    var dia = date.getDate();
    var mes = `${date.getMonth() + 1}`;
    var ano = date.getFullYear();

    if (dia.length == 1) {
      dia = `0${dia}`;
    }

    if (mes.length == 1) {
      mes = `0${mes}`;
    }

    //var hoje = `${ano}-${mes}-${dia}`;
    var hoje = `${dia}/${mes}/${ano}`;

    return hoje;
  },
  formatData2(date) {
    var dia = `${date.getDate()}`;
    var mes = `${date.getMonth() + 1}`;
    var ano = `${date.getFullYear()}`;

    if (dia.length == 1) {
      dia = `0${dia}`;
    }

    if (mes.length == 1) {
      mes = `0${mes}`;
    }
    return `${dia}/${mes}/${ano}`;
  },
};
