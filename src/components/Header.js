import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import iconVoltar from '../../assets/iconVoltar.png';

function Header({ navigation, titulo, voltar, limparTela }) {

    const [t, setT] = useState(titulo);
    const [v, setV] = useState(voltar);
    const [l] = useState(limparTela);

    useEffect(() => {
        if (!t) {
            setT('Cobrança');
        }
    });

    return (
        <View style={styles.header}>

            {v ?
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
                        <Image source={iconVoltar} style={styles.iconVoltar} />
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
                    <TouchableOpacity onPress={limparTela}>
                        <Image source={iconVoltar} style={styles.iconVoltar} />
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flex: 1 }}></View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#444444',
        height: 42,
        marginTop: 24
    },
    titulo: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 22,
        color: '#F3F3F3',
        fontWeight: 'bold',    
        marginTop: 5

    },
    iconVoltar: {
        height: 22,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    iconLimparTela: {
        height: 22,
        width: 22,
        marginTop: 10,
        margin: 5,
        alignSelf: 'flex-end',
    }
});

export default withNavigation(Header);