import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MyBooks } from './Components/MyBooks';
import { MyKeeper } from './Components/MyKeeper';
import { Preferences } from './Components/Preferences';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarItem } from 'react-native-tab-view';

export default function App() {
const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator tabBarPosition="bottom" initialRouteName="My Keeper">
          <Tab.Screen options={{
            tabBarStyle:{
              width: '100vw', 
              height: '80px', 
            },
            tabBarIcon: (props) => 
              <MaterialCommunityIcons 
                name="bookshelf" 
                size={24} 
                color={props.color} />
            }}
            name="My Books" 
            component={MyBooks} 
          />
          <Tab.Screen options={{
            tabBarStyle:{
              width: '100vw', 
              height: '80px', 
            }, 
            title: 'My Keeper',
            tabBarIcon: (props) => 
              <Ionicons 
                name="calendar-sharp" 
                size={24} 
                color={props.color} />
            }} 
            name="My Keeper" 
            component={MyKeeper} 
          />
          <Tab.Screen options={{
            tabBarStyle:{
              width: '100vw', 
              height: '80px', 
            },
            tabBarIcon: (props) => 
              <MaterialCommunityIcons 
                name="account-settings" 
                size={24}
                color={props.color} />
            }} 
            name="Preferences" 
            component={Preferences} 
          />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});