import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MyBooks } from './Components/MyBooks';
import { MyKeeper } from './Components/MyKeeper';
import { Preferences } from './Components/Preferences';
//redux imports
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './store';

export default function App() {
const Tab = createMaterialTopTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tab.Navigator tabBarPosition="bottom" initialRouteName="My Keeper">
            <Tab.Screen options={{
              tabBarStyle:{
                width: '100%', 
                height: 70, 
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
                width: '100%', 
                height: 70, 
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
                width: '100%', 
                height: 70, 
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
      </PersistGate>
    </Provider>


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