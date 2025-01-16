import {View, Text, Alert, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  DropdownComponent,
  ButtonComponent,
  TextInputComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';
import {getUserData} from '../UsersAccount/UserData';

export default function TeamRegistration() {
  const navigation = useNavigation();
  const userData = getUserData();
  const [tname, setname] = useState();
  const [sportsopen, setSportsopen] = useState(false);
  const [sportsvalue, setSportsvalue] = useState(null);
  const [sportsitems, setSportsItems] = useState([]);

  const [openCourse, setOpenCourse] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSemNo, setOpenSemNo] = useState(false);
  const [valueCourse, setValueCourse] = useState(null);
  const [valueSection, setValueSection] = useState(null);
  const [valueSemNo, setValueSemNo] = useState(null);

  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);

  const Courses = [
    {label: 'BSCS', value: 'BCS'},
    {label: 'BSIT', value: 'BIT'},
    {label: 'BSCS(AI)', value: 'BSCS(AI)'},
    {label: 'BSSE', value: 'BSSE'},
  ];
  const Semesterno = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    // {label: '9', value: '9'},
    // {label: '10', value: '10'},
    // {label: '11', value: '11'},
    // {label: '12', value: '12'},
  ];
  const Sections = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'E', value: 'E'},
  ];

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await Api.fetchteamSports();

      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const Sportsdata = response.data.map(sport => ({
            label: sport.games,
            value: sport.id,
          }));
          setSportsItems(Sportsdata);
        } else {
          // console.error('Expected an array but got:', response.data);
        }
      } else {
        // console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No data found for Sports');
      } else if (error.response) {
        Alert.alert(
          'Error fetching dropdown data',
          // `Status: ${error.response.status}`,
        );
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };
  handleUserhome = () => {
    navigation.navigate('UserHome');
  };
  const TeamCheck = async () => {
    if (
      !tname ||
      !valueCourse ||
      !valueSection ||
      !valueSemNo ||
      !serverImagePath
    ) {
      Alert.alert('Alert', 'Please check all fields');
      return;
    }
    let teamdata;
    if (
      sportsvalue === 3 ||
      sportsvalue === 5 ||
      sportsvalue === 8 ||
      sportsvalue === 9 ||
      sportsvalue === 11 ||
      sportsvalue === 13 ||
      sportsvalue === 14
    ) {
      teamdata = {
        Name: tname,
        className: `${valueCourse}-${valueSection}${valueSemNo}`,
        Caption_id: userData.id,
        Sports_id: sportsvalue,
        Image_path: serverImagePath,
        TeamStatus: 0,
        TeamType: 'SingleUser',
      };
    } else {
      teamdata = {
        Name: tname,
        ClassName: `${valueCourse}-${valueSection}${valueSemNo}`,
        Caption_id: userData.id,
        Sports_id: sportsvalue,
        Image_path: serverImagePath,
        TeamStatus: 0,
        TeamType: 'DoubleUsers',
      };
    }
    try {
      const response = await Api.postteamdata(teamdata);
      if (response.status === 201) {
        Alert.alert('Sucess', 'You Team is Registered');
        handleUserhome();
      } else if (response.status === 200) {
        const teamdata = response.data;
        const teamId = teamdata.id;
        const userId = userData.id;
        const sportsid = sportsvalue;
        Alert.alert('Team is registered.');
        handleplayersRegistration(teamId, userId, sportsid);
      } else {
        Alert.alert('Unexpected response. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const {status, data} = error.response;

        if (status === 409 && (data.errorcode === 5 || data.errorcode === 6)) {
          Alert.alert('Alert', 'Some issue in registration, please try later.');
        } else if (status === 404 && data.errorcode === 1) {
          Alert.alert('Alert', 'New Session not Started yet.');
        } else if (status === 409 && data.errorcode === 3) {
          Alert.alert('Alert', 'Team with same name already registered');
        } else if (status === 409 && data.errorcode === 4) {
          Alert.alert(
            'Alert',
            'User is already captain of another team in the current session',
          );
        } else {
          Alert.alert(
            'Error fetching data',
            //  `Status: ${status}`
          );
        }
      } else if (error.response) {
        Alert.alert('Error', 'Unexpected error structure in response');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
      // console.error('Error details:', error);
    }
  };
  const handleplayersRegistration = (teamId, userId, sportsid) => {
    navigation.navigate('PlayersRegistration', {teamId, userId, sportsid});
    // console.log(teamId, userId, sportsid);
  };
  const pickImage = () => {
    if (serverImagePath) {
      Alert.alert('Error', 'Image Already selected.');
      return;
    }
    launchImageLibrary({mediaType: 'photo', quality: 2}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled image selection.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Image selection error: ${response.errorMessage}`);
      } else if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        Alert.alert(
          'Confirm Upload',
          'Do you want to upload this image?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Upload',
              onPress: () => uploadImage(selectedImage), // Proceed to upload the image
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  const uploadImage = async image => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });

      // Call the Api.postimage function with the formData and headers
      const response = await Api.postCricketimages(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const serverPath = response.data[0]; // Assuming the backend returns an array of paths
        setServerImagePath(serverPath);
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload image to the server.');
      }
    } catch (error) {
      // console.error(error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Register Team'}
        handleBackPress={handleUserhome}
      />
      <View>
        <TextInputComponent
          placeholder="Team Name"
          textValue={tname}
          onChangeText={tname => setname(tname)}
          CustomStyle={{
            // padding:20,
            // width:'90%',
            marginTop: 30,
            marginHorizontal: 10,
          }}
        />
      </View>
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '100%', height: 50}}
            dropDownContainerStyle={{
              width: '100%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openCourse}
            value={valueCourse}
            items={Courses}
            setOpen={setOpenCourse}
            setValue={setValueCourse}
            placeholder="Course"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '100%', height: 50}}
            dropDownContainerStyle={{
              width: '100%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openSection}
            value={valueSection}
            items={Sections}
            setOpen={setOpenSection}
            setValue={setValueSection}
            placeholder="Section"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '90%', height: 50}}
            dropDownContainerStyle={{
              width: '90%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openSemNo}
            value={valueSemNo}
            items={Semesterno}
            setOpen={setOpenSemNo}
            setValue={setValueSemNo}
            placeholder="SemNo"
          />
        </View>
      </View>
      <View style={styles.sportsdropdown}>
        <DropdownComponent
          CustomStyle={{width: '95%', height: 25}} // Optional custom styles
          dropDownContainerStyle={{
            width: '95%',
            position: 'absolute',
            zIndex: 10500,
          }}
          open={sportsopen}
          value={sportsvalue}
          items={sportsitems}
          setOpen={setSportsopen}
          setValue={setSportsvalue}
          setItems={setSportsItems}
          placeholder="Select Sports"
          // style={styles.dropdown}
          // dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.container}>
        <ButtonComponent
          buttonTitle="Pick Image"
          onPress={pickImage}
          CustomStyle={{
            width: '50%',
          }}
        />

        {imageUri && (
          <View style={styles.card}>
            <Image source={{uri: imageUri}} style={styles.image} />
            <Text style={styles.cardText}>Selected Image</Text>
          </View>
        )}

        {/* {serverImagePath && (
          <Text style={styles.serverPathText}>
            Server Path: {serverImagePath}
          </Text>
        )} */}
      </View>

      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Next"
          onPress={TeamCheck}
          CustomStyle={{
            width: '100%',
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
    alignitems: 'center',
  },
  sportsdropdown: {
    marginTop: 20,
    marginBottom: 5,
    // width: '90%',
    maxWidth: 600,
    // alignSelf: 'center',
    // alignItems:'center'
  },
  buttons: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 20,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
  },

  container: {
    // flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -20,
  },
  card: {
    width: 380,
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
