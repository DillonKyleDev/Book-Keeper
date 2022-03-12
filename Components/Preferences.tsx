import React from 'react';
import { View } from 'react-native';
import SectionHeader from './SectionHeader';
import TopBar from './TopBar';

const Preferences: React.FC = () => {
  return (
    <View>
      <TopBar />
      <SectionHeader title="Preferences" />
    </View>
  )
}

export default Preferences