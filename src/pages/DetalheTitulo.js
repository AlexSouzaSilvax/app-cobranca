import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import Header from '../components/Header';

import InputComponent from '../components/Input';

import DatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);
    const t = navigation.getParam('titulo');

    const [descricao, setDescricao] = useState(t.descricao);
    const [valor, setValor] = useState(t.valor);
    const [dataVencimento, setDataVencimento] = useState(t.dataVencimento);
    const [status, setStatus] = useState(t.status);

    const [sttsR, setSttsR] = useState(false);
    const [corSttsR, setCorSttsR] = useState('#484848');

    const [sttsP, setSttsP] = useState(false);
    const [corSttsP, setCorSttsP] = useState('#484848');

    const [sttsA, setSttsA] = useState(false);
    const [corSttsA, setCorSttsA] = useState('#484848');

    useEffect(() => {
        if (status == 'Recebido') {
            setSttsR(true);
            setCorSttsR('#F3F3F3');
        } else if (status == 'Pendente') {
            setSttsP(true);
            setCorSttsP('#F3F3F3');
        } else {
            setSttsA(true);
            setCorSttsA('#F3F3F3');
        }
    }, []);

    function verificaSttsR() {

        if (sttsR) {
            setSttsR(false);
            setCorSttsR('#484848');

            setSttsA(false);
            setCorSttsA('#484848');

            setSttsP(false);
            setCorSttsP('#484848');
        } else {
            setSttsR(true);
            setCorSttsR('#F3F3F3');

            setSttsA(false);
            setCorSttsA('#484848');

            setSttsP(false);
            setCorSttsP('#484848');
        }
    }

    function verificaSttsP() {

        if (sttsP) {
            setSttsP(false);
            setCorSttsP('#484848');

            setSttsR(false);
            setCorSttsR('#484848');

            setSttsA(false);
            setCorSttsA('#484848');
        } else {
            setSttsP(true);
            setCorSttsP('#F3F3F3');

            setSttsR(false);
            setCorSttsR('#484848');

            setSttsA(false);
            setCorSttsA('#484848');
        }
    }

    function verificaSttsA() {

        if (sttsA) {
            setSttsA(false);
            setCorSttsA('#484848');

            setSttsR(false);
            setCorSttsR('#484848');

            setSttsP(false);
            setCorSttsP('#484848');
        } else {
            setSttsA(true);
            setCorSttsA('#F3F3F3');

            setSttsR(false);
            setCorSttsR('#484848');

            setSttsP(false);
            setCorSttsP('#484848');
        }
    }

    function quemEstaTrue() {
        console.log(`Quem está true? Recebido: ${sttsR} - Pendente: ${sttsP} - Atrasado: ${sttsA}`);
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Spinner color='#F3F3F3' />
                <Text style={styles.textLoading}>Carregando...</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container} behavior="padding" enabled>

                <Header titulo={t.descricao} voltar salvar data={t} />

                <View style={styles.cardTitulo}>

                    <Text style={styles.textFix}>Descrição</Text>
                    <InputComponent valor={descricao} autoCorrect={false} />

                    <Text style={styles.textFix}>Valor</Text>
                    <InputComponent valor={valor} autoCorrect={false} />

                    <Text style={styles.textFix}>Data de Vencimento</Text>
                    <InputComponent valor={dataVencimento} autoCorrect={false} />

                    <Text style={styles.textFix}>Status</Text>

                    <View style={styles.viewStatus}>

                        <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={verificaSttsR}>
                            <View style={[styles.cardStatus, { backgroundColor: '#77dd77', borderColor: corSttsR }]}>
                                <Text style={[styles.textStatus, { color: corSttsR }]}>Recebido</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={verificaSttsP}>
                            <View style={[styles.cardStatus, { backgroundColor: '#eead2d', borderColor: corSttsP }]}>
                                <Text style={[styles.textStatus, { color: corSttsP }]}>Pendente</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={verificaSttsA}>
                            <View style={[styles.cardStatus, { backgroundColor: '#ff6961', borderColor: corSttsA }]}>
                                <Text style={[styles.textStatus, { color: corSttsA }]}>Atrasado</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

                {/*
                <TouchableOpacity style={{ margin: 10 }} onPress={quemEstaTrue}>
                    <Text style={{ fontSize: 40, color: '#F3F3F3', alignSelf: 'center' }}>Quem está TRUE ?</Text>
                </TouchableOpacity>
               */}

            </View >
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#444'
    },
    cardTitulo: {
        width: width - 20,
        height: height - 250,
        marginTop: 20,
        margin: 5,
        borderRadius: 2,
        backgroundColor: '#303030',
        alignSelf: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontSize: 18,
        fontFamily: 'Chewy',
        color: '#aaaaaa',
        marginBottom: 8,
    },
    input: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Chewy',
        fontSize: 23,
        color: '#F3F3F3',
        paddingTop: 8
    },
    button: {
        marginTop: 15,
        height: 50,
        backgroundColor: '#303030',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#F3F3F3',
        fontFamily: 'Chewy',
        fontSize: 28
    },
    cardInput: {
        backgroundColor: '#363636',
        paddingHorizontal: 20,
        height: 44,
        margin: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    textFix: {
        alignSelf: 'center',
        paddingTop: 20,
        fontSize: 25,
        fontFamily: 'Chewy',
        color: '#565656'
    },
    viewStatus: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    cardStatus: {
        borderWidth: 2,
        borderRadius: 25
    },
    textStatus: {
        margin: 10,
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Chewy'
    }
});
