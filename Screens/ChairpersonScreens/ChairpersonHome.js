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
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Chairperson" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* <LinearGradient colors={['#E0EAFC', '#CFDEF3']} style={styles.content}> */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>WELCOME</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleAddsessions} text="Add Session" />
        <CustomButton
          onPress={handleEventmanagerselection}
          text="Add Games & EMs"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleRules} text="Edit Instructions" />
        <CustomButton onPress={handleAddEventmanager} text="Edit User Role" />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleAddNewGame} text="Add Game" />
        <CustomButton onPress={() => console.log('Pressed')} text="Sessions" />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleViewManagers} text="View Managers" />
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
}

const CustomButton = ({onPress, text}) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

function TabLogoutHandler() {
  const navigation = useNavigation();

  useEffect(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: 'Chairperson'}]}),
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

export default function ChairpersonNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = {
            Admin: 'home-outline',
            Account: 'person-circle-outline',
            Logout: 'exit-outline',
          }[route.name];

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
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
  },
  appbar: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Adjusted padding for overall content
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10, // Added padding to prevent buttons from touching edges
  },
  button: {
    backgroundColor: '#6200ee',
    width: '48%', // Ensures buttons don’t touch each other
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbarsetting}>
//         <Appbar.Content title="Chairperson" titleStyle={styles.appbarTitle} />
//       </Appbar.Header>

//       <View style={styles.content}>
//         <View style={styles.welcometextview}>
//           <Text style={styles.welcometext}>WELCOME</Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleAddsessions}>
//             <Text style={styles.buttontext}>Add Session</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleEventmanagerselection}>
//             <Text style={styles.buttontext}>Add Games&EMs</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonlogin} onPress={handleRules}>
//             <Text style={styles.buttontext}>Edit Instructions</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleAddEventmanager}>
//             <Text style={styles.buttontext}>Edit User Role</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleAddNewGame}>
//             <Text style={styles.buttontext}>Add Game</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={() => console.log('Pressed')}>
//             <Text style={styles.buttontext}>Sessions</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.buttonlogin}
//             onPress={handleViewManagers}>
//             <Text style={styles.buttontext}>View Managers</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

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
//         routes: [{name: 'Chairperson'}],
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

// export default function ChairpersonNav() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName;

//           if (route.name === 'Admin') {
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
//       <Tab.Screen name="Admin" component={Chairperson} />
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
