import React, { useState, useEffect } from 'react';
import { screenHeight } from './Functions/ScreenHeight';
import { useFocusEffect } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ISBN, FetchIsbn } from './Functions/FetchBooks';
import MyText from './MyText';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import { Book, bookNotFoundBook } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TopBar from './TopBar';
import MyButton from './MyButton';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const BarcodeScan: React.FC<Props> = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [openScanner, setOpenScanner] = useState(true);
  const [deviceHeight, setDeviceHeight] = useState(screenHeight !== undefined ? screenHeight - 130 : '100%')
  const dispatch = useReduxDispatch();
  const librarySelected = useReduxSelector(state => state.librarySelected);
  const bookNotFound: Book = bookNotFoundBook;
  
  useFocusEffect(() => {
    if(librarySelected.title !== '') {
      navigation.goBack();
    }
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data } : { type:string, data:string }) => {
    setOpenScanner(false);
    setScanned(true);
    
    const isbnData:ISBN = {path: "ISBN", isbn: data};
    const response = await FetchIsbn({isbnData: isbnData});
    if(response !== undefined && response[0] && response[0].title) {
      dispatch(setLibrarySelected(response[0]));
      navigation.push("ShowSingleBookTab");
    } else {
      dispatch(setLibrarySelected(bookNotFound));
      navigation.push("ShowSingleBookTab");
    }
  };

  if (hasPermission === null) {
    return  (
      <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%'}}>
        <ActivityIndicator animating={true} size="large" color="#4b59f5" style={{position: 'absolute', top: 50}} />
      </View>)
  }
  if (hasPermission === false) {
    return <MyText size={16} text="Can't scan... No access to camera" style={{marginTop: 200, marginLeft: 'auto', marginRight: 'auto'}} />;
  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <TopBar />
      <View style={[{flex: 1, paddingTop: 20}]}>
        <MyText text='Begin scanning,' size={22} style={{textAlign: 'center', paddingBottom: 5}}/>
        <MyText text='Or...' size={16} style={{textAlign: 'center', paddingBottom: 10}}/>
        <MyButton title="Enter new book manually" onPress={() => navigation.push("FindBookTab")}/>
        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%'}}>
          <ActivityIndicator animating={!openScanner} size="large" color="#4b59f5" style={{position: 'absolute', top: 50}} />
        </View>
      </View>

      {openScanner && 
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scannerStyle}
        />
      }
    </View>
  );
}

export default BarcodeScan;

const styles = StyleSheet.create({
  scannerStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 100,
    bottom: 0,
    zIndex: 0
  },
});