import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  TextInputComponent,
  ButtonComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';

export default function AddEventmanager() {
  const navigation = useNavigation();
  const [regno, setregno] = useState('');

  const Eventmanagerdata = async () => {
    if (!regno) {
      Alert.alert('Please Enter Registration-no');
      return; // Add return to stop execution
    }

    const data = {
      registration_no: regno,
    };

    try {
      const response = await Api.eventmanagerdata(data);
      if (response.status === 201) {
        Alert.alert(
          'Manager Created',
          'The user has been successfully promoted to Event Manager.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Chairperson');
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('User not Found.');
      } else if (error.response && error.response.status === 400) {
        Alert.alert('User is Already Event Manager.');
      } else {
        // console.error('error:', error);
        Alert.alert(
          'Registration failed',
          'An error occurred during registration. Please try again.',
        );
      }
    }
  };
  const handlechairperson = () => {
    navigation.navigate('Chairperson');
  };

  // The return statement needs to be inside the function
  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Add Managers'}
        handleBackPress={handlechairperson}
      />
      <View>
        <TextInputComponent
          placeholder="Reg-no(2000-arid-111)"
          textValue={regno}
          onChangeText={regno => setregno(regno)}
          CustomStyle={{
            // padding:20,
            // width:'90%',
            marginTop: 30,
            marginHorizontal: 10,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Ok"
          onPress={Eventmanagerdata}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
        <ButtonComponent
          buttonTitle="Cancel"
          onPress={handlechairperson}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
});
