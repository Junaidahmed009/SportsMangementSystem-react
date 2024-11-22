import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  DropdownComponent,
  ButtonComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function UserHome() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  useEffect(() => {
    const fetchDropDownsessions = async () => {
      try {
        const response = await Api.fetchSessions();
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            const sessionOptions = response.data.map(sessions => ({
              label: sessions.name,
              value: sessions.id,
            }));
            setItems1(sessionOptions);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          Alert.alert(
            'Error fetching dropdown data',
            `Status: ${error.response.status}`,
          );
        } else {
          Alert.alert('Network error', 'Failed to connect to server.');
        }
      }
    };

    fetchDropDownsessions();
  }, []);

  const handlelogin = () => {
    navigation.navigate('Login');
  };
  const handleCricket = () => {
    navigation.navigate('CricketDetails');
  };

  const route = useRoute();
  const message = route.params?.message || ''; // Set fallback if undefined

  const handleTeamRegistration = () => {
    if (message === 'Guest') {
      Alert.alert('Access Denied', 'Guests are not allowed to register teams.');
    } else {
      navigation.navigate('TeamRegistration');
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'BIIT Sports'} handleBackPress={handlelogin} />
      <View style={styles.dropdownContainer}>
        <DropdownComponent
          CustomStyle={{width: '100%'}} // Optional custom styles
          dropDownContainerStyle={{width: '100%'}}
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Events"
          // style={styles.dropdown}
          // dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Enroll Team"
          onPress={handleTeamRegistration}
          CustomStyle={{
            width: '60%',
            //  marginHorizontal: 5,
          }}
        />
      </View>
      <View style={styles.firsttwo}>
        <ButtonComponent
          buttonTitle="Cricket"
          onPress={handleCricket}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
            height: 100, // Adjust this value to increase height
            justifyContent: 'center', // Vertically center the content
            alignItems: 'center', // Horizontally center the content
            borderRadius: 10, // Remove rounded corners (set to 0)
          }}
          customTextstyle={{
            fontSize: 20, // Adjust this value to increase text size
            fontWeight: 'bold', // Optional: make the text bold
            color: 'white', // Optional: change text color
          }}
        />
        <ButtonComponent
          buttonTitle="Football"
          // onPress={Eventmanagerdata}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
            justifyContent: 'center', // Vertically center the content
            alignItems: 'center', // Horizontally center the content
            borderRadius: 10,
          }}
          customTextstyle={{
            fontSize: 20, // Adjust this value to increase text size
            fontWeight: 'bold', // Optional: make the text bold
            color: 'white', // Optional: change text color
          }}
        />
      </View>
      <View style={styles.firsttwo}>
        <ButtonComponent
          buttonTitle="Ludo(Dual)"
          // onPress={Eventmanagerdata}
          CustomStyle={{
            height: 100,
            width: '50%',
            marginHorizontal: 5,
            justifyContent: 'center', // Vertically center the content
            alignItems: 'center', // Horizontally center the content
            borderRadius: 10,
          }}
          customTextstyle={{
            fontSize: 20, // Adjust this value to increase text size
            fontWeight: 'bold', // Optional: make the text bold
            color: 'white', // Optional: change text color
          }}
        />
        <ButtonComponent
          buttonTitle="Badminton(S)"
          // onPress={Eventmanagerdata}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
            justifyContent: 'center', // Vertically center the content
            alignItems: 'center', // Horizontally center the content
            borderRadius: 10,
          }}
          customTextstyle={{
            fontSize: 20, // Adjust this value to increase text size
            fontWeight: 'bold', // Optional: make the text bold
            color: 'white', // Optional: change text color
          }}
        />
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    // // flex: 1,
    // padding: 15,
    // marginTop: 10,
    padding: 20,
    paddingLeft: 15,
    justifyContent: 'center', // Space out dropdowns evenly
    // paddingHorizontal: 10, // Add horizontal padding
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    // flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  firsttwo: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    // }
  },
});
