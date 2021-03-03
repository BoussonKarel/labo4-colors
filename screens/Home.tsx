import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { app } from '../styles/app'
import { generateRandomColor } from '../utils/randomhtmlcolor';

const Home = ({ navigation }: any) => {
  const [color, setColor] = useState(generateRandomColor);

  // useRef = data bijhouden (ook na het herrenderen van een component)
  const [settings, setSettings] = useState({
    showRGB: null,
    showHex: null,
  })

  const getSettings = async () => {
    return new Promise(async (resolve, reject) => {
      const settings = await AsyncStorage.getItem('colorSettings')

      if (settings) {
        resolve(JSON.parse(settings));
      }
      else {
        reject(null);
      }
    });
  }

  // Als de pagina opnieuw in de focus is
  useFocusEffect(
    useCallback(() => {
      // console.log('Use f effect', Math.random());

      getSettings().then((settingsValue : any) => {
        // console.log('Settings opgeslagen:', settingsValue);
        setSettings(settingsValue);
      }).catch(noSettings => {
        // console.log('Geen settings opgeslagen:', noSettings);
      })
    }, [])
  );

  // Doesn't work when settings are updated
  // useEffect(() => {
  //   getSettings().then((settingsValue : any) => {
  //     console.log(settingsValue);
  //     setSettings(settingsValue);
  //   }).catch(noSettings => {
  //     console.log(noSettings);
  //   })
  // }, [])

  return(
    <TouchableOpacity activeOpacity={1} onPress={() => { setColor(generateRandomColor) }} style={[app.container, { backgroundColor: color.rgb }]}>
      <Text style={app.htmlColorName}>{color.name}</Text>
      {settings.showRGB && <Text style={app.htmlColor}>{color.rgb}</Text>}
      {settings.showHex && <Text style={app.htmlColor}>{color.hex}</Text>}

      <Text style={app.description}>Tap anywhere to show another color</Text>

      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Text style={app.settingsButton}>Change settings</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default Home;