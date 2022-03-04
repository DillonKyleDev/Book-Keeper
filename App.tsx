import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BarcodeScan } from './Components/BarcodeScan';
import { FetchBookData } from './Components/FetchBookData';
import { StoreData } from './Components/StoreData';
import { Calendar } from './Components/Calendar';
import { DateSelector } from './Components/DateSelector';
import { TypeScript } from './Components/TypeScript';
export default function App() {
  return (
    <View style={styles.container}>
      <StoreData />
      <StatusBar style="auto" />
      <Calendar />
      <DateSelector />
      {/* <FetchBookData /> */}
      {/* <BarcodeScan /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});