import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function TurnBaseScoring() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Fixtureid, sportName} = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);

  const [checked, setChecked] = useState('option1');
  const [team1Id, setTeam1Id] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Id, setTeam2Id] = useState(null);
  const [team2Name, setTeam2Name] = useState('');
  const [team2Players, setTeam2Players] = useState([]);
  const [team1Data, setteam1Data] = useState({});
  const [team2Data, setteam2Data] = useState({});
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const handlehome = () => {
    navigation.navigate('StartScoring');
  };

  useEffect(() => {
    if (
      ['Ludo-Single', 'Ludo-Dual', 'Ludo-Dual(w)', 'Ludo-Single(w)'].includes(
        sportName,
      )
    ) {
      setItems1([{label: 'Point Scored', value: 'ludo-PointScored'}]);
    } else if (
      [
        'Tug of War',
        'Tug of War(w)',
        'Arm Wrestling',
        'Arm Wrestling(w)',
      ].includes(sportName)
    ) {
      setItems1([{label: 'Power Full Strike', value: 'Power Strike'}]);
    }
  }, [sportName]);
  // ✅ Runs only when sportName changes
  // Fetch Teams and Players
  const FetchTeamsandPlayers = async () => {
    try {
      const response = await Api.fetchteamsandplayers(Fixtureid);
      if (response.status === 200) {
        const data = response.data;
        const {Team1, Team2} = data;

        setTeam1Id(Team1.TeamId);
        setTeam1Name(Team1.TeamName);
        setTeam1Players(Team1.Players);

        setTeam2Id(Team2.TeamId);
        setTeam2Name(Team2.TeamName);
        setTeam2Players(Team2.Players);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Teams or Players Found.');
      } else if (error.response) {
        Alert.alert('Error fetching data', `Status: ${error.response.status}`);
      } else {
        Alert.alert('Error', 'No Teams Selected.');
        handlehome();
      }
    }
  };
  useEffect(() => {
    FetchTeamsandPlayers();
  }, []);

  // Format Players for Dropdown
  const formatPlayersForDropdown = players =>
    players.map(player => ({
      label: player.PlayerName,
      value: player.id,
    }));

  // Update Dropdown Items Based on Selection
  const handleTeamSwitch = () => {
    if (team1Players.length > 0 && team2Players.length > 0) {
      if (checked === 'option1') {
        setItems2(formatPlayersForDropdown(team1Players)); // Batsman
        setItems3(formatPlayersForDropdown(team2Players)); // Bowler
      } else if (checked === 'option2') {
        setItems2(formatPlayersForDropdown(team2Players)); // Batsman
        setItems3(formatPlayersForDropdown(team1Players)); // Bowler
      }
    }
  };

  useEffect(() => {
    handleTeamSwitch();
  }, [checked, team1Players, team2Players]);

  // Handle Input Changes for score,wickets,runs,comments
  const handleInputChange = (field, value) => {
    if (checked === 'option1') {
      setteam1Data(prevData => ({...prevData, [field]: value}));
    } else if (checked === 'option2') {
      setteam2Data(prevData => ({...prevData, [field]: value}));
    }
  };

  //for sending only score,wicket and runs
  const SendEvents = async () => {
    const imgpath =
      serverImagePath && serverImagePath.length > 0
        ? `"${serverImagePath[0]}"`
        : null;
    if (!imgpath) {
      Alert.alert('Please select an image before submitting events.');
      return; // Exit if no image is selected
    }
    // Create payload
    const payload = {
      fixture_id: Fixtureid,
      event_type: value1,
      event_description: team1Data.comments,
      player_id: value2 || null,
      secondary_player_id: value3 || null,
    };

    console.log('Sending Events Payload:', payload);

    try {
      const response = await Api.PostCricketEvents(payload, imgpath);
      if (response.status === 200) {
        Alert.alert('Event Saved Successfully');
        // Reset state
        setValue1(null);
        setValue2(null);
        setValue3(null);
        // setValue4(null);
        setServerImagePath(''); // Clear image path
      } else {
        Alert.alert('Issue', 'Some issue occurred. Try again.');
      }
    } catch (error) {
      // console.error('Event update error:', error);
      Alert.alert(
        'Updation Failed',
        'An error occurred during Event Updation. Please try again.',
      );
    }
  };

  const pickImages = () => {
    if (serverImagePath) {
      Alert.alert('Error', 'Images have already been selected.');
      return;
    }
    launchImageLibrary(
      {mediaType: 'photo', quality: 2}, // Allow multiple selections,, selectionLimit: 0
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'You cancelled image selection.');
        } else if (response.errorCode) {
          Alert.alert(
            'Error',
            `Image selection error: ${response.errorMessage}`,
          );
        } else if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets;
          setImageUri(selectedImages.map(image => image.uri)); // Store all selected URIs
          Alert.alert(
            'Confirm Upload',
            'Do you want to upload the selected images?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Upload',
                onPress: () => uploadImages(selectedImages), // Proceed to upload images
              },
            ],
            {cancelable: false},
          );
        }
      },
    );
  };

  const uploadImages = async images => {
    try {
      const formData = new FormData();

      images.forEach(image => {
        formData.append('files', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });
      // Call the Api.postimage function with the formData and headers
      const response = await Api.postCricketimages(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const serverPaths = response.data; // Assuming the backend returns an array of paths
        setServerImagePath(serverPaths); // Store all server image paths
        console.log(serverPaths);
        Alert.alert('Success', 'Images uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload images to the server.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the images.');
    }
  };
  // const handleCardData = () => {
  //   navigation.navigate('ScoringCard', {Fixtureid});
  // };

  const EndMatch = async () => {
    if (!Fixtureid || !team1Id || !team2Id) {
      Alert.alert('please select value');
    }
    try {
      let payload = {
        winnner_id: checked === 'option1' ? team1Id : team2Id,
        loser_id: checked === 'option1' ? team2Id : team1Id,
        fixture_id: Fixtureid,
      };
      const response = await Api.Endturnbasematch(payload);
      if (response.status === 200) {
        Alert.alert('Winner Updated.');
        handlehome();
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert('Error', 'No Fixture Found');
      } else {
        Alert.alert('Network error', 'Failed to connect to the server.');
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Turn Base Scoring" />
      <View style={styles.teamsContainer}>
        <View style={styles.radioItem}>
          <RadioButton
            value="option1"
            status={checked === 'option1' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option1')}
          />
          <Text style={styles.teamText}>{team1Name}</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="option2"
            status={checked === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option2')}
          />
          <Text style={styles.teamText}>{team2Name}</Text>
        </View>
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sets Won"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          value={checked === 'option1' ? team1Data.Sets : team2Data.Sets}
          onChangeText={value => handleInputChange('Sets', value)}
        />
      </View> */}
      <TextInput
        style={styles.commentsInput}
        placeholder="...Description"
        placeholderTextColor={'black'}
        multiline
        value={checked === 'option1' ? team1Data.comments : team2Data.comments}
        onChangeText={value => handleInputChange('comments', value)}
      />
      <View style={styles.drop1}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Events"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.drop2}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder={checked === 'option1' ? team1Name : team2Name}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
        <View style={styles.drop3}>
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            placeholder={checked === 'option1' ? team2Name : team1Name}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      </View>
      <View style={styles.finalScoreContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImages}>
          <Text style={styles.actionButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>
        Press End Match buttons and select a winner team.
      </Text>
      <Text style={styles.warningText}>Save button is only for Events.</Text>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={SendEvents}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={EndMatch}>
          <Text style={styles.actionButtonText}>End Match</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 20,
  },
  matchTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  matchtext: {
    alignItems: 'center',
    margin: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  teamButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    margin: 5,
  },
  teamText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  battingTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '100%',
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    textAlign: 'center',
    color: 'black',
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    height: 100,
    marginVertical: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
  addImageButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  imageButton: {
    alignItems: 'center',
    marginTop: 30,
  },
  addImageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  // finalScoreText: {
  //   marginLeft: 8,
  //   fontSize: 16,
  //   color: 'black',
  // },
  warningText: {
    color: 'red',
    marginVertical: 5,
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures equal spacing between the dropdowns
    alignItems: 'center', // Vertically centers the dropdowns
    marginVertical: 10, // Adds some spacing above and below the row
  },
  drop1: {
    zIndex: 10000, // Higher zIndex for the first dropdown
    marginBottom: 10,
    // flex: 1, // Makes the first dropdown take equal space
    marginHorizontal: 7, // Adds horizontal spacing between dropdowns
  },
  drop2: {
    flex: 1, // Makes the second dropdown take equal space
    marginHorizontal: 5,
  },
  drop3: {
    flex: 1, // Makes the third dropdown take equal space
    marginHorizontal: 5,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    height: 40, // Adjust height as needed
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
});

///-------
