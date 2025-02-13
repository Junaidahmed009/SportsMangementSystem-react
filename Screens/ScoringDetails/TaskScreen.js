import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaViewComponent,
  ButtonComponent,
  BASE_URL,
  AppBarComponent,
} from '../MyComponents';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TaskScreen() {
  const [fixtures, setFixtures] = useState([]);
  //   const [teams, setteams] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {value: '6', label: '6'},
    {value: '4', label: '4'},
    {value: 'Caught', label: 'Caught'},
    {value: 'Bowled', label: 'Bowled'},
  ]);
  //   const [checked, setChecked] = useState('option1');
  const [momDetails, setMomDetails] = useState([]);
  const [deliveryImages, setDeliveryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To store the image for full-screen view
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  //Fetch the fixtures for filling data in datedropdown section.
  const FetchFixtures = async () => {
    try {
      const response = await Api.fetchCricketFixtures();
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const dateoptions = response.data.map(sport => ({
            label: sport.matchdate,
            value: sport.fixture_id,
          }));
          setItems1(dateoptions);
          setFixtures(response.data);
        }
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert('Info', 'User is not part of any team');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };
  useEffect(() => {
    FetchFixtures();
  }, []);
  //Fetch Matches to display in second dropdown for team selection.
  const fetchmatches = async id => {
    try {
      const response = await Api.fetchCricketmatches(id);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const dateoptions = response.data.map(sport => ({
            label: `${sport.team1_name} vs ${sport.team2_name}`,
            value: sport.fixture_id,
          }));
          setItems2(dateoptions);
          //   setFixtures(response.data);
        }
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert('Info', 'User is not part of any team');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  const getdate = () => {
    if (!value1) {
      Alert.alert('Please select a value from Match Date');
    }
    var id = value1;
    // console.log(date);
    fetchmatches(id);
  };
  const getteamids = () => {
    if (!value2 || !value3) {
      Alert.alert('Please select a value from Both dropdowns');
      return;
    }
    var id1 = value2;
    var id2 = value3;
    console.log(value1, value3);
    if (id2 === '6' || id2 === '4') {
      fetchballDetails(id1, id2);
    } else if (value3 === 'Caught' || value3 === 'Bowled') {
      fetchwicketDetails(id1, id2);
    }
    // else if (value3 === 'All') {
    //   fetchballDetails();
    // }
    // console.log(date);
    //   fetchmatches(id);
  };
  // Fetch Ball Details
  const fetchballDetails = async (id1, id2) => {
    try {
      const response = await Api.fetchballDetails(id1, id2);
      if (response.status === 200) {
        const data = response.data;
        // setMomImagePath(data.MOMimagepath || '');
        setMomDetails(data.playerDetails || []);
        setDeliveryImages(data.Deliveryimages || []);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Data Found.');
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };
  const fetchwicketDetails = async (id1, id2) => {
    try {
      const response = await Api.fetchwicketdetails(id1, id2);
      if (response.status === 200) {
        const data = response.data;
        // setMomImagePath(data.MOMimagepath || '');
        setMomDetails(data.playerDetails || []);
        setDeliveryImages(data.Deliveryimages || []);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Data Found.');
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };
  // const fetchfulldetails = async () => {
  //   try {
  //     const response = await Api.fetchwicketdetails(id1, id2);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       // setMomImagePath(data.MOMimagepath || '');
  //       setMomDetails(data.playerDetails || []);
  //       setDeliveryImages(data.Deliveryimages || []);
  //     } else {
  //       Alert.alert(
  //         'Error',
  //         `Unexpected response status: ${response.status}`,
  //       );
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       Alert.alert('No Data Found.');
  //     } else {
  //       Alert.alert('Error', 'Something went wrong.');
  //     }
  //   }
  // };

  const openImageModal = imagePath => {
    setSelectedImage(imagePath);
    setModalVisible(true);
  };
  // const data = response.data;
  // if (Array.isArray(data)) {
  //   setFixtures(data || []);
  //   //   setItems1(data.matchdate || []);
  //   const teamsData = response.fixtures.map(fix => ({
  //     // id: fix.fixture_id,
  //     dates: fix.matchdate,
  //   }));
  //   setdates(teamsData);
  // }

  //   // Fetch data when the component mounts
  //   useEffect(() => {
  //     fetchballDetails();
  //   }, []);

  const printdata = () => {
    console.log(momDetails, deliveryImages);
  };

  // Render each delivery image with an overlay for score and wicket details
  const renderDeliveryImage = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => openImageModal(`${BASE_URL}${item.imagepath}`)}
        style={styles.deliveryImageContainer}>
        <Image
          source={{uri: `${BASE_URL}${item.imagepath}`}}
          style={styles.deliveryImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            Over {item.OverNumber}.{item.BallNumber}
          </Text>
          <Text style={styles.overlayText}>Batsman: {item.StrikerName}</Text>
          <Text style={styles.overlayText}>Bowler: {item.BowlerName}</Text>
          {item.score ? (
            <Text style={styles.overlayText}>Score: {item.score}</Text>
          ) : null}
          {item.wicket ? (
            <Text style={styles.overlayText}>Wicket: {item.wicket}</Text>
          ) : null}
          {item.FielderName ? (
            <Text style={styles.overlayText}>
              FielderName: {item.FielderName}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Scoring Details'} />
      {/* <Button onPress={printdata} title="Details"></Button>handleBackPress={handlelogin} */}
      {/* <Button onPress={test} title="test"></Button> */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Match Date"
          style={styles.dropdown}
          //   dropDownContainerStyle={styles.dropDownContainer}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={[
            styles.dropDownContainer,
            {position: 'absolute', zIndex: 10000},
          ]}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get Teams"
          onPress={getdate}
          CustomStyle={styles.enrollButton}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          placeholder="teams"
          style={styles.dropdown}
          //   dropDownContainerStyle={styles.dropDownContainer}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={[
            styles.dropDownContainer,
            {position: 'absolute', zIndex: 10000},
          ]}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open3}
          value={value3}
          items={items3}
          setOpen={setOpen3}
          setValue={setValue3}
          setItems={setItems3}
          placeholder="Select Score"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainer}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get data"
          onPress={getteamids}
          CustomStyle={styles.enrollButton}
        />
      </View>

      {/* ------------- */}
      <FlatList
        data={deliveryImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDeliveryImage}
        numColumns={3} // Display in grid format
        // ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContainer}
      />
      {/* Full-Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={styles.fullScreenImage}
            />
          )}
        </View>
      </Modal>
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  dropDownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 16,
  },
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
  //   momContainer: {
  //     alignItems: 'center',
  //     marginVertical: 10,
  //   },
  //   momImage: {
  //     width: Dimensions.get('window').width * 0.9,
  //     height: 200,
  //     resizeMode: 'cover',
  //     borderRadius: 10,
  //   },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  playerCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  playerName2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue',
  },

  momdetails: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  flatListContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  deliveryImageContainer: {
    flex: 1,
    margin: 5,
  },
  // momdetails: {
  //   alignItems: 'center',
  // },
  playerInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  deliveryImagesTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  // sectionTitle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'blue',
  // },
  // flatListContainer: {
  //   paddingBottom: 20,
  //   paddingHorizontal: 5,
  // },
  // deliveryImageContainer: {
  //   flex: 1,
  //   margin: 5,
  //   position: 'relative',
  // },
  // Delivery images are shown in a smaller size
  deliveryImage: {
    width: Dimensions.get('window').width / 3 - 15,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
  },
  overlay: {
    position: 'absolute',
    bottom: 1,
    left: 3,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 3,
    borderRadius: 5,
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

//   const removePlayer = regNo => {
//     setSelectedPlayers(prevPlayers =>
//       prevPlayers.filter(player => player.reg_no !== regNo),
//     );
//     setRegNosArray(prevRegNos => prevRegNos.filter(reg => reg !== regNo));
//   };
//  label: `${student.name} (${student.reg_no})`,

//-------------
//   const Filtermatches = value => {

//     // console.log(value);
//     //    const removePlayer = regNo => {
//     const teamsdata = fixtures.find(item => item.matchdate === value);
//     const sportOptions = teamsdata.map(sport => ({
//       label: sport.games,
//       value: sport.id,
//     }));
//     setteams(data);
//     // setItems2(data);
//     // const dateoptions = teamsdata.map(sport => ({
//     //   label: sport.matchdate,
//     //   value: sport.matchdate,
//     // }));
//     // setItems1(dateoptions);
//     //    setteams(prevPlayers =>
//     //       prevPlayers.filter(player => player.matchdate !== value),
//     //     );
//     // setRegNosArray(prevRegNos => prevRegNos.filter(reg => reg !== regNo));
//     //   };
//   };
