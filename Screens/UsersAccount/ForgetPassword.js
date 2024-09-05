import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Appbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

export default function ForgetPassword() {
  const [name, setName] = React.useState("");
  const [regno, setRegno] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRepass] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const navigation = useNavigation();

  const handleForgetPassword = async () => {
    if (!name || !regno) {
      Alert.alert('Please fill both the name and registration number fields.');
      return;
    }

    const userdetails = {
      name,
      registration_no: regno,
    };

    setLoading(true);
    try {
      const response = await Api.forgetpassword(userdetails);

      if (response.status === 200) {
        Alert.alert('Now enter the password in both fields.');
        setShowPasswordFields(true); n
      } else {
        Alert.alert('Unexpected status code received.');
      }
    } catch (error) {

      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'Invalid username or registration number.');
      } else {
        console.error('Network or server error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleSubmitNewPassword = async () => {
    if (pass !== repass) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const passwordDetails = {
      registration_no: regno,
      password: pass,
    };

    setLoading(true);
    try {
      const response = await Api.resetPassword(passwordDetails);

      if (response.status === 201) {
        Alert.alert('Success', 'Password reset successfully.');
        navigation.navigate('Login');
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'Registration number is incorrect or changed. Please correct it.');
      } else {
        console.error('Network or server error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlelogin = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handlelogin} color="#ffffff" />
        <Appbar.Content title="Forget Password" titleStyle={styles.appbarTitle} />
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
          label="Registration Number"
          value={regno}
          onChangeText={text => setRegno(text)}
        />

        {showPasswordFields && (
          <>
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
                onPress={handleSubmitNewPassword}
                disabled={loading}
                style={styles.buttonlogin}
                mode="contained"
                labelStyle={{ fontSize: 17, color: '#ffffff' }}
              >
                SAVE
              </Button>
            </View>
          </>
        )}

        {!showPasswordFields && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleForgetPassword}
              disabled={loading}
              style={styles.buttonlogin}
              mode="contained"
              labelStyle={{ fontSize: 17, color: '#ffffff' }}
            >
              VERIFY
            </Button>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#6200ee" />}
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
