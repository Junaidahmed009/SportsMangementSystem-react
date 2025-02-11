import {View, Text, Alert, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserHome() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [Sports, setSports] = useState([]);

  useEffect(() => {
    fetchsessionsandsports();
  }, []);

  const fetchsessionsandsports = async () => {
    try {
      const response = await Api.fetchSessions();

      if (response.status === 200) {
        const {Sport, session} = response.data;

        const sessionOptions = session.map(item => ({
          label: item.name,
          value: item.id,
        }));

        const sportsOptions = Sport.map(item => ({
          label: item.games,
          value: item.id,
        }));

        setItems1(sessionOptions);
        setSports(sportsOptions);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // console.error('Error fetching data:', error);
      Alert.alert(
        'Error',
        error.response
          ? `Status: ${error.response.status} - ${
              error.response.data || 'Unknown error'
            }`
          : 'Network error: Failed to connect to server.',
      );
    }
  };

  const handlelogin = () => {
    navigation.navigate('Login');
  };
  const handleusersearch = () => {
    navigation.navigate('SearchUser');
  };

  const route = useRoute();
  const message = route.params?.message || ''; // Set fallback if undefined

  const handleTeamRegistration = () => {
    if (message === 'Guest') {
      // console.log(message);
      Alert.alert('Access Denied', 'Guests are not allowed to register teams.');
    } else {
      navigation.navigate('TeamRegistration');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.buttonContainer}>
      <ButtonComponent
        buttonTitle={item.label}
        onPress={() => handleFixtures(item.value)}
        CustomStyle={styles.button}
        customTextstyle={styles.buttonText}
      />
    </View>
  );
  const handleFixtures = Sportid => {
    if (!value1) {
      Alert.alert('Select an Event');
      return;
    }
    navigation.navigate('Fixtures', {Sportid, value1});
  };
  const handleInstructions = () => {
    navigation.navigate('UserInstructions');
  };
  const handleuserScores = () => {
    if (!value1) {
      // console.log(message);
      Alert.alert('Select an Event');
    } else {
      navigation.navigate('UserScoreSearch', {value1});
    }
  };

  const handleCaption = () => {
    if (message === 'Guest') {
      // console.log(message);
      Alert.alert('Access Denied', 'Login to view Team Status.');
    } else {
      navigation.navigate('CaptionTeams');
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="BIIT Sports" handleBackPress={handlelogin} />
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Select Event"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainer}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Enroll Team"
          onPress={handleTeamRegistration}
          CustomStyle={styles.enrollButton}
        />
      </View>
      <View style={styles.container2}>
        <View style={styles.card}>
          <View style={styles.buttonContainer2}>
            <ButtonComponent
              buttonTitle="Team Status"
              onPress={handleCaption}
              CustomStyle={styles.button2}
              customTextstyle={styles.buttonText2}
            />
            <ButtonComponent
              buttonTitle="Instructions"
              onPress={handleInstructions}
              CustomStyle={styles.button2}
              customTextstyle={styles.buttonText2}
            />
          </View>
          <View style={styles.buttonContainer3}>
            <ButtonComponent
              buttonTitle="Search User"
              onPress={handleusersearch}
              CustomStyle={styles.button2}
              customTextstyle={styles.buttonText2}
            />
            <ButtonComponent
              buttonTitle="User Score"
              onPress={handleuserScores}
              CustomStyle={styles.button2}
              customTextstyle={styles.buttonText2}
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.flatListview}> */}
      <FlatList
        data={Sports}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.value.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      {/* </View> */}
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 16,
  },
  buttons: {
    alignItems: 'center',
    marginVertical: 10,
  },
  enrollButton: {
    width: '60%',
    paddingVertical: 10,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
  },
  button: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flatListContainer: {
    padding: 10,
  },
  container2: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optional for overall screen
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adds space between buttons
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adds space between buttons
    marginTop: 10,
  },
  button2: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#6200ee', // Button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
