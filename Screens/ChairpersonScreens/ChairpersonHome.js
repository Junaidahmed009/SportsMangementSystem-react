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

function Chairperson() {
  const navigation = useNavigation();
  const handleAddEventmanager = () => {
    navigation.navigate('AddEventmanager');
  };
  const handleAddsessions = () => {
    navigation.navigate('Addsession');
  };
  const handleEventmanagerselection = () => {
    navigation.navigate('Eventmanagerselection');
  };
  const handleRules = () => {
    navigation.navigate('Ruleofgames');
  };
  const handleViewManagers = () => {
    navigation.navigate('ViewManagers');
  };
  const handleAddNewGame = () => {
    navigation.navigate('AddNewGame');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.Content title="Chairperson" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.welcometextview}>
          <Text style={styles.welcometext}>WELCOME</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleAddsessions}>
            <Text style={styles.buttontext}>Add Session</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleEventmanagerselection}>
            <Text style={styles.buttontext}>Add Games&EMs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonlogin} onPress={handleRules}>
            <Text style={styles.buttontext}>Edit Instructions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleAddEventmanager}>
            <Text style={styles.buttontext}>Edit User Role</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleAddNewGame}>
            <Text style={styles.buttontext}>Add Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={() => console.log('Pressed')}>
            <Text style={styles.buttontext}>Sessions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonlogin}
            onPress={handleViewManagers}>
            <Text style={styles.buttontext}>View Managers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
        routes: [{name: 'Chairperson'}],
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

export default function ChairpersonNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Admin') {
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
      <Tab.Screen name="Admin" component={Chairperson} />
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
