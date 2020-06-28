import React from "react";
import { Text, View } from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

export default class SelecionaOpcoes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.visible === true) {
      this.showActionSheet();
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  render() {
    return (
      <View>
        {this.props.visible ? (
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={
              <Text style={{ color: "#000", fontSize: 18 }}>
                {this.props.titulo}
              </Text>
            }
            options={this.props.opcoes}
            cancelButtonIndex={0}
            destructiveButtonIndex={0}
            onPress={this.props.onPress}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}
