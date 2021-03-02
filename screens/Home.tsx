import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { app } from '../styles/app'

const Home = ({ navigation }: any) => {
  return(
    <TouchableOpacity activeOpacity={1} onPress={() => { console.log('Paint me a color 👏') }} style={ app.container }>
      <Text style={app.htmlColorName}>lemonchiffon</Text>
      <Text style={app.htmlColor}>rgb(255, 250, 205)</Text>
      <Text style={app.htmlColor}>#FFFACD</Text>

      <Text style={app.description}>Tap anywhere to show another color</Text>

      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Text style={app.settingsButton}>Change settings</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default Home;