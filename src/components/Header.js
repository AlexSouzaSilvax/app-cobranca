import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import iconUser from '../../assets/user.png'
import iconVoltar from '../../assets/iconVoltar.png'

function Header({ navigation, titulo, user, sair, voltar, salvar }) {

    const [t, setT] = useState(titulo);
    const [u] = useState(user);
    const [e] = useState(sair);
    const [v] = useState(voltar);
    const [s] = useState(salvar);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={styles.loadTela}>
                <Spinner color='#F3F3F3' />
            </View>
        );
    } else {
        return (
            <View style={styles.header}>

                {u ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <Image source={iconUser} style={styles.iconUser} />
                        </TouchableOpacity>
                    </View>
                    : v ?
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
                                <Image source={iconVoltar} style={styles.iconVoltar} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flex: 1 }} />
                }

                <View style={{ flex: 2 }}>
                    <Text style={styles.titulo}>{t}</Text>
                </View>

                {e ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textSair}>X</Text>
                        </TouchableOpacity>
                    </View>
                    : s ?
                        <View>
                            <TouchableOpacity onPress={() => Alert.alert('Salvo com sucesso.')}>
                                <Text style={styles.textSalvar}>V</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flex: 1 }} />
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
    iconVoltar: {
        height: 30,
        marginTop: 5,
        alignSelf: 'flex-start'        
    },
    textSair: {
        marginEnd: 12,
        alignSelf: 'flex-end',
        color: 'red',
        fontSize: 33,
        fontFamily: 'Chewy',
        marginTop: 2
    },
    textSalvar: {
        color: 'green',
        fontSize: 40,
        paddingEnd: 14,
        marginTop: -5,
        alignSelf: 'flex-end',                
        fontFamily: 'Chewy',        
    }
});

export default withNavigation(Header);