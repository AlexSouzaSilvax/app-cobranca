import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import CardTitulos from '../components/CardTitulos';

export default function Principal({ navigation }) {

    const [titulos] = useState([
        {
            id: '0', tela: 'DetalheTitulo', dataVencimento: '24/12/2022', descricao: 'Casa do Alex', status: 'Recebido', valor: '980'
        },
        {
            id: '1', tela: 'DetalheTitulo', dataVencimento: '12/12/2020', descricao: 'Mansão Comendador Soares', status: 'Pendente', valor: '949.90'
        },
        {
            id: '2', tela: 'DetalheTitulo', dataVencimento: '19/05/2019',  descricao: 'Sítio da Paz', status: 'Atrasado', valor: '150'
        },
        {
            id: '3', tela: 'DetalheTitulo', dataVencimento: '03/03/2018',  descricao: 'Sala 101', status: 'Recebido', valor: '3600'
        }
    ]);

    return (
        <View style={styles.container}>

            <Header titulo={"Títulos"} tamanhoTitulo={28} user sair />

            <FlatList
                style={styles.viewCardTitulos}
                data={titulos}
                keyExtractor={(t) => t.id}
                renderItem={({ item }) =>
                    <CardTitulos titulo={item} />
                }
            />

            {/*<ActionButton buttonColor="#565656" onPress={() => navigation.navigate('DetalheTitulo')} />*/}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        paddingTop: 10
    },
    viewCardTitulos: {
        marginTop: 15
    }
});