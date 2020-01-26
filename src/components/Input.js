import React from "react";
import { View, StyleSheet, TextInput, Image, Dimensions } from "react-native";

export default function Input({
  icon,
  valor,
  onChangeText,
  autoCorrect,
  autoCapitalize,
  keyboardType,
  placeholderTextColor,
  placeholder,
  secureTextEntry,
  maxLength
}) {
  return (
    <View style={styles.cardInput}>
      <View style={{ right: 10, justifyContent: "center" }}>
        <Image source={icon} style={styles.icon} />
      </View>

      <View style={{ justifyContent: "center" }}>
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
          maxLength={maxLength}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    width: Dimensions.get("screen").width - 18,
    fontFamily: "Chewy",
    fontSize: 23,
    color: "#F3F3F3",
    paddingTop: 8
  },
  cardInput: {
    backgroundColor: "#363636",
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width - 25,
    height: 50,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon: {
    height: 30,
    width: 30
  }
});
