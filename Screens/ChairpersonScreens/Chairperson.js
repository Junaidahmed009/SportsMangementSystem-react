import { Alert, View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import Account from '../UsersAccount/Account';
import { useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();


function Chairperson() {

  const navigation = useNavigation();
  const handleAddgames = () => {
    navigation.navigate('Addgames')
  }
  const handleAddsessions = () => {
    navigation.navigate('Addsession')
  }
  const handleEventmanagerselection = () => {
    navigation.navigate('Eventmanagerselection')
  }
  const handleRules = () => {
    navigation.navigate('Ruleofgames')
  }

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
          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={handleAddsessions}
          >
            <Text style={styles.buttontext}>Add session</Text>
          </Button>

          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={handleEventmanagerselection}
          >
            <Text style={styles.buttontext}>Add Sports</Text>
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={handleRules}
          >
            <Text style={styles.buttontext}>Rule of Game</Text>
          </Button>

          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            <Text style={styles.buttontext}>See Fixtures</Text>
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            <Text style={styles.buttontext}>View Sports</Text>
          </Button>

          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            <Text style={styles.buttontext}>View Teams</Text>
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonlogin}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            <Text style={styles.buttontext}>EventManager</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};


function TabLogoutHandler() {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    };

    const handleCancel = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chairperson' }],
      });

    };

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", onPress: handleCancel, style: "cancel" },
        { text: "OK", onPress: handleLogout },
      ],
      { cancelable: true }
    );
  }, [navigation]);
  return null;
}

export default function ChairpersonNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Admin') {
            iconName = 'home-outline'; // Use Ionicons icon names
          } else if (route.name === 'Account') {
            iconName = 'person-circle-outline'; // Use Ionicons icon names
          } else if (route.name === 'Logout') {
            iconName = 'exit-outline';
          }
          // Return the Ionicons component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Hide the header for all tabs
      })}
    >
      <Tab.Screen name="Admin" component={Chairperson} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen
        name="Logout"
        component={TabLogoutHandler} // Use LogoutHandler component here
        options={{ tabBarStyle: { display: 'none' } }} // Hide tab bar for Logout screen
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
    flexDirection: 'column',
  },
  buttontext: {
    marginTop: 5,
    fontSize: 20,
    color: '#ffffff',
  },
});




