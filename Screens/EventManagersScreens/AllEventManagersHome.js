import {Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import Account from '../UsersAccount/Account';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function CricketManagerhome() {
  const navigation = useNavigation();
  const handleCricketFixtures = () => {
    navigation.navigate('CricketFixtures');
  };
  const handleEditFixtures = () => {
    navigation.navigate('EditFixtures'); //kal
  };
  const handleCricketScore = () => {
    navigation.navigate('CricketScoring');
  };
  const handleCricketRules = () => {
    navigation.navigate('RuleofCricket');
  };

  const handleplayers = () => {
    navigation.navigate('ImageTest');
  };
  const handleteamrequests = () => {
    navigation.navigate('TeamRequests');
  };
  const handleCricketDetails = () => {
    navigation.navigate('CricketDetails');
  };
  const handleTest1 = () => {
    navigation.navigate('Test1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.Content
          title="Cricket Manager"
          titleStyle={styles.appbarTitle}
        />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.welcometextview}>
          <Text style={styles.welcometext}>WELCOME</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleCricketFixtures}>
            <Text style={styles.buttontext}>Create Fixtures</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleEditFixtures}>
            <Text style={styles.buttontext}>Edit Fixtures</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleCricketRules}>
            <Text style={styles.buttontext}>Game Instructions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleteamrequests}>
            <Text style={styles.buttontext}>Team Requests</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleCricketScore}>
            <Text style={styles.buttontext}>Start Scoring</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonlogin} onPress={handleplayers}>
            <Text style={styles.buttontext}>View Teams</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={() => console.log('Pressed')}>
            <Text style={styles.buttontext}>App Creadits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

//This function is for logout button in home screen.
function TabLogoutHandler() {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    };

    const handleCancel = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'CricketManagerhome'}],
      });
    };

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: handleCancel, style: 'cancel'},
        {text: 'OK', onPress: handleLogout},
      ],
      {cancelable: true},
    );
  }, [navigation]);
  return null;
}

export default function CricketManagerNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Cricket') {
            iconName = 'home-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-circle-outline';
          } else if (route.name === 'Logout') {
            iconName = 'exit-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Cricket" component={CricketManagerhome} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen
        name="Logout"
        component={TabLogoutHandler}
        options={{tabBarStyle: {display: 'none'}}}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  appbarsetting: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  welcometextview: {
    alignItems: 'center',
  },
  welcometext: {
    color: 'black',
    marginTop: 20,
    fontSize: 40,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonlogin: {
    backgroundColor: '#6200ee',
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners
  },
  buttontext: {
    fontSize: 20,
    color: '#ffffff',
  },
});
