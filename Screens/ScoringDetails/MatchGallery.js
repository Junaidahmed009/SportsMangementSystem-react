// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   Alert,
//   Button,
// } from 'react-native';
// import Api from '../Api';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {
//   BASE_URL,
//   SafeAreaViewComponent,
//   AppBarComponent,
// } from '../MyComponents';
// // import  from '../components/AppBarComponent'; // Adjust the path as needed

// export default function MatchGallery() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {fixtureid} = route.params;

//   // States to hold the fetched data
//   const [momImagePath, setMomImagePath] = useState('');
//   const [momDetails, setMomDetails] = useState([]);
//   const [deliveryImages, setDeliveryImages] = useState([]);

//   // Fetch data when the component mounts
//   useEffect(() => {
//     fetchMOTMDetails();
//   }, []);

//   // API call to fetch the data
//   const fetchMOTMDetails = async () => {
//     try {
//       const response = await Api.fetchmotmdetails(fixtureid);
//       if (response.status === 200) {
//         const data = response.data;
//         setMomImagePath(data.MOMimagepath || '');
//         setMomDetails(data.playerDetails || []);
//         // Make sure the key matches the one returned by your API (here, "Deliveryimages")
//         setDeliveryImages(data.Deliveryimages || []);
//       } else {
//         Alert.alert('Error', `Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         Alert.alert('No Data Found.');
//       } else {
//         Alert.alert('Error', 'Something went wrong.');
//       }
//     }
//   };

//   // Header component for the FlatList that includes the MOM image and player details
//   const ListHeader = () => (
//     <View>
//       {/* MOM Image */}
//       <View style={styles.momContainer}>
//         <Image
//           source={{uri: `${BASE_URL}${momImagePath}`}}
//           style={styles.momImage}
//         />
//       </View>
//       {/* Player Details */}
//       <View style={styles.detailsContainer}>
//         {momDetails.map((player, index) => (
//           <View key={index} style={styles.playerCard}>
//             <View style={styles.momdetails}>
//               <Text style={styles.playerName2}>Man Of The Match</Text>
//             </View>
//             <Text style={styles.playerName}>{player.name}</Text>
//             <Text style={styles.playerInfo}>Reg No: {player.studentreg}</Text>
//             <Text style={styles.playerInfo}>
//               Section:{player.discipline}-{player.semno}
//               {player.section}
//             </Text>
//             {/* <Text style={styles.playerInfo}>Semester: </Text>
//             <Text style={styles.playerInfo}>Discipline:</Text> */}
//             <Text style={styles.playerInfo}>
//               Runs Scored: {player.runsscored}
//             </Text>
//             <Text style={styles.playerInfo}>
//               Wickets Taken: {player.wickets_taken}
//             </Text>
//           </View>
//         ))}
//       </View>
//       {/* Section Title for Delivery Images */}
//       <View style={styles.deliveryImagesTitleContainer}>
//         <Text style={styles.sectionTitle}>Delivery Images</Text>
//       </View>
//     </View>
//   );

//   // Render each delivery image with an overlay for score and wicket details
//   const renderDeliveryImage = ({item}) => {
//     return (
//       <View style={styles.deliveryImageContainer}>
//         <Image
//           source={{uri: `${BASE_URL}${item.imagepath}`}}
//           style={styles.deliveryImage}
//         />
//         <View style={styles.overlay}>
//           {item.socre ? (
//             <Text style={styles.overlayText}>Score: {item.socre}</Text>
//           ) : null}
//           {item.wicket ? (
//             <Text style={styles.overlayText}>Wicket: {item.wicket}</Text>
//           ) : null}
//         </View>
//       </View>
//     );
//   };
//   const printdata = () => {
//     // console.log(Momimagepath);
//     // console.log(Momdetails);
//     console.log(deliveryImages);
//   };

//   return (
//     <SafeAreaViewComponent style={styles.container}>
//       {/* App Bar/Header */}
//       <AppBarComponent title="BIIT Sports" />
//       <Button title="hello" onPress={printdata}></Button>
//       <FlatList
//         data={deliveryImages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderDeliveryImage}
//         numColumns={3} // Display in grid format
//         ListHeaderComponent={ListHeader}
//         contentContainerStyle={styles.flatListContainer}
//       />
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({

// });

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BASE_URL,
  SafeAreaViewComponent,
  AppBarComponent,
} from '../MyComponents';

export default function MatchGallery() {
  const navigation = useNavigation();
  const route = useRoute();
  const {fixtureid} = route.params;

  // States to hold the fetched data
  const [momImagePath, setMomImagePath] = useState('');
  const [momDetails, setMomDetails] = useState([]);
  const [deliveryImages, setDeliveryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To store the image for full-screen view
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  // Fetch data when the component mounts
  useEffect(() => {
    fetchMOTMDetails();
  }, []);

  // API call to fetch the data
  const fetchMOTMDetails = async () => {
    try {
      const response = await Api.fetchmotmdetails(fixtureid);
      if (response.status === 200) {
        const data = response.data;
        setMomImagePath(data.MOMimagepath || '');
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

  // Function to handle image click and open modal
  const openImageModal = imagePath => {
    setSelectedImage(imagePath);
    setModalVisible(true);
  };

  // Header component for the FlatList that includes the MOM image and player details
  const ListHeader = () => (
    <View>
      {/* MOM Image */}
      <TouchableOpacity
        onPress={() => openImageModal(`${BASE_URL}${momImagePath}`)}
        style={styles.deliveryImageContainer}>
        <View style={styles.momContainer}>
          <Image
            source={{uri: `${BASE_URL}${momImagePath}`}}
            style={styles.momImage}
          />
        </View>
      </TouchableOpacity>

      {/* Player Details */}
      <View style={styles.detailsContainer}>
        {momDetails.map((player, index) => (
          <View key={index} style={styles.playerCard}>
            <View style={styles.momdetails}>
              <Text style={styles.playerName2}>Man Of The Match</Text>
            </View>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerInfo}>Reg No: {player.studentreg}</Text>
            <Text style={styles.playerInfo}>
              Section: {player.discipline}-{player.semno}
              {player.section}
            </Text>
            <Text style={styles.playerInfo}>
              Runs Scored: {player.runsscored}
            </Text>
            <Text style={styles.playerInfo}>
              Wickets Taken: {player.wickets_taken}
            </Text>
          </View>
        ))}
      </View>
      {/* Section Title for Delivery Images */}
      {/* <View style={styles.deliveryImagesTitleContainer}> */}
      <Text style={styles.sectionTitle}>Delivery Images</Text>
    </View>
    // </View>
  );

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
        </View>
      </TouchableOpacity>
    );
  };

  // const printdata = () => {
  //   console.log(momImagePath);
  //   console.log(deliveryImages);
  // };

  return (
    <SafeAreaViewComponent style={styles.container}>
      {/* App Bar/Header */}
      <AppBarComponent title="Gallery" />
      {/* <Button onPress={printdata} title="fasf"></Button> */}

      {/* FlatList to display images */}
      <FlatList
        data={deliveryImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDeliveryImage}
        numColumns={3} // Display in grid format
        ListHeaderComponent={ListHeader}
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
  container: {
    flex: 1,
  },
  momContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  momImage: {
    width: Dimensions.get('window').width * 0.9,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
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
