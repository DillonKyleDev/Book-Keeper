import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BookList } from './BookList';
import { FetchIsbn } from './FetchBooks';
import { ISBN } from './FetchBooks';
//redux
import { Book } from '../store/books/bookSlice';
import ShowSingleBook from './ShowSingleBook';


const BarcodeScan: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanResults, setScanResults] = useState<Book[]>([]);
  const [ bookNotFound, setBookNotFound ] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data } : { type:string, data:string}) => {
    setScanned(true);
    const isbnData:ISBN = {path: "ISBN", isbn: data};
    const response = await FetchIsbn({isbnData: isbnData});
    if(response[0].title) {
      setScanResults(response);
    } else {
      setBookNotFound(true);
    }
    
  };

  if (hasPermission === null) {
    return <Text style={[styles.centerText, styles.font16, styles.paddingTop16]}>...Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={[styles.centerText, styles.font16, styles.paddingTop16, styles.underLine]}>Can't scan... No access to camera</Text>;
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      {scanned ? <ShowSingleBook book={scanResults[0]} bookNotFound={bookNotFound}/> :
        <>
          <View style={styles.warningContainer}>
            <Text style={[styles.centerText, styles.font20]}>
              Please make sure you are in a well-lit area.
            </Text>
            <Text style={styles.font16}>
              Tips:
            </Text>
            <Text style={styles.font12}>
              If it does not scan, stop scanning and start scanning again.
            </Text>
            <Text style={styles.font16}>Please Note:</Text>
            <Text style={styles.font12}>
              Not all book barcodes may work with this scanner. If you are having trouble, try searching by author name and/or title.
            </Text> 
          </View>
          <View style={{width: '100%', height: '100%'}}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scannerStyle}
            />
          </View>
        </>
      }
    </View>
  );
}

export default BarcodeScan;

const styles = StyleSheet.create({
  scannerStyle: {
    position: 'absolute',
    top: -360,
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