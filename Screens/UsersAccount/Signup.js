import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Appbar } from 'react-native-paper';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [name, setName] = React.useState("");
  const [regno, setRegno] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRepass] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!name || !regno || !pass || !repass) {
      Alert.alert('Fill all the given fields.');
      return;
    }

    if (pass !== repass) {
      Alert.alert('Passwords do not match.');
      return;
    }

    const user = {
      name,
      registration_no: regno,
      password: pass,
      role: 'user',
    };

    setLoading(true);
    try {
      const response = await Api.signup(user);

      if (response.status === 201) { 
        setName('');
        setRegno('');
        setPass('');
        setRepass('');
        Alert.alert(
          'Signup successful!',
          'You can now log in.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
       
        Alert.alert('Signup failed', 'In response status 201 field.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert('Registration number already exists.');
      }
       else {
        // Handle other errors
        console.error('Signup error:', error);
        Alert.alert('Signup failed', 'An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleBackPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
        <Appbar.Content title="Signup" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput
          style={styles.textbox1}
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.textbox1}
          label="Regno(2021-Arid-0123)"
          value={regno}
          onChangeText={text => setRegno(text)}
        />
        <TextInput
          style={styles.textbox1}
          label="Password"
          secureTextEntry
          value={pass}
          onChangeText={text => setPass(text)}
        />
        <TextInput
          style={styles.textbox1}
          label="Re-enter Password"
          secureTextEntry
          value={repass}
          onChangeText={text => setRepass(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSignup}
            disabled={loading}
            style={styles.buttonlogin}
            mode="contained"
            labelStyle={{ fontSize: 17, color: '#ffffff' }}
          >
            SIGNUP
          </Button>
        </View>
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonlogin: {
    backgroundColor: '#6200ee',
    width: 200,
    height: 40,
  },
});




