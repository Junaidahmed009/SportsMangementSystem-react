import { View, Text, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native'
import * as React from 'react';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

export default function Login() {

  const [regno, setRegno] = React.useState("");
  const [pass, setpass] = React.useState("");
  const navigation = useNavigation();

const navchairperson=()=>{
  navigation.navigate('Chairperson')
}
  
  const handleLogin = async () => {
    if (!regno || !pass) {
      Alert.alert("Please fill both fields.");
      return;
    }

    const loginUser = {
      registration_no: regno,
      password: pass,
    };

    try {
      const response = await Api.login(loginUser);

      if (response.status === 200) {
        const receivedUser = response.data;

        // Compare the received object with the sent object
        if (receivedUser.role === 'Chairperson') {
          setRegno('');
          setpass('');
          navchairperson();
          // navigation.navigate('Chairperson')
          // Alert.alert('Welcome, Chairperson.');
        } else if (receivedUser.role === 'Event manager') {
          setRegno('');
          setpass('');
          Alert.alert('Welcome,Event manager');
          
        }
        else if (receivedUser.role === 'user') {
          // Alert.alert('Welcome,User');
          navigation.navigate('Home')
        } else {
          Alert.alert('Welcome');
        }


        // Pass the received object to another screen
        // navigation.navigate('NextScreen', { user: receivedUser });

      } else {
        Alert.alert('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Registration number is incorrect.');
      } else if (error.response && error.response.status === 401) {
        Alert.alert('Password is incorrect.');
      } else {
        Alert.alert('An error occurred during login. Please try again.');
      }
    }
  };
  const handleforget = () => {
    navigation.navigate('Forgetpassowrd')
  }
  const handleSignup = () => {
    navigation.navigate('Signup')
  }
  // const handlechairperson=()=>{
  //   navigation.navigate('Chairperson')
  // }



  return (

    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting} >
        <Appbar.Content title="Login"
          titleStyle={styles.appbarTitle}
        />

      </Appbar.Header>
      <View style={styles.content} >

        <TextInput
          style={styles.textbox1}
          label="Regno(2021-Arid-0123)"
          value={regno}
          onChangeText={regno => setRegno(regno)}
        />
        <TextInput

          style={styles.textbox2}
          label="Password"
          value={pass}
          onChangeText={pass => setpass(pass)}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonlogin}
            mode="contained" onPress={handleLogin}
            labelStyle={{ fontSize: 17, color: '#ffffff' }}
          >
            LOGIN
          </Button>
        </View>

        <Button onPress={handleforget}
          labelStyle={{ fontSize: 14, color: '#6200ee' }}
        >
          Forget Password?
        </Button>
        <Button onPress={handleSignup}
          labelStyle={{ fontSize: 14, color: '#6200ee' }}
        >
          Create New Account
        </Button>
        <Button onPress={() => console.log('Pressed')}
          labelStyle={{ fontSize: 14, color: '#6200ee' }}
        >
          Guest
        </Button>
      </View>
    </SafeAreaView>



  )
};
const styles = StyleSheet.create({
  container: {// for contrlling whole screen.
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  appbarsetting: {
    backgroundColor: '#6200ee',
    fontSize: 456,
  },
  appbarTitle: {
    fontSize: 26, // Set the font size of the app bar title
    color: '#ffffff',

  },
  content: {//for controlling view of textboxes and bttons
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textbox1: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  textbox2: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    // fontSize: 23,

  },
  buttonContainer: {
    alignItems: 'center', // Center horizontally
    marginTop: 40, // Optional: adjust spacing as needed
    fontSize: 400,
    marginBottom: 7,

  },
  buttonlogin: {
    backgroundColor: '#6200ee',
    width: 200,
    height: 40,
  },


})