import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import iconUser from '../../assets/user.png'

function Header({ navigation, titulo, user, sair }) {

    const [t, setT] = useState(titulo);
    const [v, setV] = useState(user);
    const [l] = useState(sair);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!t) {
            setT('Cobrança');
        }

        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../assets/fonts/chewy/Chewy.ttf")
            });            
        };

        fetchFont();
        setLoading(false);
    });

    if (loading) {
        return (
            <View style={styles.loadTela}>
                <Spinner color='#F3F3F3' />
            </View>
        );
    } else {
        return (
            <View style={styles.header}>

                {v ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <Image source={iconUser} style={styles.iconUser} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1 }}></View>
                }

                <View style={{ flex: 1 }}>
                    <Text style={styles.titulo}>{t}</Text>
                </View>

                {l ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textSair}>X</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1 }}></View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#444444',
        height: 42,
        marginTop: 24
    },
    loadTela: {
        backgroundColor: '#444444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 28,
        color: '#F3F3F3',
        fontFamily: 'Chewy',
        marginTop: 3
    },
    iconUser: {
        height: 32,
        marginTop: 8,
        alignSelf: 'flex-start',
        marginStart: 12
    },
    textSair: {
        marginEnd: 12,
        alignSelf: 'flex-end',
        color: 'red',
        fontSize: 33,
        fontFamily: 'Chewy',
        marginTop: 2
    }
});

export default withNavigation(Header);