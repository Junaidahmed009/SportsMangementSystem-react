import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
} from '../MyComponents';
import Api from '../Api';

export default function Test1() {
  const [selectedTeams, setSelectedTeams] = useState([]); // for storing data of selected teams
  const [data, setData] = useState([]); // for storing data coming from backend.
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    fetchTeams();
    setModalVisible(!modalVisible);
  };

  const handleTeamSelect = team => {
    //handle check and uncheck of team from list.
    if (selectedTeams.some(selected => selected.id === team.id)) {
      setSelectedTeams(
        selectedTeams.filter(selected => selected.id !== team.id),
      );
    } else if (selectedTeams.length < 2) {
      // Add the team if less than two are selected
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const renderTeamItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.teamItem,
        selectedTeams.some(selected => selected.id === item.id) &&
          styles.selectedTeam,
      ]}
      onPress={() => handleTeamSelect(item)}>
      <Text style={styles.teamText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSaveSelection = () => {
    if (selectedTeams.length === 1 || selectedTeams.length === 0) {
      // Add the team if less than two are selected
      Alert.alert('Select Atleast 2 Teams');
      return;
    }
    console.log('Selected Teams:', selectedTeams);
    setSelectedTeams([]);
    handleModal();
  };

  const fetchTeams = async () => {
    try {
      const response = await Api.fetchteams();
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          // Ensure correct data mapping for FlatList
          const teamsData = response.data.map(team => ({
            id: team.id,
            name: team.name,
          }));
          setData(teamsData);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        Alert.alert('No data found for Teams');
      } else if (error.response) {
        Alert.alert('Error fetching dropdown data');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  // useEffect(() => {

  // }, []);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="BIIT Sports" />
      <View style={styles.container}>
        <ButtonComponent
          buttonTitle="Select Teams"
          onPress={handleModal}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select 2 Teams</Text>
            <FlatList
              data={data}
              renderItem={renderTeamItem}
              keyExtractor={item => item.id.toString()}
              extraData={selectedTeams}
              style={styles.teamList}
            />
            <View style={styles.modalFooter}>
              <ButtonComponent
                buttonTitle="Save"
                onPress={handleSaveSelection}
                CustomStyle={{
                  height: 50,
                  width: '40%',
                  marginHorizontal: 5,
                }}
              />
              <ButtonComponent
                buttonTitle="Cancel"
                onPress={handleModal}
                CustomStyle={{
                  height: 50,
                  width: '40%',
                  marginHorizontal: 5,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: '80%', // Ensures it doesn't occupy the full screen
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  teamList: {
    maxHeight: 250, // Limit FlatList height
    marginVertical: 10,
  },
  teamItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedTeam: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 1,
  },
  teamText: {
    fontSize: 16,
    color: '#555',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

// const teams = Array.from({length: 20}, (_, i) => ({
//   id: `team-${i + 1}`,
//   name: `Team ${i + 1}`,
// }));

// const [modalVisible, setModalVisible] = useState(false);
// const [selectedTeams, setSelectedTeams] = useState([]);

// const toggleModal = () => {
//   setModalVisible(!modalVisible);
// };

// const handleTeamSelect = team => {
//   // Allow up to two selections
//   if (selectedTeams.some(selected => selected.id === team.id)) {
//     // Remove the team if already selected
//     setSelectedTeams(
//       selectedTeams.filter(selected => selected.id !== team.id),
//     );
//   } else if (selectedTeams.length < 2) {
//     // Add the team if less than two are selected
//     setSelectedTeams([...selectedTeams, team]);
//   }
// };

// const renderTeamItem = ({item}) => (
//   <TouchableOpacity
//     style={[
//       styles.teamItem,
//       selectedTeams.some(selected => selected.id === item.id) &&
//         styles.selectedTeam,
//     ]}
//     onPress={() => handleTeamSelect(item)}>
//     <Text style={styles.teamText}>{item.name}</Text>
//   </TouchableOpacity>
// );

// const handleSaveSelection = () => {
//   console.log('Selected Teams:', selectedTeams);
//   // setSelectedTeams(null);
//   toggleModal();
// };

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent title="BIIT Sports" />
//       <View style={styles.container}>
//         <Button title="Select Teams" onPress={toggleModal} />
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={toggleModal}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Teams (Max 2)</Text>
//             <FlatList
//               data={teams}
//               renderItem={renderTeamItem}
//               keyExtractor={item => item.id}
//               extraData={selectedTeams}
//               style={styles.teamList}
//             />
//             <View style={styles.modalFooter}>
//               <Button title="Save" onPress={handleSaveSelection} />
//               <Button title="Cancel" onPress={toggleModal} color="red" />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     padding: 10,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//     maxHeight: '80%', // Ensures it doesn't occupy the full screen
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   teamList: {
//     maxHeight: 200, // Limit FlatList height
//     marginVertical: 10,
//   },
//   teamItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   selectedTeam: {
//     backgroundColor: '#d4edda',
//     borderColor: '#28a745',
//     borderWidth: 1,
//   },
//   teamText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 15,
//   },
// });
