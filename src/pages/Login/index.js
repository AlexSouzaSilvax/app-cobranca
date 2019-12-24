import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    AsyncStorage,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import logo from '../../../assets/dolar.png';

import * as Font from 'expo-font';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../../assets/fonts/chewy/Chewy.ttf")
            });

            setLoading(false);
        };

        fetchFont();

    }, []);


    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.textLoading}>Carregando...</Text>
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >

                <Image source={logo} style={styles.logo} />
                <Text style={styles.titulo}>Cobrança</Text>

                <View style={styles.form}>

                    <Text style={[styles.label, { paddingTop: 15 }]}>EMAIL</Text>
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

                    <TouchableOpacity style={styles.button} onPress={validacaoLogin}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>
        );
    }

    async function validacaoLogin() {

        ToastAndroid.showWithGravityAndOffset(
            `${email}\n${senha}`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );

        /*
        if (email == null || senha == null || email == '' || senha == '') {

            ToastAndroid.showWithGravityAndOffset(
                'Login/Senha é obrigatório.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );

        } else {
            setLoading(true);

            await axios.get(url + 'usuarios/' + email + '/' + senha)
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                    console.log('Json login Carregado.');

                    console.log('Tamanho da resposta: ' + data.length);

                    for (let i = 0; i < data.length; i++) {

                        if (email == data[i].email && senha == data[i].senha) {

                            AsyncStorage.setItem('userToken', 'abc');
                            navigation.navigate('Home');

                            console.log('Usuário válido. Login: ' + email);

                            ToastAndroid.showWithGravityAndOffset(
                                'Seja bem-vindo: ' + email,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );

                            setLoading(false);

                        } else {
                            ToastAndroid.showWithGravityAndOffset(
                                'Usuário inválido.\nTente novamente',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }

                    }
                    console.log('Acabou o método.');
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert(`Base Offline.`);
                });
        }
    */}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        marginTop: 24,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Chewy',
        color: '#F3F3F3',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#363636',
        backgroundColor: '#363636',
        paddingHorizontal: 20,
        fontFamily: 'Chewy',
        fontSize: 17,
        color: '#F3F3F3',
        height: 44,
        marginBottom: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    button: {
        marginTop: 15,
        height: 45,
        backgroundColor: '#303030',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#F3F3F3',
        fontFamily: 'Chewy',
        fontSize: 25
    },
    logo: {
        marginTop: 40,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        paddingTop: 10,
        fontSize: 50,
        height: 75,
        fontFamily: 'Chewy',
        color: '#F3F3F3'
    },
    textLoading: {
        fontSize: 20,
        fontFamily: 'Chewy',
        color: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center'
    }
});