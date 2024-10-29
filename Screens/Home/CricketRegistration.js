import { View, Text, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaViewComponent, AppBarComponent, DropdownComponent, ButtonComponent, TextInputComponent, FlatListComponent } from '../MyComponents'
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';

export default function CricketRegistration() {
    const navigation = useNavigation();
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([]);
    const [tname, setname] = useState();
    const [openCourse, setOpenCourse] = useState(false);
    const [openSection, setOpenSection] = useState(false);
    const [openSemNo, setOpenSemNo] = useState(false);
    const [valueCourse, setValueCourse] = useState(null);
    const [valueSection, setValueSection] = useState(null);
    const [valueSemNo, setValueSemNo] = useState(null);

    const Courses = [
        { label: 'BSCS', value: 'BCS' },
        { label: 'BSIT', value: 'BIT' },
        { label: 'BSCS(AI)', value: 'BSCS(AI)' },
        { label: 'BSSE', value: 'BSSE' },
    ];
    const Semesterno = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
    ];
    const Sections = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
    ];

    const TeamCheck = async () => {
        if (!tname) {
            Alert.alert('Please Enter Some value in Team name');
            return;
        }
        
        try {
            const response = await Api.getteamstatus(tname); 
            
            if (response.status === 200) {
                Alert.alert('Team name is unique. Now Enter the players.');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert('Team name already registered, Change the name.');
                } else {
                    Alert.alert('Error fetching data', `Status: ${error.response.status}`);
                }
            } else {
                Alert.alert('Network error', 'Failed to connect to server.');
            }
            console.error('Error details:', error);
        }
    };
    
   
    const fetchStudents = async () => {
        if (!valueCourse || !valueSection || !valueSemNo) {
            Alert.alert('Please select all 3 fields');
            return;
        }
    
        try {
            const response = await Api.fetchstudents(valueCourse, valueSection, valueSemNo);    
    
            if (response.status === 200) {
                if (Array.isArray(response.data)) {
                    Alert.alert('Check the list & Select players');
                    const Studentdata = response.data.map(student => ({
                        label: `${student.name} (${student.reg_no})`,
                        value: student.reg_no,
                    }));
                    setItems1(Studentdata);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert('No data found for students');
            } else if (error.response) {
                Alert.alert('Error fetching dropdown data', `Status: ${error.response.status}`);
            } else {
                Alert.alert('Network error', 'Failed to connect to server.');
            }
        }
    };
    
  






return (
    <SafeAreaViewComponent>
        <AppBarComponent title={'Cricket Team'} handleBackPress={() => console.log('Hello')} />
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
            /></View>
 <View style={styles.dropdownRow}>
            <View style={styles.dropdownContainer}>
                <DropdownComponent
                    CustomStyle={{ width: '100%', height: 50 }} // Full width of the container
                    dropDownContainerStyle={{ width: '100%',position: 'absolute',zIndex:10000}} // Full width of the dropdown
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
                    CustomStyle={{ width: '100%',height: 50 }} // Full width of the container
                    dropDownContainerStyle={{ width: '100%',position: 'absolute',zIndex:10000}} // Full width of the dropdown
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
                    CustomStyle={{ width: '90%', height: 50 }} // Full width of the container
                    dropDownContainerStyle={{ width: '90%',position: 'absolute',zIndex: 10000 }} // Full width of the dropdown
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
                buttonTitle='Team Check'
                onPress={TeamCheck}
                CustomStyle={{
                    width: '50%',
                    marginHorizontal: 5,
                }}
            />
            <ButtonComponent
                buttonTitle='Students'
                onPress={fetchStudents}
                CustomStyle={{
                    width: '50%',
                    marginHorizontal: 5,
                }}
            />
        </View>
        <View style={styles.studentdropdown}>
        <DropdownComponent
            CustomStyle={{width: '95%', height: 50}}         // Optional custom styles
             dropDownContainerStyle={{width: '95%'}}
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            placeholder="Select Players"
            // style={styles.dropdown}
            // dropDownContainerStyle={styles.dropdownContainer} 
            />
            </View>

        <FlatListComponent
            // data={selectedItems}
            renderItem={(item) => <Text>{item}</Text>}
            emptyMessage="No items selected"
        />
    </SafeAreaViewComponent>
)
}
const styles = StyleSheet.create({
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20
    },
    dropdownRow: {
        flexDirection: 'row',          // Arrange items in a row
        justifyContent: 'space-between', // Space out dropdowns evenly
        paddingHorizontal:4 ,          // Add horizontal padding
    },
    dropdownContainer: {
        flex: 1,                       // Each dropdown takes equal space in the row
        marginHorizontal: 5,  
    },
    studentdropdown:{
        // width: '90%', // Limit to 90% of parent width to avoid expanding too much
        maxWidth: 600, // Set a maximum width if needed to prevent uneven expansion
        alignSelf: 'center', 
        alignItems:'center'
    }
});