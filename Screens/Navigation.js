import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './UsersAccount/Login';
import Signup from './UsersAccount/Signup';
import Cahirpersonnav from './ChairpersonScreens/Chairperson';
import ForgetPassword from './UsersAccount/ForgetPassword';
import Home from './Home/Home';
import AddGames from './ChairpersonScreens/AddGames';
import AddSession from './ChairpersonScreens/AddSession';


const Stack = createNativeStackNavigator();
export default function Navigation() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Chairperson' component={Cahirpersonnav} />
        <Stack.Screen name='Forgetpassowrd' component={ForgetPassword} />
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Addgames' component={AddGames}/>
        <Stack.Screen name='Addsession' component={AddSession}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
