import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { app } from '../styles/app'
import { generateRandomColor } from '../utils/randomhtmlcolor';

const Home = ({ navigation }: any) => {
  const [color, setColor] = useState(generateRandomColor);

  return(
    <TouchableOpacity activeOpacity={1} onPress={() => { setColor(generateRandomColor) }} style={[app.container, { backgroundColor: color.rgb }]}>
      <Text style={app.htmlColorName}>{color.name}</Text>
      <Text style={app.htmlColor}>{color.rgb}</Text>
      <Text style={app.htmlColor}>{color.hex}</Text>

      <Text style={app.description}>Tap anywhere to show another color</Text>

      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Text style={app.settingsButton}>Change settings</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default Home;