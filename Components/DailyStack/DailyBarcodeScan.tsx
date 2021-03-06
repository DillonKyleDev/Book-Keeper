import React, { useState, useEffect } from 'react';
import { screenWidth, screenHeight } from '../Helper/Functions/ScreenHeight';
import { useFocusEffect } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ISBN, FetchIsbn } from '../Helper/Functions/FetchBooks';
import TopBar from '../Helper/TopBar';
import MyButton from '../Helper/MyButton';
import MyText from '../Helper/MyText';
import { Camera } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book, bookNotFoundBook } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const DailyBarcodeScan: React.FC<Props> = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [openScanner, setOpenScanner] = useState(true);
  const dispatch = useReduxDispatch();
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const bookNotFound: Book = bookNotFoundBook;
  
  useFocusEffect(() => {
    if(dailySelected.title !== '') {
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
      dispatch(setDailySelected(response[0]));
      navigation.push("ShowDailyBookTab");
    } else {
      dispatch(setDailySelected(bookNotFound));
      navigation.push("ShowDailyBookTab");
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
    <View style={{flex: 1}}>
      <TopBar />
      <View style={[{flex: 1, paddingTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center'}]}>
        {openScanner && 
        <MyText text='Center barcode within camera view.' size={18} style={{textAlign: 'center', paddingBottom: 20}}/>}
        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%'}}>
          <ActivityIndicator animating={!openScanner} size="large" color="#4b59f5" style={{position: 'absolute', top: 50}} />
        </View>

        {openScanner && 
        <View style={[styles.scannerContainer, {width: screenWidth}]}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={{flex: 1, height: '100%', position: 'absolute', width: screenWidth, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name="scan-helper" size={screenWidth/4*3} color="white" />
          </View>
        </View>}
      </View>
    </View>
  );
}

export default DailyBarcodeScan;

const styles = StyleSheet.create({
  scannerContainer: {
    overflow: 'hidden',
    height: screenHeight/2,
    flex: 1
  }
});