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
  const handleCreateFixtures = () => {
    navigation.navigate('CricketFixtures');
  };
  const handleEditFixtures = () => {
    navigation.navigate('EditFixtures'); //kal
  };
  const handleStartScoring = () => {
    navigation.navigate('StartScoring');
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
  const handleAppCreadits = () => {
    navigation.navigate('AppCredits');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Cricket Manager"
          titleStyle={styles.appbarTitle}
        />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>WELCOME</Text>

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateFixtures}>
            <Text style={styles.buttonText}>Create Fixtures</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEditFixtures}>
            <Text style={styles.buttonText}>Edit Fixtures</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCricketRules}>
            <Text style={styles.buttonText}>Game Instructions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleteamrequests}>
            <Text style={styles.buttonText}>Team Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleStartScoring}>
            <Text style={styles.buttonText}>Start Scoring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleplayers}>
            <Text style={styles.buttonText}>View Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAppCreadits}>
            <Text style={styles.buttonText}>App Credits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabLogoutHandler() {
  const navigation = useNavigation();

  useEffect(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate('CricketManagerhome'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: 'Login'}]}),
        },
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
          const icons = {
            Cricket: 'home-outline',
            Account: 'person-circle-outline',
            Logout: 'exit-outline',
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        headerShown: false,
        tabBarStyle: {backgroundColor: '#6200ee', paddingBottom: 5},
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#cccccc',
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
    backgroundColor: '#f4f4f8',
  },
  appbar: {
    backgroundColor: '#6200ee',
    elevation: 5,
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  buttonGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#6200ee',
    width: '48%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbarsetting}>
//         <Appbar.Content
//           title="Cricket Manager"
//           titleStyle={styles.appbarTitle}
//         />
//       </Appbar.Header>

//       <View style={styles.content}>
//         <View style={styles.welcometextview}>
//           <Text style={styles.welcometext}>WELCOME</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleCreateFixtures}>
//             <Text style={styles.buttontext}>Create Fixtures</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleEditFixtures}>
//             <Text style={styles.buttontext}>Edit Fixtures</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleCricketRules}>
//             <Text style={styles.buttontext}>Game Instructions</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleteamrequests}>
//             <Text style={styles.buttontext}>Team Requests</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleStartScoring}>
//             <Text style={styles.buttontext}>Start Scoring</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonlogin} onPress={handleplayers}>
//             <Text style={styles.buttontext}>View Teams</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={() => console.log('Pressed')}>
//             <Text style={styles.buttontext}>App Creadits</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// //This function is for logout button in home screen.
// function TabLogoutHandler() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const handleLogout = () => {
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'Login'}],
//       });
//     };

//     const handleCancel = () => {
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'CricketManagerhome'}],
//       });
//     };

//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {text: 'Cancel', onPress: handleCancel, style: 'cancel'},
//         {text: 'OK', onPress: handleLogout},
//       ],
//       {cancelable: true},
//     );
//   }, [navigation]);
//   return null;
// }

// export default function CricketManagerNav() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName;

//           if (route.name === 'Cricket') {
//             iconName = 'home-outline';
//           } else if (route.name === 'Account') {
//             iconName = 'person-circle-outline';
//           } else if (route.name === 'Logout') {
//             iconName = 'exit-outline';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Cricket" component={CricketManagerhome} />
//       <Tab.Screen name="Account" component={Account} />
//       <Tab.Screen
//         name="Logout"
//         component={TabLogoutHandler}
//         options={{tabBarStyle: {display: 'none'}}}
//       />
//     </Tab.Navigator>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'aliceblue',
//   },
//   appbarsetting: {
//     backgroundColor: '#6200ee',
//   },
//   appbarTitle: {
//     fontSize: 26,
//     color: '#ffffff',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   welcometextview: {
//     alignItems: 'center',
//   },
//   welcometext: {
//     color: 'black',
//     marginTop: 20,
//     fontSize: 40,
//   },
//   buttonContainer: {
//     marginTop: 40,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   buttonlogin: {
//     backgroundColor: '#6200ee',
//     width: 180,
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10, // Rounded corners
//   },
//   buttontext: {
//     fontSize: 20,
//     color: '#ffffff',
//   },
// });
