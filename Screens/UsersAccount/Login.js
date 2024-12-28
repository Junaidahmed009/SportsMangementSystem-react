import {View, Text, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native';
import * as React from 'react';
import {TextInput, Button, Appbar, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import {storeUserData} from './UserData';

export default function Login() {
  const [regno, setRegno] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Added loading state
  const navigation = useNavigation();

  const navChairperson = () => {
    navigation.navigate('Chairperson');
  };
  // const handleallEventmanagershome = () => {
  //   navigation.navigate('ManagerHome');
  // };
  const handleAllEventManagershome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const handleUserhome = () => {
    navigation.navigate('UserHome');
  };
  const handleGuest = () => {
    const responseMessage = 'Guest';
    navigation.navigate('UserHome', {message: responseMessage});
  };

  const handleLogin = async () => {
    if (!regno || !pass) {
      Alert.alert('Please fill both fields.');
      return;
    }

    const loginUser = {
      registration_no: regno,
      password: pass,
    };

    setLoading(true); // Start loading

    try {
      const response = await Api.login(loginUser);

      if (response.status === 200) {
        const receivedUser = response.data;
        console.log(receivedUser);
        storeUserData(receivedUser); // Store user data

        if (receivedUser.role === 'Admin') {
          setRegno('');
          setPass('');
          navChairperson();
        } else if (
          receivedUser.role === 'EventManager' &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(
            receivedUser.SportId,
          )
        ) {
          setRegno('');
          setPass('');
          handleAllEventManagershome();
        } else if (receivedUser.role === 'user') {
          setRegno('');
          setPass('');
          handleUserhome();
        } else {
          Alert.alert('Welcome');
        }
      } else {
        Alert.alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Registration number or password is incorrect.');
      } else if (error.response && error.response.status === 409) {
        Alert.alert('You are no longer Event manager.');
        setRegno('');
        setPass('');
        handleUserhome();
      } else {
        Alert.alert('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleForget = () => {
    navigation.navigate('Forgetpassword');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.Content title="Login" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <View style={styles.content}>
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
          onChangeText={pass => setPass(pass)}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" /> // Show loading indicator
          ) : (
            <Button
              style={styles.buttonlogin}
              mode="contained"
              onPress={handleLogin}
              labelStyle={{fontSize: 17, color: '#ffffff'}}>
              LOGIN
            </Button>
          )}
        </View>

        <Button
          onPress={handleForget}
          labelStyle={{fontSize: 14, color: '#6200ee'}}>
          Forget Password?
        </Button>
        <Button
          onPress={handleSignup}
          labelStyle={{fontSize: 14, color: '#6200ee'}}>
          Create New Account
        </Button>
        <Button
          onPress={handleGuest}
          labelStyle={{fontSize: 14, color: '#6200ee'}}>
          Guest
        </Button>
      </View>
    </SafeAreaView>
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
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 7,
  },
  buttonlogin: {
    backgroundColor: '#6200ee',
    width: 200,
    height: 40,
  },
});
