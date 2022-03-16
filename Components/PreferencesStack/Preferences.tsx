import React from 'react';
import { View } from 'react-native';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';

const Preferences: React.FC = () => {
  return (
    <View>
      <TopBar />
      <SectionHeader title="Preferences" />
    </View>
  )
}

export default Preferences