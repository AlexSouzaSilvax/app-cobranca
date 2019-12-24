import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, AsyncStorage, Alert, Text, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import axios from 'axios';
import { url, sleep } from '../api';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('alex@gmail.com');
    const [senha, setSenha] = useState('123');
    const [btnLoading, setBtnLoading] = useState(false);
    const [textBtnLogar, setTextBtnLogar] = useState('Acessar');

    useEffect(() => {
        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../assets/fonts/chewy/Chewy.ttf")
            });
            setLoading(false);
        };

        fetchFont();
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <Spinner color='#F3F3F3' />
                <Text style={styles.textLoading}>Carregando...</Text>
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                {/*<Image source={logo} style={styles.logo} />*/}
                <Text style={styles.titulo}>Cobrança</Text>

                <View style={styles.form}>

                    <Text style={[styles.label, { paddingTop: 30 }]}>EMAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu e-mail"
                        placeholderTextColor="#565656"
                        keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
                        autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
                        autoCorrect={false} //não permitir fazer correção do texto      
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <Text style={styles.label}>SENHA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sua senha"
                        placeholderTextColor="#565656"
                        autoCorrect={false} //não permitir fazer correção do texto
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(senha) => setSenha(senha)}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => validacaoLogin()}>
                        {btnLoading ?
                            <Spinner color='#F3F3F3' />
                            :
                            <Text style={styles.buttonText}>{textBtnLogar}</Text>
                        }
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>
        );
    }

    async function validacaoLogin() {

        setBtnLoading(true);

        if (email == null || senha == null || email.trim() == '' || senha.trim() == '') {

            setBtnLoading(false);

            ToastAndroid.showWithGravityAndOffset(
                'Login/Senha é obrigatório.',
                ToastAndroid.LONG,
                ToastAndroid.INFERIOR,
                25,
                50 ,
            );

        } else {

            setBtnLoading(true);

            await axios.get(`${url}titulos/api/validaAcesso/email=${email}/senha=${senha}`)
                .then((response) => {
                    console.log(response.data)
                    setData(response.data);
                    setBtnLoading(false);
                    console.log('Json login Carregado.');

                    console.log('Tamanho da resposta: ' + data.length);

                    for (let i = 0; i < data.length; i++) {

                        if (email == data[i].email && senha == data[i].senha) {

                            navigation.navigate('Principal');

                            console.log('Usuário válido. Login: ' + email);

                            ToastAndroid.showWithGravityAndOffset(
                                'Seja bem-vindo',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                            setBtnLoading(false);
                        } else if (!email == data[i].email && !senha == data[i].senha) {
                            ToastAndroid.showWithGravityAndOffset(
                                'Usuário inválido.',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                            setBtnLoading(false);
                        }
                    }
                    console.log('Acabou o método.');
                })
                .catch((error) => {
                    setBtnLoading(false);
                    setTextBtnLogar('Serviço indisponível');
                });
        }
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        alignItems: 'center',
        justifyContent: 'center'
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
        borderWidth: 1,
        borderColor: '#363636',
        backgroundColor: '#363636',
        paddingHorizontal: 20,
        fontFamily: 'Chewy',
        fontSize: 23,
        color: '#F3F3F3',
        height: 44,
        marginBottom: 20,
        borderRadius: 5
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
    logo: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        paddingTop: 15,
        fontSize: 58,
        height: 75,
        fontFamily: 'Chewy',
        color: '#F3F3F3'
    },
    textLoading: {
        paddingTop: 15,
        fontSize: 20,
        fontFamily: 'Chewy',
        color: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center'
    }
});