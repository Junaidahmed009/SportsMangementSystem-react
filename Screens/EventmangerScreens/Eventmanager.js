import React from 'react';
import { SafeAreaView, StyleSheet, Alert , TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

import Login from '../UsersAccount/Login';

const Tab = createBottomTabNavigator();

export default function Eventmanager() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route}) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
           
            if (route.name === 'Home') {
              iconName = 'home-outline'; // Use Ionicons icon names
            } else if (route.name === 'Account') {
              iconName = 'person-circle-outline'; // Use Ionicons icon names
            }else if(route.name=='Logout'){
              iconName='exit-outline'
            }

            // Return the Ionicons component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false, // Hide the header for all tabs
        })}
      >
         {/* <Tab.Screen name="Account" component={Screen2} /> */}
        {/* <Tab.Screen name="Home" component={Screen1} /> */}
        <Tab.Screen name='Logout' component={Login} 
        options={{ tabBarStyle: { display: 'none' } }} // Hide tab bar for Login screen
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
