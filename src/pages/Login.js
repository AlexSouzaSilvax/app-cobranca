import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, AsyncStorage, Alert, Image, Text, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import axios from 'axios';
import { url, sleep } from '../api';

import logo from '../../assets/icon.png';
import Input from '../components/Input';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [textBtnLogar, setTextBtnLogar] = useState('Acessar');
    
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

                <Image source={logo} style={styles.logo} />
                <Text style={styles.titulo}>Cobrança</Text>

                <View style={styles.form}>

                    <Text style={[styles.label, { paddingTop: 30 }]}>EMAIL</Text>
                    <Input 
                        placeholder="Seu e-mail"
                        placeholderTextColor="#565656"
                        keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
                        autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
                        autoCorrect={false} //não permitir fazer correção do texto      
                        value={email}
                    />

                    <Text style={styles.label}>SENHA</Text>
                    <Input                        
                        placeholder="Sua senha"
                        placeholderTextColor="#565656"
                        autoCorrect={false} //não permitir fazer correção do texto
                        secureTextEntry={true}
                        value={senha}                        
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
        navigation.navigate('Principal');
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
        height: 90,
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