import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import BarcodeScan from './BarcodeScan';
import TopBar from './TopBar';
import { Ionicons } from '@expo/vector-icons';
//Redux
import { useReduxSelector } from '../store';
import ShowSingleBook from './ShowSingleBook';

const AddBook: React.FC = () => {
  const [ showScanner, setShowScanner ] = useState(false);
  const [ openSearchBar, setOpenSearchBar ] = useState(false);
  //Redux
  const selected = useReduxSelector(state => state.selected);

  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  const goBackButton = 
  <>
    <Button 
      buttonStyle={{
        backgroundColor: 'none',
        borderColor: 'transparent',
        borderWidth: 2,
        paddingBottom: 6,
      }}
      titleStyle={{fontFamily: 'serif'}}
      title=" Go Back"
      onPress={() => {

      }}
      icon={<Ionicons name="arrow-back" size={24} color="white" />}
    />
  </>

  return (
    <View>
      <TopBar />
      <View style={styles.addBookContainer}>
     
            {/* <View style={styles.scannerContainer}>
              <View style={styles.buttonStyles}>
                <Button 
                  title="Enter new book manually"
                  titleStyle={{fontFamily: 'serif'}}
                  buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
                  onPress={() => {}}/>
              </View>
              <View style={styles.scanner}>
                {selected.title === '' && showScanner && <BarcodeScan closeScanner={() => closeScanner()}/> }
              </View>
            </View> */}
  
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyles}>
            <Button 
              title="Scan new book"
              titleStyle={{fontFamily: 'serif'}}
              buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
              onPress={() => openScanner()}/>
          </View>
          <View style={styles.buttonStyles}>
            <Button 
              title="Enter new book manually"
              titleStyle={{fontFamily: 'serif'}}
              buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
              onPress={() => setOpenSearchBar(true)}/>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AddBook

const styles = StyleSheet.create({
  addBookContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  scannerContainer: {
    position: 'relative',
    top: 10,
    height: '100%',
  },
  scanner: {
    width: 500,
    position: 'relative',
    top: -90
  },
  buttonContainer: {
    position: 'relative',
    top: -90,
  },
  buttonStyles: {
    margin: 15
  },
})