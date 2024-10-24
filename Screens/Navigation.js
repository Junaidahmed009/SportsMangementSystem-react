import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './UsersAccount/Login';
import Signup from './UsersAccount/Signup';
import Cahirpersonnav from './ChairpersonScreens/ChairpersonHome';
import ForgetPassword from './UsersAccount/ForgetPassword';
import Home from './Home/Home';
import AddSession from './ChairpersonScreens/AddSession';
import Eventmanagerhome from './EventmangerScreens/EventmanagerHome';
import addgamesandmanagers from './ChairpersonScreens/AddGames&Managers'
import RuleofGames from './ChairpersonScreens/RuleofGames';
import AddEventmanager from './ChairpersonScreens/AddEventmanager';
const Stack = createNativeStackNavigator();
export default function Navigation() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Chairperson' component={Cahirpersonnav} />
        <Stack.Screen name='Forgetpassword' component={ForgetPassword} />
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Addsession' component={AddSession}/>
        <Stack.Screen name='EventmanagerHome' component={Eventmanagerhome}/>
        <Stack.Screen name='Eventmanagerselection' component={addgamesandmanagers}/>
        <Stack.Screen name='Ruleofgames' component={RuleofGames}/>
        <Stack.Screen name='AddEventmanager' component={AddEventmanager}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
