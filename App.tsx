import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Components/SplashScreen';
import Tabs from './Components/Tabs';
//redux imports
const Stack = createNativeStackNavigator();

export default function App() {
  const { Navigator, Screen } = Stack;

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Screen name='Home'>
          {(props) => <Tabs {...props}/>}
        </Screen>
        <Screen name='SplashScreen' component={SplashScreen} />
      </Navigator>
    </NavigationContainer>
  );
}