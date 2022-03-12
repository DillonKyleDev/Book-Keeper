import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ISBN, FetchIsbn } from './FetchBooks';
import MyText from './MyText';
//redux
import { useReduxDispatch } from '../store';
import { setSelected } from '../store/selectedBook/selectedSlice';
import { Book } from '../store/books/bookSlice';

interface Props {
  closeScanner: () => void;
}

const BarcodeScan: React.FC<Props> = ({closeScanner}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useReduxDispatch();
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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        closeScanner();
        return true;
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleBarCodeScanned = async ({ type, data } : { type:string, data:string}) => {
    setScanned(true);
    const isbnData:ISBN = {path: "ISBN", isbn: data};
    const response = await FetchIsbn({isbnData: isbnData});
    if(response[0].title) {
      dispatch(setSelected(response[0]))
      closeScanner();
    } else {
      dispatch(setSelected(bookNotFound));
      closeScanner();
    }
  };

  if (hasPermission === null) {
    return <MyText size={16} text="...Requesting camera permission..." style={[styles.centerText, styles.font16, styles.paddingTop16, styles.marginTop]} />;
  }
  if (hasPermission === false) {
    return <MyText size={16} text="Can't scan... No access to camera" style={[styles.centerText, styles.font16, styles.paddingTop16, styles.underLine, styles.marginTop]} />;
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scannerStyle}
      />
    </View>
  );
}

export default BarcodeScan;

const styles = StyleSheet.create({
  scannerStyle: {
    position: 'absolute',
    top: -50,
    left: '3%',
    bottom: 0,
    right: '3%',
  },
  warningContainer: {
    padding: '3%',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '2%',
    marginBottom: '2%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 6, height: 10},
  },
  underLine: {
    textDecorationColor: 'black',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  font12: {
    fontSize: 12,
  },
  font16: {
    fontSize: 16,
  },
  font20: {
    fontSize: 20,
  },
  marginTop: {
    marginTop: 70,
  },
  maxContent: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  paddingTop16: {
    paddingTop: 16
  },
  centerText: {
    textAlign: 'center',
  },
  scannerContainer: {
    marginLeft: '2%',
    marginRight: '2%',
  },
});