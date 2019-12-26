import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default function Input({ valor, onChangeText, autoCorrect, autoCapitalize, keyboardType, placeholderTextColor, placeholder, secureTextEntry }) {    

    return (
        <View style={styles.cardInput}>
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
    );
};

const styles = StyleSheet.create({   
    input: {
        justifyContent: 'center',
        alignSelf: 'center',
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
        borderRadius: 5
    }
});