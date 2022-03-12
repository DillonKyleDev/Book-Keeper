import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import BarcodeScan from './BarcodeScan';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//Redux
import { useReduxSelector, useReduxDispatch } from '../store';
import { resetSelected } from '../store/selectedBook/selectedSlice';

const AddBookScreen: React.FC = () => {
  const [ showScanButton, setShowScanButton ] = useState(true);
  const [ showScanner, setShowScanner ] = useState(false);
  //Redux
  const selected = useReduxSelector(state => state.selected);

  const openScanner = () => {
    setShowScanner(true);
    setShowScanButton(false);
  };

  const closeScanner = () => {
    setShowScanner(false);
    setShowScanButton(true);
  };

  return (
    <View style={styles.addBookContainer}>
      <View style={styles.buttonStyles}>
        <Button 
          title="Scan new book  "
          titleStyle={{fontFamily: 'serif'}}
          iconRight={true}
          buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
          onPress={() => closeScanner()}
          icon={<MaterialCommunityIcons name="barcode-scan" size={24} color="white" />} />
      </View>
      <View style={styles.buttonStyles}>
      <Button 
        title="Search for book "
        titleStyle={{fontFamily: 'serif'}}
        iconRight={true}
        buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
        onPress={() => openScanner()}
        icon={<AntDesign name="search1" size={24} color="white" />} />
      </View>
      <View style={styles.buttonStyles}>
        <Button 
          title="Enter new book manually  "
          titleStyle={{fontFamily: 'serif'}}
          iconRight={true}
          buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
          onPress={() => {}}
          icon={<AntDesign name="form" size={24} color="white" />} />
      </View>

        {selected.title === '' && showScanner && <BarcodeScan closeScanner={() => closeScanner()}/> }
    </View>
  )
}

export default AddBookScreen

const styles = StyleSheet.create({
  addBookContainer: {
    width: '100%',
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyles: {
    margin: 15
  },
})