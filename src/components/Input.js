import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image } from 'react-native';

//import iconUser from '../../assets/user.png';

export default function Input({ icon, valor, onChangeText, autoCorrect, autoCapitalize, keyboardType, placeholderTextColor, placeholder, secureTextEntry }) {

    return (
        <View style={styles.cardInput}>

            <View style={{ right: 10, justifyContent: 'center'}}>
                <Image source={icon} style={styles.icon} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    value={valor}
                    onChangeText={onChangeText}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Chewy',
        fontSize: 23,
        color: '#F3F3F3',
        paddingTop: 8
    },
    cardInput: {
        backgroundColor: '#363636',
        paddingHorizontal: 20,
        height: 44,
        margin: 10,
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
    },
    icon: {
        height: 30,
        width: 30,
    },
});