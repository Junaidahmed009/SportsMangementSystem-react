import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import Api from '../Api';

export default function EventManagerSelection() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Users, Sports } = await Api.eventmanagerselection();
  
        // Check if Users and Sports are arrays
        if (!Array.isArray(Users) || !Array.isArray(Sports)) {
          throw new Error('Unexpected API response structure');
        }
  
        // Format data for dropdowns
        const userOptions = Users.map(user => ({
          label: user.username,
          value: user.userid,
        }));
  
        const sportOptions = Sports.map(sport => ({
          label: sport.Sports,
          value: sport.sportid,
        }));
  
        // Set dropdown options
        setItems1(userOptions);
        setItems2(sportOptions);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  // const handleSave = async () => {
  //   if (value1 && value2) {
  //     const newSelection = { dropdown1: value1, dropdown2: value2 };
  //     setSelectedValues([...selectedValues, newSelection]);
      
  //     // Sending the selected data to the backend
  //     try {
  //       await ApiService.saveSelectedValues(newSelection); // Sending as object
  //       setValue1(null);
  //       setValue2(null);
  //       setOpen1(false);
  //       setOpen2(false);
  //     } catch (error) {
  //       console.error('Error saving selected values:', error);
  //     }
  //   } else {
  //     alert('Please select both values.');
  //   }
  // };

  const handleBackPress = () => {
    navigation.navigate('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.dropdown1} - {item.dropdown2}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
        <Appbar.Content title="Assign Game Manager" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.row}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          placeholder="Select User"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />

        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          placeholder="Select Sport"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={console.log('hello')}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <FlatList
        data={selectedValues}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  appbarsetting: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
  dropdownContainer: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  flatList: {
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  listText: {
    fontSize: 16,
  },
});
