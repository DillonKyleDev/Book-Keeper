import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreData: React.FC = () => {
  const [ data, setData ] = useState<string>('');
  const [ retrievedData, setRetrievedData ] = useState<string>('');

  useEffect(() => {
    
  }, [  ]);

  const updateData = (e: string) => {
    setData(e);
  }

  const storeData = async () => {
    await AsyncStorage.setItem('@saved_Key', data)
    .catch(e => console.log(e));
  }

  const getData = async () => {
    const value = await AsyncStorage.getItem('@saved_Key');
    if(value !== null) {
      setRetrievedData(value);
    }
  }

  return (
    <View>
      <TextInput value={data} onChangeText={(e) => updateData(e)}/>
      <Button title='store data' onPress={() => storeData()} />
      <Button title='get data' onPress={() => getData()} />
      <Text>{retrievedData}</Text>
    </View>
  )
}