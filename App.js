/*import React from 'react';

import Routes from './src/routes';

export default function App() {
  return <Routes />
}
*/

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import Routes from './src/routes';

export default class App extends React.Component {

  state = {
    loadFont: false
  };

  async componentDidMount() {

    await Font.loadAsync({
      Chewy: require('./assets/fonts/Chewy.ttf')
    });

    this.setState({ loadFont: true });
  }

  render() {

    if (this.state.loadFont) {
      return (
        <Routes />
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner color='#F3F3F3' />
        </View>
      );
    }
    {/*return (
      <View>
        {
          !this.state.loadFont ?
            (
              <View style={styles.container}>
                <Spinner color='#F3F3F3' />
              </View>
            ) : <Routes />
        }
      </View>
    );
      */}
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    fontFamily: 'Chewy',
    color: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center'
  }
});