import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { helper } from "../api";
import iconDate from "../../assets/iconDate.png";
import InputComponent from "../components/Input";

export default function DataFiltro({
  showDatePicker,
  data,
  onChangeData,
  dataVisible,
  setDataVisible,
}) {
  return (
    <>
      <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
        <View style={styles.widthInput}>
          <InputComponent
            editable={false}
            icon={iconDate}
            valor={data ? data : `${helper.getDataHoje()}`}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={dataVisible}
        mode="date"
        onConfirm={onChangeData}
        onCancel={setDataVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: Dimensions.get("screen").width,
    height: 60,
    borderRadius: 5,
    alignSelf: "center",
    margin: 5,
  },
  label: {
    paddingStart: 5,
    fontSize: 18,
    color: "#aaaaaa",
    fontWeight: "400",
  },
  input: {
    alignSelf: "flex-start",
    paddingStart: 10,
    marginTop: 8,
    fontSize: 20,
    color: "#ddd",
    width: Dimensions.get("screen").width - 20,
  },
  widthInput: {
    //width: width - 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});
