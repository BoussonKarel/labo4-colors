import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from 'react-native-safe-area-context';
import { settings } from '../styles/app';

const Settings = () => {
  const [showHex, setShowHex] = useState(true);
  const [showRGB, setShowRGB] = useState(true);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('colorSettings', JSON.stringify({
        showHex: showHex,
        showRGB: showRGB
      }));
      const settings = await AsyncStorage.getItem('colorSettings') || '';
      console.log(JSON.parse(settings))
    } catch (e) {
      // saving error
      console.error('Shoot, something went wrong.')
    }
  }

  const restoreState = async () => {
    const settings = await AsyncStorage.getItem('colorSettings');
    if (settings) {
      const { showHex, showRGB } = JSON.parse(settings);
      setShowRGB(showRGB);
      setShowHex(showHex);
    }
  }

  useEffect(() => {
    restoreState();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [showRGB, showHex]);

  return(
    <SafeAreaView style={settings.container}>
      <Text style={settings.title}>Settings, sweet settings ⚙</Text>
      <View style={settings.option}>
        <Switch value={showRGB} onValueChange={(value) => setShowRGB(value)} style={settings.input} />
        <Text style={settings.label}>View rgb on app screen.</Text>
      </View>
      <View style={settings.option}>
        <Switch value={showHex} onValueChange={(value) => setShowHex(value)} style={settings.input} />
        <Text style={settings.label}>View hex on app screen.</Text>
      </View>
    </SafeAreaView>
  );
}

export default Settings;