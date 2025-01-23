import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  TextInputComponent,
} from '../MyComponents';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddNewGame() {
  const [checked, setChecked] = useState('option1');
  const [Gamename, setGamename] = useState();
  const [Instructions, setInstructions] = useState();
  const [items1, setItems1] = useState([
    {label: 'Point Base', value: 'Point Base'},
    {label: 'Goal Base', value: 'Goal Base'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);

  const printData = () => {
    let gametype;
    if (checked === 'option1') {
      gametype = 'Indoor';
      console.log(Gamename, Instructions, value1, gametype);
    } else {
      gametype = 'Outdoor';
      console.log(Gamename, Instructions, value1, gametype);
    }
  };
  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Add Sport'}
        //   handleBackPress={handlelogin}
      />
      <TextInputComponent
        placeholder="Game Name"
        textValue={Gamename}
        onChangeText={Gamename => setGamename(Gamename)}
        CustomStyle={{
          // padding:20,
          // width:'90%',
          marginTop: 30,
          marginHorizontal: 10,
        }}
      />
      <TextInputComponent
        placeholder="Game Instructions"
        textValue={Instructions}
        onChangeText={Instructions => setInstructions(Instructions)}
        CustomStyle={{
          // padding:20,
          // width:'90%',
          marginTop: 30,
          marginHorizontal: 10,
        }}
      />
      <View style={styles.teamsContainer}>
        <View style={styles.radioItem}>
          <RadioButton
            value="option1"
            status={checked === 'option1' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option1')}
          />
          <Text style={styles.teamText}>Indoor</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="option2"
            status={checked === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option2')}
          />
          <Text style={styles.teamText}>OutDoor</Text>
        </View>
      </View>
      <View style={styles.drop1}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Scoring Type"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={printData}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  drop1: {
    zIndex: 10000, // Higher zIndex for the first dropdown
    marginBottom: 10,
    // flex: 1, // Makes the first dropdown take equal space
    marginHorizontal: 7, // Adds horizontal spacing between dropdowns
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers items horizontally in the row
    alignItems: 'center', // Aligns items vertically in the row
    width: '100%',
    marginTop: 30,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '40%', // Adjust width as needed to control button size
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
