import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';
import { settings } from '../styles/app';

const Settings = () => {
  const [showHex, setShowHex] = useState(true);
  const [showRGB, setShowRGB] = useState(true);

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