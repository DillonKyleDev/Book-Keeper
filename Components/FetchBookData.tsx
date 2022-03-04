import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

import axios from 'axios';

export const FetchBookData: React.FC = () => {

  useEffect(() => {
    axios.post('https://book-keeper-server.herokuapp.com/author', {
      "author": "brandon sanderson"
    })
    .then(response => console.log(response.data));
  }, []);


  const fetchData = async (dataType: String) => {
    const OPTIONS = {
      "headers": {
        "Content-Type": "Application/json"
      }
    }
    axios.post('https://book-keeper-server.herokuapp.com/', {
      "author": "brandon sanderson"
    })
    .then(response => console.log(response.data));
  }

  
  return (
    <View>
      
    </View>
  )
}