import axios from "axios";

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
