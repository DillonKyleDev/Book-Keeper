import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ISBN, FetchIsbn } from './FetchBooks';
import MyText from './MyText';
//redux
import { useReduxDispatch, useReduxSelector } from '../store';
import { setSelected } from '../store/selectedBook/selectedSlice';
import { Book } from '../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TopBar from './TopBar';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const BarcodeScan: React.FC<Props> = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [openScanner, setOpenScanner] = useState(false);
  const dispatch = useReduxDispatch();
  const selected = useReduxSelector(state => state.selected);
  const bookNotFound: Book = {
    title: "Book Not Found",
    authors: [''],
    genres: [''],
    description: '',
    rating: 0,
    pages: 0,
    imageUrl: '',
    link: '',
  }
  
  useFocusEffect(() => {
    setOpenScanner(true);
    if(selected.title !== '') {
      navigation.navigate("AddBookTab");
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
    if(response[0].title) {
      dispatch(setSelected(response[0]));
      navigation.navigate("ShowSingleBookTab");
    } else {
      dispatch(setSelected(bookNotFound));
      navigation.navigate("ShowSingleBookTab");
    }
  };

  if (hasPermission === null) {
    return <MyText size={16} text="...Requesting camera permission..." style={styles.text} />;
  }
  if (hasPermission === false) {
    return <MyText size={16} text="Can't scan... No access to camera" style={styles.text} />;
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <TopBar />
      <View style={{marginTop: 15}}>
        <MyText text='Begin scanning,' size={22} style={{textAlign: 'center', paddingBottom: 5}}/>
        <MyText text='Or...' size={16} style={{textAlign: 'center', paddingBottom: 10}}/>
        <Button 
          title="Enter new book manually"
          titleStyle={{fontFamily: 'serif'}}
          buttonStyle={{backgroundColor: '#4b59f5', width: 275, marginLeft: 'auto', marginRight: 'auto', height: 60, paddingLeft: 20, paddingRight: 20}}
          onPress={() => navigation.navigate("FindTitleTab")}/>
      </View>
      {openScanner && 
        <View style={{width: '100%', height: '100%', marginTop: -70}}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

            style={styles.scannerStyle}
          />
        </View>
      }
    </View>
  );
}

export default BarcodeScan;

const styles = StyleSheet.create({
  scannerStyle: {
    position: 'absolute',
    width: 450,
    top: 50,
    bottom: 0,
  },
  marginTop: {
    marginTop: 70,
  },
  centerText: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 200,
  }
});