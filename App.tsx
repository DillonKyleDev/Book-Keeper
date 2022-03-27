import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//Library tab imports
import Library from './Components/LibraryStack/Library';
import AddBook from './Components/LibraryStack/AddBook';
import BarcodeScan from './Components/Helper/BarcodeScan';
import FindBook from './Components/Helper/FindBook';
import ShowSingleBook from './Components/LibraryStack/ShowSingleBook';
import BookList from './Components/Helper/BookList';
import EditLibraryPages from './Components/LibraryStack/EditLibraryPages';

//Daily tab imports
import Daily from './Components/DailyStack/Daily';
import AddGoalBook from './Components/DailyStack/AddGoalBook';
import LibraryList from './Components/DailyStack/LibraryList';
import FinishBy from './Components/DailyStack/FinishBy';
import PickReadingDays from './Components/DailyStack/PickReadingDays';
import ShowSingleGoal from './Components/DailyStack/ShowSingleGoal';
import PreviewGoal from './Components/DailyStack/PreviewGoal';
import EditPages from './Components/DailyStack/EditPages';

//Achievements tab imports
import Achievements from './Components/AchievementsStack/Achievements';
import Settings from './Components/AchievementsStack/Settings';

//Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SplashScreen, WithSplashScreen } from './Components/SplashScreen';

const LibraryStack = createNativeStackNavigator();
const DailyStack = createNativeStackNavigator();
const AchievementsStack = createNativeStackNavigator();


const LibraryStackScreen = () => {
  return(
    <LibraryStack.Navigator screenOptions={{headerShown: false}}>
      <LibraryStack.Screen name="LibraryTab" component={Library} />
      <LibraryStack.Screen name="AddBookTab" component={AddBook} />
      <LibraryStack.Screen name="ScanBookTab" component={BarcodeScan} />
      <LibraryStack.Screen name="FindBookTab" component={FindBook} />
      <LibraryStack.Screen name="ShowSingleBookTab" component={ShowSingleBook} />
      <LibraryStack.Screen name="BookListTab" component={BookList} />
      <LibraryStack.Screen name="EditLibraryPagesTab" component={EditLibraryPages} />
    </LibraryStack.Navigator>
  )
}
const DailyStackScreen = () => {
  return(
    <DailyStack.Navigator screenOptions={{headerShown: false}}>
      <DailyStack.Screen name="DailyTab" component={Daily} />
      <DailyStack.Screen name="AddGoalBookTab" component={AddGoalBook} />
      <DailyStack.Screen name="SetGoalTab" component={FinishBy} />
      <DailyStack.Screen name="AddFromLibraryTab" component={LibraryList} />
      <DailyStack.Screen name="ScanBookTab" component={BarcodeScan} />
      <DailyStack.Screen name="FindBookTab" component={FindBook} />
      <DailyStack.Screen name="FinishByTab" component={FinishBy} />
      <DailyStack.Screen name="ShowSingleBookTab" component={ShowSingleBook} />
      <DailyStack.Screen name="PickReadingDaysTab" component={PickReadingDays} />
      <DailyStack.Screen name="ShowSingleGoalTab" component={ShowSingleGoal} />
      <DailyStack.Screen name="PreviewGoalTab" component={PreviewGoal} />
      <DailyStack.Screen name="EditPagesTab" component={EditPages} />
    </DailyStack.Navigator>
  )
}
const AchievementsStackScreen = () => {
  return(
    <AchievementsStack.Navigator screenOptions={{headerShown: false}}>
      <AchievementsStack.Screen name="AchievementsTab" component={Achievements} />
      <AchievementsStack.Screen name="SettingsTab" component={SplashScreen} />
    </AchievementsStack.Navigator>
  )
}

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);
    timer;
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady} >
      <NavigationContainer>
        <Tab.Navigator tabBarPosition="bottom" initialRouteName="Daily">
          <Tab.Screen options={{
            tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
            tabBarStyle:{width: '100%', height: 60},
            tabBarActiveTintColor: '#4b59f5',
            tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif', position: 'relative', bottom: 8, right: 2 },
            tabBarIcon: (props) => 
            <MaterialCommunityIcons name="bookshelf" size={20} color={props.color} />,}}
            name="Library"
            component={LibraryStackScreen}
          />
          <Tab.Screen options={{
            tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
            tabBarStyle:{width: '100%', height:60}, 
            tabBarActiveTintColor: '#4b59f5',
            title: 'Daily',
            tabBarIcon: (props) => <Ionicons name="calendar-sharp" size={18} color={props.color} />,
            tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif', position: 'relative', bottom: 8, right: 3 }}} 
            name="Daily" 
            component={DailyStackScreen} 
          />
          <Tab.Screen options={{
            tabBarIndicatorStyle:{backgroundColor: '#4b59f5'},
            tabBarStyle:{width: '100%', height: 60},
            tabBarActiveTintColor: '#4b59f5',
            tabBarIcon: (props) => <FontAwesome5 name="flag-checkered" size={18} color={props.color} />,
            tabBarLabelStyle: { textTransform: 'capitalize', fontFamily: 'serif', position: 'relative', bottom: 8, right: 2 }}} 
            name="Achievements" 
            component={AchievementsStackScreen} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WithSplashScreen>
  );
}