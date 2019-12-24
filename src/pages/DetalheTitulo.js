import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Alert, Image, Text, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import axios from 'axios';
import { url, sleep } from '../api';

import logo from '../../assets/icon.png';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [textBtnLogar, setTextBtnLogar] = useState('Acessar');

    useEffect(() => {
        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../assets/fonts/Chewy.ttf")
            });            
        };

        fetchFont();
        setLoading(false);
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
           <View style={styles.container}>
               <Text style={styles.textLoading}>Tela DetalheTitulo</Text>
               <Button title={'Voltar'} onPress={() => navigation.navigate('Principal')}/>
           </View>
        );
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