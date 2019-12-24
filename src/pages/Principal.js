import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import CardTitulos from '../components/CardTitulos';

export default function Principal({ navigation }) {

    const [titulos] = useState([
        {
            id: '0', tela: 'DetalheTitulo', descricao: 'Calculo Progressão Aritmética', valor: '122'
        },
        {
            id: '1', tela: 'DetalheTitulo', descricao: 'Calculo Progressão Geométrica', valor: '35.22'
        },
        {
            id: '2', tela: 'DetalheTitulo', descricao: 'Calculo I', valor: '150'
        },
        {
            id: '3', tela: 'DetalheTitulo', descricao: 'Calculo II', valor: '299'
        }
    ]);

    return (
        <View style={styles.container}>

            <Header user sair />

            <FlatList
                style={styles.viewCardTitulos}
                data={titulos}
                keyExtractor={(t) => t.id}
                renderItem={({ item }) =>
                    <CardTitulos titulo={item} />
                }
            />

            <ActionButton buttonColor="#565656" onPress={() => navigation.navigate('DetalheTitulo')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        paddingTop: 10
    },
    cardCalc: {
        flex: 1
    },
    viewCardTitulos: {
        marginTop: 15
    }
});