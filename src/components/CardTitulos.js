import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Card, CardItem, Text, Left, Body, Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';// para usar a navegacao de routes por components

function CardTitulos({ navigation, titulo }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFont() {
            await Font.loadAsync({
                Chewy: require("../../assets/fonts/Chewy.ttf"),
                Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
            });
        };

        fetchFont();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Spinner size="large" color={'#F3F3F3'} />
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(titulo.tela)}>
                <View style={styles.card}>

                </View>
                {/*<Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Chewy', color: '#F3F3F3' }}>{titulo.descricao}</Text>
                                    <Text note>{titulo.valor}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    */}
            </TouchableOpacity>
        );
    }
}

export default withNavigation(CardTitulos);

const styles = StyleSheet.create({
    card: {
        width: 400,
        height: 200,
        margin: 5,
        borderRadius: 12,
        backgroundColor: '#303030'
    },
    card1: {
        margin: 5,
        borderRadius: 12,
        backgroundColor: 'red',
        borderBottomWidth: 0
    }
});