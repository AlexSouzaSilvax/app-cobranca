import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Alert, Image, Text, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import axios from 'axios';
import { url, sleep } from '../api';
import Header from '../components/Header';
import logo from '../../assets/icon.png';

export default function Login({ navigation, titulo }) {

    const [loading, setLoading] = useState(false);
    const t = navigation.getParam('titulo');

    /*useEffect(() => {
        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../assets/fonts/Chewy.ttf")
            });            
        };

        fetchFont();
        setLoading(false);
    });*/

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

                <Header titulo={t.descricao} voltar={() => navigation.navigate('Principal')} />

                <Text style={styles.textLoading}>{t.descricao}</Text>
                <Button title={'Voltar'} onPress={() => navigation.navigate('Principal')} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#444444'
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