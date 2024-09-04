import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
  const [name, setName] = React.useState("");
  const [regno, setRegno] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [repass, setRepass] = React.useState("");
  const navigation = useNavigation();
  const handlelogin = () => {
    navigation.navigate('Login')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handlelogin} color="#ffffff" />
        <Appbar.Content title="Foreget Password" titleStyle={styles.appbarTitle} />
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
            // onPress={()=>navigation.navigate('Login')}
            // disabled={loading}
            style={styles.buttonlogin}
            mode="contained"
            labelStyle={{ fontSize: 17, color: '#ffffff' }}
          >
            SAVE
          </Button>
        </View>

      </View>

    </SafeAreaView>
  )
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