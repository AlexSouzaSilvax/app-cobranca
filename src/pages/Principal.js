import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
//import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import CardTitulos from '../components/CardTitulos';

export default function Principal({ navigation }) {

    const [titulos] = useState([
        {
            id: '0', tela: 'DetalheTitulo', dataVencimento: '24/12/2020', descricao: 'Apartamento 101', status: 'Recebido', valor: '980'
        },
        {
            id: '1', tela: 'DetalheTitulo', dataVencimento: '12/12/2022', descricao: 'Mansão Conde De Bonfim', status: 'Pendente', valor: '949.90'
        },
        {
            id: '2', tela: 'DetalheTitulo', dataVencimento: '19/05/2019',  descricao: 'Sítio da Paz', status: 'Pendente', valor: '150'
        },
        {
            id: '3', tela: 'DetalheTitulo', dataVencimento: '03/03/20218',  descricao: 'Apartamento 103', status: 'Recebido', valor: '3600'
        }
    ]);

    return (
        <View style={styles.container}>

            <Header titulo={"Títulos"} user sair />

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
    cardCalc: {
        flex: 1
    },
    viewCardTitulos: {
        marginTop: 15
    }
});