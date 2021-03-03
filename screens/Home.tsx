import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, GestureResponderEvent, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { app } from '../styles/app'
import { generateRandomColor } from '../utils/randomhtmlcolor';

const Home = ({ navigation }: any) => {
  const [color, setColor] = useState(generateRandomColor);
  const [oldColor, setOldColor] : any = useState(generateRandomColor);
  const [position, setPosition] = useState({ x: undefined, y: undefined })
  const [scale, setScale] = useState(new Animated.Value(0));
  const [textColor, setTextColor] = useState('rgb(3,3,3)');

  const [fade] = useState(new Animated.Value(1));
  const [timeoutId, setTimeoutId] : any = useState();

  const [settings, setSettings] = useState({ showRGB: undefined, showHex: undefined });

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

  const colorLightness = (rgb: string) => {
    const r = +rgb.split(',')[0].substr(4),
      g = +rgb.split(',')[1].replace(' ', ''),
      b = +rgb.split(',')[2].substr(rgb.split(',')[2].length).replace(' ', '');
 
    let luminance = 0;
    luminance = 1 - (.299 * r + .587 * g + .114 * b) / 255;
 
    if (luminance < .5) {
      luminance = 3;
    } else {
      luminance = 250;
    }
 
    return `${luminance}, ${luminance}, ${luminance}`;
  }

  const handlePress = (event: GestureResponderEvent) => {
    clearTimeout(timeoutId);

    const generatedColor = generateRandomColor();
    setColor(generatedColor);

    //@ts-ignore
    setPosition({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});

    const timeout = setTimeout(() => {
      setOldColor(generatedColor);
      setScale(new Animated.Value(0));
      setTextColor(`rgb(${colorLightness(generatedColor.rgb)})`);

      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 400)
    setTimeoutId(timeout);

    Animated.timing(scale, {
      toValue: 20,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(fade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  return(
    <View
      style={[app.container, { backgroundColor: oldColor.rgb }]}
      onTouchStart={(e: GestureResponderEvent) => { handlePress(e) }}
    >
      <Animated.View
        style={[app.growingCircle, {
          backgroundColor: color.name,
          left: position.x,
          top: position.y,
          transform: [
            {translateX: -50},
            {translateY: -50},
            {scale: scale}
          ]
        } 
        ]}
      >
      </Animated.View>

      <Animated.View
        style={{opacity: fade}}
      >
        <Text style={[app.htmlColorName, {color: textColor }]}>{oldColor.name}</Text>
        {settings.showRGB && <Text style={[app.htmlColor, {color: textColor }]}>{oldColor.rgb}</Text>}
        {settings.showHex && <Text style={[app.htmlColor, {color: textColor }]}>{oldColor.hex}</Text>}

        <Text style={[app.description, {color: textColor }]}>Tap anywhere to show another color</Text>

        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
          <Text style={[app.settingsButton, {color: textColor }]}>Change settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default Home;