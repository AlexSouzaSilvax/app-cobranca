import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import { Spinner } from "native-base";
import Header from "../components/Header";
import InputComponent from "../components/Input";

//import DatePicker from "react-native-datepicker";
import { api, helper } from "../api";

const { width } = Dimensions.get("screen");

import iconCash from "../../assets/iconCash.png";
import iconDescricao from "../../assets/iconDescricao.png";
import iconDate from "../../assets/iconDate.png";

export default function DetalheTitulo({ navigation }) {
  const [loading, setLoading] = useState(false);
  const t = navigation.getParam("titulo");

  const [_id, setId] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataVenc, setDataVenc] = useState();
  const [status, setStatus] = useState();

  {
    /*
  const [sttsR, setSttsR] = useState(false);
  const [corSttsR, setCorSttsR] = useState("#484848");

  const [sttsP, setSttsP] = useState(false);
  const [corSttsP, setCorSttsP] = useState("#484848");

  const [sttsA, setSttsA] = useState(false);
  const [corSttsA, setCorSttsA] = useState("#484848");
*/
  }

  const [novo, setNovo] = useState(false);

  useEffect(() => {
    if (!t) {
      setNovo(true);
    } else {
      setId(t._id);
      setDescricao(t.descricao);
      setValor(t.valor);
      setDataVenc(t.dataVenc);
      setStatus(t.status);
    }
    /*if (status == "Recebido") {
      setSttsR(true);
      setCorSttsR("#F3F3F3");
    } else if (status == "Pendente") {
      setSttsP(true);
      setCorSttsP("#F3F3F3");
    } else {
      setSttsA(true);
      setCorSttsA("#F3F3F3");
    }*/
  }, []);
  /*
  function verificaSttsR() {
    if (sttsR) {
      setSttsR(false);
      setCorSttsR("#484848");

      setSttsA(false);
      setCorSttsA("#484848");

      setSttsP(false);
      setCorSttsP("#484848");
    } else {
      setStatus("Recebido");
      setSttsR(true);
      setCorSttsR("#F3F3F3");

      setSttsA(false);
      setCorSttsA("#484848");

      setSttsP(false);
      setCorSttsP("#484848");
    }
  }

  function verificaSttsP() {
    if (sttsP) {
      setSttsP(false);
      setCorSttsP("#484848");

      setSttsR(false);
      setCorSttsR("#484848");

      setSttsA(false);
      setCorSttsA("#484848");
    } else {
      setStatus("Pendente");
      setSttsP(true);
      setCorSttsP("#F3F3F3");

      setSttsR(false);
      setCorSttsR("#484848");

      setSttsA(false);
      setCorSttsA("#484848");
    }
  }

  function verificaSttsA() {
    if (sttsA) {
      setSttsA(false);
      setCorSttsA("#484848");

      setSttsR(false);
      setCorSttsR("#484848");

      setSttsP(false);
      setCorSttsP("#484848");
    } else {
      setStatus("Atrasado");
      setSttsA(true);
      setCorSttsA("#F3F3F3");

      setSttsR(false);
      setCorSttsR("#484848");

      setSttsP(false);
      setCorSttsP("#484848");
    }
  }
*/
  async function salvar() {
    await helper.getItem("idUsuario").then(id => {
      api
        .post("/titulos/atualizar", {
          _id,
          descricao,
          valor,
          dataVenc,
          status,
          usuario: id
        })
        .then(response => {
          if (response.status == 200) {
            Alert.alert("Salvo com sucesso.");
            navigation.navigate("Principal");
          } else {
            Alert.alert("Falha ao salvar.");
          }
        })
        .catch(error => {
          Alert.alert(`Serviço indisponível`);
        });
    });
  }

  async function apagar() {
    await api
      .post("/titulos/apagar", {
        _id
      })
      .then(response => {
        if (response.status == 200) {
          Alert.alert("Apagado com sucesso.");
          navigation.navigate("Principal");
        } else {
          Alert.alert("Falha ao apagar.");
        }
      })
      .catch(error => {
        Alert.alert(`Serviço indisponível`);
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
            titulo={descricao ? descricao : "Novo Título"}
            tamanhoTitulo={25}
            voltar={"Principal"}
            salvar
            onPressSalvar={salvar}
            apagar
            onPressApagar={apagar}
            data={t}
          />
        )}

        <View style={styles.cardTitulo}>
          <Text style={styles.textFix}>Descrição</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconDescricao}
              valor={descricao}
              onChangeText={d => setDescricao(d)}
              autoCorrect={false}
              //placeholder={"Bixcoito"}
              //placeholderTextColor={"#aaa"}
            />
          </View>
          <Text style={styles.textFix}>Valor</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconCash}
              valor={valor}
              onChangeText={v => setValor(v)}
              autoCorrect={false}
              //placeholder={"R$ 10,00"}
              //placeholderTextColor={"#aaa"}
            />
          </View>
          <Text style={styles.textFix}>Data de Vencimento</Text>
          <View style={styles.widthInput}>
            <InputComponent
              icon={iconDate}
              valor={dataVenc}
              onChangeText={d => setDataVenc(d)}
              autoCorrect={false}
              //placeholder={"Ex: 24/01/2020"}
              //placeholderTextColor={"#aaa"}
            />
          </View>
          {/*<DatePicker
            style={{ width: 200 }}
            date={dataVenc} //initial date from state
            mode="date"
            format="DD/MM/YYYY"
            minDate="01/01/2010"
            maxDate="01/01/2030"
            onDateChange={date => {
              setDataVenc(date);
            }}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
          />*/}
          {/*         
           <Text style={styles.textFix}>Status</Text>  
                  <View style={styles.viewStatus}>
            <TouchableOpacity
              style={{ flex: 1, padding: 10 }}
              onPress={verificaSttsR}
            >
              <View
                style={[
                  styles.cardStatus,
                  { backgroundColor: "#77dd77", borderColor: corSttsR }
                ]}
              >
                <Text style={[styles.textStatus, { color: corSttsR }]}>
                  Recebido
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={verificaSttsP}
            >
              <View
                style={[
                  styles.cardStatus,
                  { backgroundColor: "#eead2d", borderColor: corSttsP }
                ]}
              >
                <Text style={[styles.textStatus, { color: corSttsP }]}>
                  Pendente
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={verificaSttsA}
            >
              <View
                style={[
                  styles.cardStatus,
                  { backgroundColor: "#ff6961", borderColor: corSttsA }
                ]}
              >
                <Text style={[styles.textStatus, { color: corSttsA }]}>
                  Atrasado
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#444"
  },
  cardTitulo: {
    width: width - 10,
    marginTop: 25,
    borderRadius: 2,
    backgroundColor: "#303030",
    alignSelf: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontSize: 18,
    fontFamily: "Chewy",
    color: "#aaaaaa",
    marginBottom: 8
  },
  input: {
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    paddingTop: 8
  },
  button: {
    marginTop: 15,
    height: 50,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#F3F3F3",
    fontFamily: "Chewy",
    fontSize: 28
  },
  cardInput: {
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    height: 44,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  textFix: {
    alignSelf: "center",
    paddingTop: 5,
    fontSize: 25,
    fontFamily: "Chewy",
    color: "#565656"
  },
  viewStatus: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  cardStatus: {
    borderWidth: 2,
    borderRadius: 25
  },
  textStatus: {
    margin: 10,
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Chewy"
  },
  widthInput: {
    //width: width - 20,
    justifyContent: "center",
    alignSelf: "center"
  }
});
