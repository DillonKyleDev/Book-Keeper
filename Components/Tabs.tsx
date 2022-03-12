import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MyBooks } from './MyBooks';
import Daily from './Daily';
import { Preferences } from './Preferences';
//redux
import { useReduxSelector } from '../store';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Tabs: React.FC<Props> = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  const [ mainPage, setMainPage ] = useState('Daily');
  //redux
  const selected = useReduxSelector(state => state.selected);
  
  useEffect(() => {
    if(selected.title === '') {
      setMainPage('Daily');
    } else if(selected.title !== '') {
      setMainPage('My Books');
    }
  },[ selected ]);

  return (
    <Tab.Navigator 
      tabBarPosition="bottom" 

      initialRouteName={mainPage}>
      <Tab.Screen options={{
        tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
        tabBarStyle:{
          width: '100%', 
          height: 70, 
        },
        tabBarActiveTintColor: '#4b59f5',
        tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' },
        tabBarIcon: (props) => 
        <MaterialCommunityIcons 
          name="bookshelf" 
          size={24} 
          color={props.color} />,}}
        name="Library"
      >
        {(props) => <MyBooks />}
      </Tab.Screen>
      <Tab.Screen options={{
        tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
        tabBarStyle:{
          width: '100%', 
          height: 70, 
        }, 
        tabBarActiveTintColor: '#4b59f5',
        title: 'Daily',
        tabBarIcon: (props) => 
          <Ionicons 
            name="calendar-sharp" 
            size={24} 
            color={props.color} />,
        tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' },
        }} 
        name="Daily" 
        component={Daily} 
      />
      <Tab.Screen options={{
        tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
        tabBarStyle:{
          width: '100%', 
          height: 70, 
        },
        tabBarActiveTintColor: '#4b59f5',
        tabBarIcon: (props) => 
          <MaterialCommunityIcons 
            name="account-settings" 
            size={24}
            color={props.color} />,
        tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' },
        
        }} 
        name="Preferences" 
        component={Preferences} 
      />
    </Tab.Navigator>
  )
}

export default Tabs