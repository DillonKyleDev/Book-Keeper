import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//Redux
import { useReduxSelector } from './store';
//Components
import Library from './Components/Library';
import Daily from './Components/Daily';
import Preferences from './Components/Preferences';
import AddBook from './Components/AddBook';
//Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const LibraryStack = createNativeStackNavigator();
const DailyStack = createNativeStackNavigator();
const PreferencesStack = createNativeStackNavigator();


const LibraryStackScreen = () => {
  return(
    <LibraryStack.Navigator screenOptions={{headerShown: false}}>
      <LibraryStack.Screen name="LibraryTab" component={Library} />
      <LibraryStack.Screen name="AddBookTab" component={AddBook} />
    </LibraryStack.Navigator>
  )
}
const DailyStackScreen = () => {
  return(
    <DailyStack.Navigator screenOptions={{headerShown: false}}>
      <DailyStack.Screen name="DailyTab" component={Daily} />
    </DailyStack.Navigator>
  )
}
const PreferencesStackScreen = () => {
  return(
    <PreferencesStack.Navigator screenOptions={{headerShown: false}}>
      <PreferencesStack.Screen name="PreferencesTab" component={Preferences} />
    </PreferencesStack.Navigator>
  )
}

export default function App() {
  const selected = useReduxSelector(state => state.selected);
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition="bottom" initialRouteName="Daily">
        <Tab.Screen options={{
          tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
          tabBarStyle:{width: '100%', height: 70},
          tabBarActiveTintColor: '#4b59f5',
          tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' },
          tabBarIcon: (props) => 
          <MaterialCommunityIcons name="bookshelf" size={24} color={props.color} />,}}
          name="Library"
          component={LibraryStackScreen}
        />
        <Tab.Screen options={{
          tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
          tabBarStyle:{width: '100%', height: 70}, 
          tabBarActiveTintColor: '#4b59f5',
          title: 'Daily',
          tabBarIcon: (props) => <Ionicons name="calendar-sharp" size={24} color={props.color} />,
          tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' }}} 
          name="Daily" 
          component={DailyStackScreen} 
        />
        <Tab.Screen options={{
          tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
          tabBarStyle:{width: '100%', height: 70},
          tabBarActiveTintColor: '#4b59f5',
          tabBarIcon: (props) => <MaterialCommunityIcons name="account-settings" size={24} color={props.color} />,
          tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif' }}} 
          name="Preferences" 
          component={PreferencesStackScreen} 
        />
      </Tab.Navigator>

      {/* <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home'>
          {(props) => <Tabs {...props}/>}
        </Stack.Screen>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}