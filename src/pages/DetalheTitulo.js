import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import { Spinner } from "native-base";
import DatePicker from "react-native-datepicker";

import Header from "../components/Header";
import InputComponent from "../components/Input";

import iconCash from "../../assets/iconCash.png";
import iconDescricao from "../../assets/iconDescricao.png";

import { api, helper } from "../api";
import DataFiltro from "../components/DataFiltro";
const { width } = Dimensions.get("screen");

export default function DetalheTitulo({ navigation }) {
  const [loading, setLoading] = useState(false);
  const t = navigation.getParam("titulo");

  const [_id, setId] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();

  const [dataVenc, setDataVenc] = useState();
  const [modalDataVenc, setModalDataVenc] = useState();

  const [status, setStatus] = useState();

  useEffect(() => {
    if (t) {
      setId(t._id);
      setDescricao(t.descricao);
      setValor(t.valor);
      setDataVenc(t.dataVenc);
      setStatus(t.status);
    }
  }, []);

  async function salvar() {
    await helper.getItem("idUsuario").then((id) => {
      api
        .post("/titulos/atualizar", {
          _id,
          descricao,
          valor,
          dataVenc: dataVenc,
          status,
          usuario: id,
        })
        .then((response) => {
          if (response.status == 200) {
            helper.flashMessage("Salvo com sucesso", "success");
            navigation.navigate("Principal");
          }
        })
        .catch((error) => {
          helper.flashMessage(
            "Não foi possível salvar\nTente novamente",
            "danger"
          );
        });
    });
  }

  function alertApagar() {
    Alert.alert(
      "Deseja realmente apagar?",
      "Não poderá reverter esta ação",
      [
        {
          text: "Não",
          onPress: () => console.log(""),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => apagar(),
        },
      ],
      { cancelable: false }
    );
  }

  async function apagar() {
    await api
      .post("/titulos/apagar", {
        _id,
      })
      .then((response) => {
        if (response.status == 200) {
          helper.flashMessage("Apagado com sucesso", "success");
          navigation.navigate("Principal");
        }
      })
      .catch((error) => {
        helper.flashMessage(
          "Não foi possível apagar\nTente novamente",
          "danger"
        );
      });
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner color="#F3F3F3" />
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {!t ? (
          <Header
            titulo={descricao ? descricao : "Novo Título"}
            tamanhoTitulo={25}
            voltar={"Principal"}
            salvar
            onPressSalvar={salvar}
          />
        ) : (
          <Header
            titulo={t.descricao}
            styleTitulo={{
              left: 25
            }}
            tamanhoTitulo={25}
            voltar={"Principal"}
            salvar
            onPressSalvar={salvar}
            apagar
            onPressApagar={alertApagar}
            data={t}
          />
        )}

        <View style={styles.cardTitulo}>
          <Text style={styles.textFix}>Descrição</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconDescricao}
              valor={descricao}
              onChangeText={(d) => setDescricao(d)}
              autoCorrect={false}
              placeholder={"Ex: Aluguel"}
              placeholderTextColor={"#aaa"}
            />
          </View>
          <Text style={styles.textFix}>Valor</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconCash}
              valor={valor}
              onChangeText={(v) => setValor(helper.numberToRealInput(v))}
              placeholder={"Ex: R$ 100"}
              keyboardType="number-pad"
              placeholderTextColor={"#aaa"}
            />
          </View>
          <Text style={styles.textFix}>Data de Vencimento</Text>
          {/* Data Vencimento */}
          <DataFiltro
            dataVisible={modalDataVenc}
            data={helper.formatData(dataVenc)}
            titulo={"Data de Vencimento"}
            onChangeData={(e) => {
              setModalDataVenc(false);
              console.log(helper.formatData2(e));
              setDataVenc(helper.formatData2(e));
              setModalDataVenc(false);
            }}
            setDataVisible={() => setModalDataVenc(!modalDataVenc)}
            showDatePicker={() => setModalDataVenc(!modalDataVenc)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444",
  },
  cardTitulo: {
    width: width - 10,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: "#303030",
    alignSelf: "center",
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: "Chewy",
    color: "#aaaaaa",
    marginBottom: 8,
  },
  input: {
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    paddingTop: 8,
  },
  button: {
    marginTop: 15,
    height: 50,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#F3F3F3",
    fontFamily: "Chewy",
    fontSize: 28,
  },
  cardInput: {
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    height: 44,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textFix: {
    alignSelf: "center",
    paddingTop: 5,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#565656",
  },
  viewStatus: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  cardStatus: {
    borderWidth: 2,
    borderRadius: 25,
  },
  textStatus: {
    margin: 10,
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Chewy",
  },
  widthInput: {
    //width: width - 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});
