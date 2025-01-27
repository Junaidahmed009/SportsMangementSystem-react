import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {RadioButton, Checkbox} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function CricketScoring() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Fixtureid} = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6]);

  const [scorechecked, setscorechecked] = useState(null); // Tracks the selected radio button
  const [selectedWicket, setSelectedWicket] = useState(''); // State to store the selected radio button
  const [wicket, setwicket] = useState([
    'Bold',
    'Stumps',
    'Caught',
    'Hit Wicket',
  ]);
  const [items5, setItems5] = useState([
    {label: 'Wide', value: 'Wide'},
    {label: 'No Ball', value: 'No Ball'},
    {label: 'Bye', value: 'Bye'},
    {label: 'Leg Bye', value: 'Leg Bye'},
    {label: 'Pelanty Runs', value: 'Pelanty Runs'},
  ]);
  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState(null);
  const [extraruns, setextraruns] = useState('');
  // const [text, setText] = useState('');

  const [checked, setChecked] = useState('option1');
  const [runoutchecked, setrunoutchecked] = useState('option3');
  const [box1checked, setbox1checked] = useState(false);
  const [box2checked, setbox2checked] = useState(false);
  const [team1Id, setTeam1Id] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Id, setTeam2Id] = useState(null);
  const [team2Name, setTeam2Name] = useState('');
  const [team2Players, setTeam2Players] = useState([]);
  const [team1Data, setteam1Data] = useState({
    score: '',
    overs: 0,
    ballNo: 0,
    wicket: '',
    // comments: '',
  });
  const [team2Data, setteam2Data] = useState({
    score: '',
    overs: 0,
    ballNo: 0,
    wickets: '',
    // comments: '',
  });

  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const handlehome = () => {
    navigation.navigate('StartScoring');
  };
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
  // const ShowExtraDropdown = () => {

  // };
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
        setItems1(formatPlayersForDropdown(team1Players)); // Batsman
        setItems2(formatPlayersForDropdown(team1Players)); // Batsman
        setItems3(formatPlayersForDropdown(team2Players)); // Bowler
        setItems4(formatPlayersForDropdown(team2Players)); // Fielder
      } else if (checked === 'option2') {
        setItems1(formatPlayersForDropdown(team2Players)); // Batsman
        setItems2(formatPlayersForDropdown(team2Players)); // Batsman
        setItems3(formatPlayersForDropdown(team1Players)); // Bowler
        setItems4(formatPlayersForDropdown(team1Players)); // Fielder
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
  const incrementBallNo = () => {
    if (checked === 'option1') {
      if (team1Data.ballNo >= 6) {
        setteam1Data(prevData => ({
          ...prevData,
          overs: prevData.overs + 1,
          ballNo: 0,
        }));
        Alert.alert('Over Completed');
        return;
      }
      setteam1Data(prevData => ({...prevData, ballNo: prevData.ballNo + 1}));
    } else if (checked === 'option2') {
      if (team2Data.ballNo >= 6) {
        setteam2Data(prevData => ({
          ...prevData,
          overs: prevData.overs + 1,
          ballNo: 0,
        }));
        Alert.alert('Over Completed');
        return;
      }
      setteam2Data(prevData => ({...prevData, ballNo: prevData.ballNo + 1}));
    }
  };
  const handleWicketPress = num => {
    setSelectedWicket(num);
    if (checked === 'option1') {
      // // wickettype(num);
      // setwicket(num);
      // // Update team1Data with the selected wicket
      setteam1Data(prevData => ({
        ...prevData,
        wicket: num,
      }));
    }
  };
  const SendBackendData = async () => {
    let outplyerid;
    let wickettype;
    // let outplayerid;
    if (runoutchecked === 'option3') {
      outplyerid = value1;
      wickettype = 'runout';
    } else if (runoutchecked === 'option4') {
      outplyerid = value2;
      wickettype = 'runout';
    } else if (selectedWicket != null) {
      outplyerid = value1;
      wickettype = team1Data.wicket;
    }
    let extra1;
    if (value5 === 'Wide' || value5 === 'No Ball') {
      extra1 = 1;
    }
    // }else if()

    let payload = {
      Teamid: checked === 'option1' ? team1Id : team2Id,
      Score: checked === 'option1' ? team1Data.score : team2Data.score,
      Over: checked === 'option1' ? team1Data.overs : team2Data.overs,
      ballNo: checked === 'option1' ? team1Data.ballNo : team2Data.ballNo,
      // wicket_type: checked === 'option1' ? team1Data.wicket : team2Data.wicket,
      wicket_type: wickettype || null,
      dismissed_player_id: outplyerid || null,
      Striker: value1 || null,
      non_striker: value2 || null,
      Bowler: value3 || null,
      fielder_id: value4 || null,
      FixtureId: Fixtureid,
      wicket: selectedWicket || null,
      extras: value5 || null,
      extra_runs: extraruns || null,
    };
    // if (box1checked) {
    //   Alert.alert('hello');
    // }
    console.log(payload);

    // Validate required fields for sending events
    // const isEventValid = value1 || value2 || value3;
    // const imgpath =
    //   serverImagePath && serverImagePath.length > 0
    //     ? `"${serverImagePath[0]}"`
    //     : null;

    // if (isEventValid && !imgpath) {
    //   Alert.alert('Please select an image before submitting events.');
    //   return; // Exit if validation fails
    // }

    // if (isEventValid) {
    //   await SendEvents(imgpath); // Pass imgpath to SendEvents
    // }

    // try {
    //   const response = await Api.PostCricketScore(payload);
    //   if (response.status === 200) {
    //     Alert.alert('Score Updated');
    //   } else {
    //     Alert.alert('Issue', 'Some issue in Score updation. Try again.');
    //   }
    // } catch (error) {
    //   console.error('Score update error:', error);
    //   Alert.alert(
    //     'Updation Failed',
    //     'An error occurred during Score Updation. Please try again.',
    //   );
    // }
  };

  //for sending only score,wicket and runs
  // const SendEvents = async imgpath => {
  //   if (!imgpath) {
  //     Alert.alert('Please select an image before submitting events.');
  //     return; // Exit if no image is selected
  //   }

  //   // Create payload
  //   const payload = {
  //     fixture_id: Fixtureid,
  //     event_type: value1,
  //     event_description: team1Data.comments,
  //     player_id: value2 || null,
  //     secondary_player_id: value3 || null,
  //     fielder_id: value4 || null,
  //   };

  //   console.log('Sending Events Payload:', payload);

  //   try {
  //     const response = await Api.PostCricketEvents(payload, imgpath);
  //     if (response.status === 200) {
  //       Alert.alert('Event Saved Successfully');
  //       // Reset state
  //       setValue1(null);
  //       setValue2(null);
  //       setValue3(null);
  //       setValue4(null);
  //       setServerImagePath(''); // Clear image path
  //     } else {
  //       Alert.alert('Issue', 'Some issue occurred. Try again.');
  //     }
  //   } catch (error) {
  //     console.error('Event update error:', error);
  //     Alert.alert(
  //       'Updation Failed',
  //       'An error occurred during Event Updation. Please try again.',
  //     );
  //   }
  // };

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

  // const EndMatch = async () => {
  //   try {
  //     const response = await Api.EndCricketMatch(Fixtureid);
  //     if (response.status === 200) {
  //       Alert.alert('Winner Updated.');
  //       handleCardData();
  //     } else {
  //       Alert.alert('Error', `Unexpected response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       Alert.alert('Error', 'Scores for one or both teams not found.');
  //     } else if (error.response && error.response.status === 409) {
  //       Alert.alert('Error', 'Scores Are Level Please Update');
  //     } else {
  //       Alert.alert('Network error', 'Failed to connect to the server.');
  //     }
  //   }
  // };

  const handleRadioPress = num => {
    setscorechecked(num); // Set the selected number
    if (checked === 'option1') {
      setteam1Data(prevData => ({...prevData, score: num}));
    } else {
      setteam2Data(prevData => ({...prevData, score: num}));
    }
    // console.log(`Selected Number: ${num}`); // Print the selected number
  };
  useEffect(() => {
    // Reset the selected radio button when switching between options
    setscorechecked(null);
  }, [checked]);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Scoring Cricket" />
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Score"
          keyboardType="numeric"
          value={
            checked === 'option1' ? `${team1Data.score}` : `${team2Data.score}`
          }
          // onChangeText={value => handleInputChange('score', value)}
          editable={false} // Make the field read-only
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input2}
          placeholder="Overs"
          keyboardType="numeric"
          value={
            checked === 'option1' ? `${team1Data.overs}` : `${team2Data.overs}`
          }
          onChangeText={value => handleInputChange('overs', value)}
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input3}
          placeholder="BallNO"
          keyboardType="numeric"
          value={
            checked === 'option1'
              ? `${team1Data.ballNo}`
              : `${team2Data.ballNo}`
          }
          onChangeText={value => handleInputChange('Ballno', value)}
          placeholderTextColor="black"
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={incrementBallNo}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.teamsContainer2}>
        {numbers.map(num => (
          <View style={styles.radioItem} key={num}>
            <RadioButton
              value={`${num}`}
              status={scorechecked === num ? 'checked' : 'unchecked'}
              onPress={() => handleRadioPress(num)} // Handle radio button press
            />
            <Text style={styles.teamText}>{num}</Text>
          </View>
        ))}
      </View>
      <View style={styles.teamsContainer2}>
        {wicket.map(num => (
          <View style={styles.radioItem} key={num}>
            <RadioButton
              value={`${num}`}
              status={selectedWicket === num ? 'checked' : 'unchecked'}
              onPress={() => handleWicketPress(num)} // Handle radio button press
            />
            <Text style={styles.teamText}>{num}</Text>
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <Checkbox.Item
          label="Run Out"
          color="black"
          labelStyle={{color: 'black'}} // Color of the label text
          status={box1checked ? 'checked' : 'unchecked'}
          onPress={() => setbox1checked(!box1checked)}
        />
        {box1checked && (
          <View style={styles.teamsContainer2}>
            <View style={styles.radioItem}>
              <RadioButton
                value="option3"
                status={runoutchecked === 'option3' ? 'checked' : 'unchecked'}
                onPress={() => setrunoutchecked('option3')}
              />
              <Text style={styles.teamText}>Striker</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="option4"
                status={runoutchecked === 'option4' ? 'checked' : 'unchecked'}
                onPress={() => setrunoutchecked('option4')}
              />
              <Text style={styles.teamText}>non-Striker</Text>
            </View>
          </View>
        )}
        <Checkbox.Item
          label="Extra"
          color="black"
          labelStyle={{color: 'black'}} // Color of the label text
          status={box2checked ? 'checked' : 'unchecked'}
          onPress={() => setbox2checked(!box2checked)}
        />
        {box2checked && (
          <View style={styles.dropextra}>
            <DropDownPicker
              open={open5}
              value={value5}
              items={items5}
              setOpen={setOpen5}
              setValue={setValue5}
              setItems={setItems5}
              placeholder="Extra Runs"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {position: 'absolute', zIndex: 50000},
              ]}
            />
          </View>
        )}
        {(value5 === 'Bye' ||
          value5 === 'Leg Bye' ||
          value5 === 'Pelanty Runs') && (
          <View style={styles.inputContainer2}>
            <TextInput
              style={styles.textInput2}
              placeholder="Extra Runs"
              placeholderTextColor={'black'}
              value={extraruns} // Bind text state
              onChangeText={setextraruns} // Update text state on change
              keyboardType="numeric"
            />
          </View>
        )}
      </View>

      <View style={styles.row}>
        <View style={styles.drop2}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            placeholder="Striker"
            style={styles.dropdown}
            dropDownContainerStyle={[
              styles.dropdownContainer,
              {position: 'absolute', zIndex: 50000},
            ]}
          />
        </View>
        <View style={styles.drop2}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="non-Striker"
            style={styles.dropdown}
            dropDownContainerStyle={[
              styles.dropdownContainer,
              {position: 'absolute', zIndex: 50000},
            ]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.drop3}>
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            placeholder="Bowler"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
        <View style={styles.drop3}>
          <DropDownPicker
            open={open4}
            value={value4}
            items={items4}
            setOpen={setOpen4}
            setValue={setValue4}
            setItems={setItems4}
            placeholder="Fielder"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      </View>
      {/* </View> */}
      {/* <View style={styles.finalScoreContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImages}>
          <Text style={styles.actionButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.finalScoreContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
          <Text style={styles.imageButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>
        Press final score when both innings are ended
      </Text>
      {/* <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={SendBackendData}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.actionButton} onPress={EndMatch}>
          <Text style={styles.actionButtonText}>End Match</Text>
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={SendBackendData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   // alignItems: 'center',
  //   // padding: 20,
  // },
  // matchTitle: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginVertical: 10,
  //   color: 'black',
  // },
  // matchtext: {
  //   alignItems: 'center',
  //   margin: 10,
  // },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  teamsContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
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
    fontSize: 14,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  battingTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '30%',
    textAlign: 'center',
    // backgroundColor: 'pink',
    color: 'black',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '30%',
    textAlign: 'center',
    // backgroundColor: 'pink',
    color: 'black',
  },
  input3: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '25%',
    textAlign: 'center',
    // backgroundColor: 'pink',
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
    backgroundColor: 'pink',
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
  // actionButtonsContainer: {
  //   // flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '50%',
  //   height: '6%',
  //   marginTop: 10,
  // },
  // actionButton: {
  //   backgroundColor: '#6200ee',
  //   padding: 15,
  //   borderRadius: 8,
  //   // flex: 1,
  //   marginHorizontal: 5,
  // },
  // actionButtonText: {
  //   color: 'white',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
  finalScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align to the right
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },

  imageButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8, // Smaller padding for a compact look
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  actionButtonsContainer: {
    justifyContent: 'center', // Center the Save button
    alignItems: 'center',
    marginVertical: 10,
  },

  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 8,
    width: '50%', // 50% width
  },

  saveButtonText: {
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
    // zIndex: 10000,
  },
  dropextra: {
    // flex: 1, // Makes the second dropdown take equal space
    marginHorizontal: 5,
    width: '50%',
    // zIndex: 10000,
    marginBottom: 20,
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
  // inputContainer: {
  //   marginTop: 15,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   padding: 6,
  // },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Adjusted for spacing
  },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 10,
  //   width: '60%',
  //   textAlign: 'center',
  //   color: 'black',
  // },
  button: {
    width: 30,
    height: 48,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  // button2: {
  //   width: 25,
  //   height: 25,
  //   backgroundColor: '#007bff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   marginHorizontal: 5,
  //   marginTop: 5,
  // },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  fieldWrapper: {
    flexDirection: 'column', // Stack the label, input, and buttons vertically
    // alignItems: 'center', // Center align content
    // marginHorizontal: 10, // Add space between fields
  },
  label: {
    fontSize: 14,
    color: 'black',
    // marginBottom: 5, // Space between label and input
  },
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
  },

  //--------
  // container2: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  // },
  inputContainer2: {
    width: '80%',
    padding: 20,
    // backgroundColor: 'white',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5,
    alignItems: 'center',
    // textShadowColor: 'black',
  },
  // label: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 10,
  // },
  textInput2: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  // displayText: {
  //   fontSize: 16,
  //   color: '#333',
  // },
});

// // // const [score, setScore] = useState('');
// // // const [overs, setOvers] = useState('');
// // // const [wickets, setWickets] = useState('');
// // // const [comments, setComments] = useState('');
// // // const [Team2score, setTeam2Score] = useState('');
// // // const [Team2overs, setTeam2overs] = useState('');
// // // const [Team2wickets, setTeam2Wickets] = useState('');
// // // const [comments2, setcomments2] = useState('');
// // // const [TeamDropdowns, setTeamDropdowns] = useState([]);
// // // const [TeamDropdowns2, setTeamDropdowns2] = useState([]);

// // // const handleScore = value => {
// // //   checked === 'option1' ? setScore(value) : setTeam2Score(value);
// // // };
// // // const handleOvers = value => {
// // //   checked === 'option1' ? setOvers(value) : setTeam2overs(value);
// // // };
// // // const handleWickets = value => {
// // //   checked === 'option1' ? setWickets(value) : setTeam2Wickets(value);
// // // };
// // // const handleComments = value => {
// // //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // // };
// // // const handleDropdowns = value => {
// // //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // // };

// const [teamsData, setteamsData] = useState([
//   {
//     score: '',
//     overs: '',
//     wickets: '',
//     comments: '',
//     value1: '',
//     // event: '',
//     // batsman: '',
//     // bowler: '',
//     // fielder: '',
//   },
//   {
//     score: '',
//     overs: '',
//     wickets: '',
//     comments: '',
//     // event: '',
//     // batsman: '',
//     // bowler: '',
//     // fielder: '',
//   },
// ]);

// <TextInput
//   style={styles.commentsInput}
//   placeholder="Add Comments"
//   multiline
//   value={checked === 'option1' ? team1Data.comments : team2Data.comments}
//   onChangeText={value => handleInputChange('comments', value)}
// />;
