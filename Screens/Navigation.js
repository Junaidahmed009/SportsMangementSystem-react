import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './UsersAccount/Login';
import Signup from './UsersAccount/Signup';
import Cahirpersonnav from './ChairpersonScreens/ChairpersonHome';
import ForgetPassword from './UsersAccount/ForgetPassword';
import UserHome from './Home/UserHome';
import AddSession from './ChairpersonScreens/AddSession';
import addgamesandmanagers from './ChairpersonScreens/AddGames&Managers'
import RuleofGames from './ChairpersonScreens/RuleofGames';
import AddEventmanager from './ChairpersonScreens/AddEventmanager';
import CricketManagerNav from './Cricket/CricketManagerHome';
import CricketFixtures from './Cricket/CricketFixtures';
import CricketScore from './Cricket/CricketScore';
import RuleofCricket from './Cricket/RuleofCricket';
import CricketRegistration from './Home/CricketRegistration';
const Stack = createNativeStackNavigator();
export default function Navigation() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Chairperson' component={Cahirpersonnav} />
        <Stack.Screen name='Forgetpassword' component={ForgetPassword} />
        <Stack.Screen name='UserHome' component={UserHome}/>
        <Stack.Screen name='Addsession' component={AddSession}/>
        <Stack.Screen name='Eventmanagerselection' component={addgamesandmanagers}/>
        <Stack.Screen name='Ruleofgames' component={RuleofGames}/>
        <Stack.Screen name='AddEventmanager' component={AddEventmanager}/>
        <Stack.Screen name='CricketManagerhome' component={CricketManagerNav}/>
        <Stack.Screen name='CricketFixtures' component={CricketFixtures}/>
        <Stack.Screen name='CricketScore' component={CricketScore}/>
        <Stack.Screen name='RuleofCricket' component={RuleofCricket}/>
        <Stack.Screen name='CricketRegistration' component={CricketRegistration}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
