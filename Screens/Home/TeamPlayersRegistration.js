import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
  DropdownComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';

export default function CricketRegistration() {
  const navigation = useNavigation();
  const [openCourse, setOpenCourse] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSemNo, setOpenSemNo] = useState(false);
  const [valueCourse, setValueCourse] = useState(null);
  const [valueSection, setValueSection] = useState(null);
  const [valueSemNo, setValueSemNo] = useState(null);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected player from Dropdown value or full data is saved here.
  const [regNosArray, setRegNosArray] = useState([]); // the selected player roll no is saved here

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
  ];
  const Sections = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'E', value: 'E'},
  ];

  const fetchStudents = async () => {
    if (!valueCourse || !valueSection || !valueSemNo) {
      Alert.alert('Please select all 3 fields');
      return;
    }
    try {
      const response = await Api.fetchstudents(
        valueCourse,
        valueSection,
        valueSemNo,
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        Alert.alert('Check the list & Select players');
        const Studentdata = response.data.map(student => ({
          label: `${student.name} (${student.reg_no})`,
          value: student.reg_no,
          name: student.name,
          reg_no: student.reg_no,
        }));
        setItems1(Studentdata);
      } else {
        console.error('Unexpected data format or response status:', response);
      }
    } catch (error) {
      const message =
        error.response?.status === 404
          ? 'No data found for students'
          : 'Network error, failed to connect to server';
      console.log(message);
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonPress = () => {
    if (!value1) {
      Alert.alert('Please select a value from Dropdown');
    }
    if (selectedPlayers.length >= 12) {
      Alert.alert(
        'Player Limit Reached',
        'You can only select up to 12 players.',
      );
      return;
    }
    const selectedPlayer = items1.find(item => item.value === value1);

    if (selectedPlayer && regNosArray.includes(selectedPlayer.reg_no)) {
      Alert.alert('Duplicate Player', 'This player has already been selected.');
      return;
    }

    if (selectedPlayer) {
      const playerToAdd = {
        name: selectedPlayer.name,
        reg_no: selectedPlayer.reg_no,
        // value: selectedPlayer.value,
      };

      setSelectedPlayers(prevPlayers => [...prevPlayers, playerToAdd]);
      setRegNosArray(prevRegNos => [...prevRegNos, selectedPlayer.reg_no]);
      setValue1(null);
      console.log('Player added successfully:', playerToAdd);
    } else {
      console.log('No player found matching the current value1:', value1);
    }
  };

  const logRegNos = () => {
    if (regNosArray.length == 12) {
      console.log('ok');
    } else {
      Alert.alert('Please select 12 values');
    }
    console.log("Selected Players' Reg Nos:", regNosArray);
  };

  const removePlayer = regNo => {
    setSelectedPlayers(prevPlayers =>
      prevPlayers.filter(player => player.reg_no !== regNo),
    );
    setRegNosArray(prevRegNos => prevRegNos.filter(reg => reg !== regNo));
    console.log(`Player with reg_no ${regNo} removed successfully.`);
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Players Selection'}
        handleBackPress={() => navigation.navigate('TeamRegistration')}
      />
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
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get Students"
          onPress={fetchStudents}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>

      <View style={styles.studentdropdown}>
        <DropdownComponent
          CustomStyle={{width: '95%', height: 50}}
          dropDownContainerStyle={{
            width: '95%',
            position: 'absolute',
          }}
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Select players"
          // onSelectItem={handleSelectItem} // Call the handler to add selected items to the array
          style={{width: '90%', height: 50}}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get player"
          onPress={handleButtonPress}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
        <ButtonComponent
          buttonTitle="Save"
          onPress={logRegNos}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>
      <View style={styles.FlatListstyle}>
        <FlatList
          data={selectedPlayers}
          keyExtractor={flat => flat.reg_no}
          renderItem={({item}) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>
                {`${item.name} (${item.reg_no})`}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePlayer(item.reg_no)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMessage}>No players selected</Text>
          )}
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
  studentdropdown: {
    alignSelf: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
    // width: '80%',
    paddingTop: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flexShrink: 1,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  FlatListstyle: {
    flex: 1,
    paddingTop: 10,
  },
});
