import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  Card,
  TextInputComponent,
  ButtonComponent,
} from '../MyComponents';
import DatePicker from 'react-native-date-picker';
import Api from '../Api';

export default function CreateFixtures() {
  const [data, setData] = useState([]); // Stores team data fetched from backend
  const [modalVisible, setModalVisible] = useState(false); // Controls visibility of team selection modal
  const [activeCardEdited, setactiveCardedited] = useState(null); // Active card index being edited in modal
  const [cardsData, setCardsData] = useState(
    Array(3)
      .fill(null)
      .map(() => ({
        selectedTeams: [], // Stores selected teams for each card
        venue: '', // Venue for the match
        matchDate: new Date(), // Date and time for the match
        isPickerOpen: false, // Flag to show/hide date picker modal
      })),
  );
  const [cardsData2, setCardsData2] = useState(
    Array(3)
      .fill(null)
      .map(() => ({
        venue: '', // Venue for the match
        matchDate: new Date(), // Date and time for the match
        isPickerOpen: false, // Flag to show/hide date picker modal
      })),
  );
  const mergedCardsData = [
    ...cardsData.map(item => ({...item, type: 'firstCard'})), // Add a type for cardsData
    ...cardsData2.map(item => ({...item, type: 'secondCard'})), // Add a type for cardsData2
  ];
  const ScheduleDataForBackend = () => {
    // Check if all venues are filled, and show an alert if any are empty
    const hasEmptyVenue = cardsData.some(card => !card.venue.trim()); // Check if any venue is empty or just whitespace
    if (hasEmptyVenue) {
      Alert.alert('Please fill all 16 cards with a venue.');
      return; // Exit the function if any venue is empty
    }

    // Map through each card and extract the necessary fields
    const formattedData = cardsData.map(card => ({
      team1_id: card.selectedTeams[0]?.id || null, // Set to null if undefined
      team2_id: card.selectedTeams[1]?.id || null, // Set to null if undefined
      matchDate: card.matchDate, // Match date and time
      venue: card.venue.trim(), // Venue for the match
      match_type: 'Group-Stage',
      winner_id: ' ',
    }));

    // Log the data before sending it to backend (for debugging)
    console.log(formattedData);

    // Call the backend API to send the data
    // Example: Api.sendFixtures(formattedData);
  };

  // Fetch teams from the backend
  const fetchTeams = async () => {
    try {
      const response = await Api.fetchteams(); // API call to fetch teams
      if (response.status === 200) {
        // If response is successful, map and store teams
        const teamsData = response.data.map(team => ({
          id: team.id,
          name: team.name,
        }));
        setData(teamsData); // Update state with teams data
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          Alert.alert('No data was found');
        }
      }
      console.error('Error fetching teams:', error);
    }
  };

  // Function to update card data (venue, date, etc.)
  //thiss updates the card data like which card no,its value means venue,date,teams ets
  const updateCardData = (index, key, value) => {
    setCardsData(prev =>
      prev.map((card, i) => (i === index ? {...card, [key]: value} : card)),
    );
  };

  // Handle opening the modal for selecting teams
  const handleModal = index => {
    setactiveCardedited(index); // Set the active card index to edit
    setModalVisible(true); // Open modal
  };

  const handleTeamSelect = team => {
    if (activeCardEdited === null || activeCardEdited === undefined) return;

    // Check if the team is already selected in any previous card
    const isTeamAlreadySelected = cardsData.some((card, index) => {
      if (index !== activeCardEdited) {
        // Check if the team is in any of the selectedTeams of previous cards
        return card.selectedTeams.some(t => t.id === team.id);
      }
      return false; // Skip checking the active card
    });

    // If the team is already selected in any other card, show an alert
    if (isTeamAlreadySelected) {
      Alert.alert(
        'Error',
        'This team has already been selected in another match.',
      );
      return; // Exit early if the team is already selected
    }

    // Update the selected teams for the active card
    setCardsData(prevCardsData =>
      prevCardsData.map((card, index) => {
        if (index === activeCardEdited) {
          const selectedTeams = card.selectedTeams;
          const isAlreadySelected = selectedTeams.some(t => t.id === team.id);

          // If the team is already selected, remove it; otherwise, add it
          const updatedTeams = isAlreadySelected
            ? selectedTeams.filter(t => t.id !== team.id)
            : selectedTeams.length < 2
            ? [...selectedTeams, team]
            : selectedTeams; // Limit to 2 selected teams

          return {...card, selectedTeams: updatedTeams};
        }
        return card;
      }),
    );
  };

  // Function to save selected teams and close the modal
  const handleSaveSelection = () => {
    const selectedTeams = cardsData[activeCardEdited]?.selectedTeams || [];
    if (selectedTeams.length < 2) {
      Alert.alert('Select at least 2 teams');
      return;
    }
    setModalVisible(false); // Close modal after saving selection
  };
  // Render each team item in the team selection modal
  const renderTeamItem = ({item}) => {
    const selectedTeams = cardsData[activeCardEdited]?.selectedTeams || [];
    const isSelected = selectedTeams.some(selected => selected.id === item.id);

    return (
      <TouchableOpacity
        style={[
          styles.teamItem,
          isSelected && styles.selectedTeam, // Highlight selected teams
        ]}
        onPress={() => handleTeamSelect(item)} // Handle team select
      >
        <Text style={styles.teamText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // Render each fixture card (for the match schedule)
  const renderCard = ({item, index}) => (
    <Card key={index}>
      <View style={styles.rowContainer}>
        {/* Button to open team selection modal */}
        <ButtonComponent
          buttonTitle="Select Teams"
          onPress={() => handleModal(index)}
          CustomStyle={{
            width: '80%',
            marginHorizontal: 5,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <Text style={{color: 'black'}}>
          Selected Teams:{' '}
          {item.selectedTeams.length > 0
            ? item.selectedTeams.map(team => team.name).join(', ')
            : 'No teams selected'}
        </Text>
      </View>
      <View style={styles.Textboxstyle}>
        <TextInputComponent
          placeholder="Venue"
          textValue={item.venue}
          onChangeText={text => updateCardData(index, 'venue', text)}
          CustomStyle={styles.textInput}
        />
      </View>
      <View style={styles.buttons}>
        {/* Button to open date picker modal */}
        <ButtonComponent
          buttonTitle="Select Date"
          onPress={() => updateCardData(index, 'isPickerOpen', true)}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
            marginBottom: 10,
          }}
        />
        <Text style={{margin: 10, color: 'black'}}>
          Selected Date & Time: {item.matchDate.toLocaleString()}
        </Text>
      </View>
      {/* Modal for date picker */}
      <Modal visible={item.isPickerOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DatePicker
              date={item.matchDate}
              onDateChange={date => updateCardData(index, 'matchDate', date)}
              mode="datetime"
            />
            <View style={styles.modalFooter}>
              <Button
                title="Confirm"
                onPress={() => updateCardData(index, 'isPickerOpen', false)}
                color="#6200ee"
              />
              <Button
                title="Cancel"
                onPress={() => updateCardData(index, 'isPickerOpen', false)}
                color="#6200ee"
              />
            </View>
          </View>
        </View>
      </Modal>
    </Card>
  );

  // Fetch teams when component is mounted
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Create Schedule" />
      <Text style={styles.teamsText}>For 32 Teams</Text>
      {/* <Text style={styles.groupstagetext}>Group Stage-1(32)</Text> */}
      <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item, index) => `card-${index}`}
        ListFooterComponent={
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ButtonComponent
              buttonTitle="Save"
              onPress={ScheduleDataForBackend}
              CustomStyle={{
                width: '50%',
                // marginHorizontal: 5,
                // marginBottom: 10,
              }}
            />
          </View>
        }
      />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {/* i am here */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select 2 Teams</Text>
            <FlatList
              data={data}
              renderItem={renderTeamItem}
              keyExtractor={item => item.id.toString()}
              extraData={cardsData[activeCardEdited]?.selectedTeams}
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
                onPress={() => setModalVisible(false)}
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
  rowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginBottom: 10,
  },
  groupstagetext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginBottom: -10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
  },
  Textboxstyle: {
    justifyContent: 'center',
    margin: 5,
    marginTop: -5,
  },
  buttons: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
