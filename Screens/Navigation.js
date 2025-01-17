import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './UsersAccount/Login';
import Signup from './UsersAccount/Signup';
import Cahirpersonnav from './ChairpersonScreens/ChairpersonHome';
import ForgetPassword from './UsersAccount/ForgetPassword';
import UserHome from './Home/UserHome';
import AddSession from './ChairpersonScreens/AddSession';
import addgamesandmanagers from './ChairpersonScreens/AddGames&Managers';
import RuleofGames from './ChairpersonScreens/RuleofGames';
import AddEventmanager from './ChairpersonScreens/AddEventmanager';
import CricketManagerNav from './EventManagersScreens/AllEventManagersHome';
import CricketFixtures from './EventManagersScreens/CreateFixtures';
import RuleofCricket from './EventManagersScreens/RuleofCricket';
import PlayersRegistration from './Home/TeamPlayersRegistration';
import TeamRegistration from './Home/TeamRegistration';
import Players from './EventManagersScreens/Players';
import TeamRequests from './EventManagersScreens/TeamRequests';
import ViewManagers from './ChairpersonScreens/ViewManagers';
import Fixtures from './Home/Fixtures';
import CricketMatchDetails from './Home/CricketMatchDetails';
import Test1 from './EventManagersScreens/Test1';
import EditFixtures from './EventManagersScreens/EditFixtures';
import CricketScoring from './ScoringScreens.js/CricketScoring';
import FootballScoring from './ScoringScreens.js/FootballScoring';
import Badminton from './ScoringScreens.js/Badminton';
import StartScoring from './EventManagersScreens/StartScoring';
import ScoringCard from './ScoringScreens.js/ScoringCard';
import SingleCricketDetails from './Home/SingleCricketDetails';
import CaptionTeams from './Home/CaptionTeams';
import UserInstructions from './Home/UserInstructions';
const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Chairperson" component={Cahirpersonnav} />
        <Stack.Screen name="Forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="Addsession" component={AddSession} />
        <Stack.Screen
          name="Eventmanagerselection"
          component={addgamesandmanagers}
        />
        <Stack.Screen name="Ruleofgames" component={RuleofGames} />
        <Stack.Screen name="AddEventmanager" component={AddEventmanager} />
        <Stack.Screen name="CricketManagerhome" component={CricketManagerNav} />
        <Stack.Screen name="CricketFixtures" component={CricketFixtures} />
        <Stack.Screen name="RuleofCricket" component={RuleofCricket} />
        <Stack.Screen
          name="PlayersRegistration"
          component={PlayersRegistration}
        />
        <Stack.Screen name="TeamRegistration" component={TeamRegistration} />
        <Stack.Screen name="Players" component={Players} />
        <Stack.Screen name="TeamRequests" component={TeamRequests} />
        <Stack.Screen name="ViewManagers" component={ViewManagers} />
        <Stack.Screen name="Fixtures" component={Fixtures} />
        <Stack.Screen
          name="CricketMatchDetails"
          component={CricketMatchDetails}
        />
        <Stack.Screen name="Test1" component={Test1} />
        <Stack.Screen name="EditFixtures" component={EditFixtures} />
        <Stack.Screen name="CricketScoring" component={CricketScoring} />
        <Stack.Screen name="FootballScoring" component={FootballScoring} />
        <Stack.Screen name="Badminton" component={Badminton} />
        <Stack.Screen name="StartScoring" component={StartScoring} />
        <Stack.Screen name="ScoringCard" component={ScoringCard} />
        <Stack.Screen
          name="SingleCricketDetails"
          component={SingleCricketDetails}
        />
        <Stack.Screen name="CaptionTeams" component={CaptionTeams} />
        <Stack.Screen name="UserInstructions" component={UserInstructions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
