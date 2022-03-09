import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TopBar } from './TopBar';
import { Button } from 'react-native-elements';
import BarcodeScan from './BarcodeScan';
import { BookList } from './BookList';
//redux imports
import { useReduxDispatch, useReduxSelector } from '../store';
import { setBooks, addBook, removeBook, resetBooks } from '../store/books/bookSlice'

export const MyBooks: React.FC = () => {
  const [ borderColor, setBorderColor ] = useState('#f3f3f3');
  const [ showScanner, setShowScanner ] = useState(false);
  //store
  const books = useReduxSelector(state => state.books);

  const openScannerButton =
  <>
    <Button 
      buttonStyle={{
        backgroundColor: '#f3f3f3',
        borderColor: borderColor,
        borderWidth: 2,
      }}
      onPress={() => openScanner()}
      icon={<MaterialCommunityIcons name="barcode-scan" size={24} color="black" />}
    />
  </>
  const closeScannerButton =
  <>
    <Button 
      buttonStyle={{
        backgroundColor: '#f3f3f3',
        borderColor: "#ff5757",
        padding: 10,
        borderRadius: 40,
      }}
      onPress={() => closeScanner()}
      icon={<Entypo name="controller-stop" size={24} color="red" />}
    />
  </>

  const searchButton = 
  <>
    <Button 
      buttonStyle={{
        backgroundColor: 'none',
        borderColor: 'transparent',
        borderWidth: 2,
        paddingBottom: 6,
      }}
      onPress={() => closeScanner()}
      icon={<AntDesign name="search1" size={24} color="black" />}
    />
  </>
  
  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  return (
    <View>
      <TopBar 
      tab="My Books" 
      firstButtonText={showScanner ? "Stop Scanning" : "Scan Books"} 
      firstButton={showScanner ? closeScannerButton : openScannerButton}
      secondButton={searchButton} />
      <View>
        {showScanner ? <BarcodeScan /> : <BookList books={books}/> }
      </View>
    </View>
  )
}