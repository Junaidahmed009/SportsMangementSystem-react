import { View, Text,Alert,StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaViewComponent,AppBarComponent,DropdownComponent,ButtonComponent } from '../MyComponents'
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';

export default function UserHome() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  useEffect(() => {
    const fetchDropDownsessions = async () => {
      try {
        const response = await Api.fetchSessions();
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            const sessionOptions = response.data.map(sessions => ({
              label: sessions.name,
              value: sessions.id,
            }));
            setItems1(sessionOptions);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          Alert.alert('Error fetching dropdown data', `Status: ${error.response.status}`);
        } else {
          Alert.alert('Network error', 'Failed to connect to server.');
        }
      }
    };

    fetchDropDownsessions();
  }, []);

  const handlelogin=()=>{
    navigation.navigate('Login');
  }
  const handlecricketregistration=()=>{
    navigation.navigate('CricketRegistration');
  }


  return (
   <SafeAreaViewComponent>
    <AppBarComponent title={'BIIT Sports'} handleBackPress={handlelogin}/>
      <View style={styles.contentContainer}>
      <DropdownComponent
    // CustomStyle={}         // Optional custom styles
    // dropDownContainerStyle={styles.dropDownContainerCustom}
    open={open1}
    value={value1}
    items={items1}
    setOpen={setOpen1}
    setValue={setValue1}
    setItems={setItems1}
    placeholder="Select Session"
    // style={styles.dropdown}
    // dropDownContainerStyle={styles.dropdownContainer}
    />
      </View>
      <View style={styles.buttons}>
      <ButtonComponent
      buttonTitle='Register Team'
      onPress={handlecricketregistration}
     CustomStyle={{
       width: '60%',
      //  marginHorizontal: 5,
     }}/>
      </View>
      



      
      </SafeAreaViewComponent>
   
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    marginTop:10,
  },
  buttons: {
    justifyContent: 'center',
    // flexDirection: 'row',
    padding: 10,
    alignItems:'center',
  }
});
































// // HomeScreen.js
// import React, { useState } from 'react';
// import { View, Text, SafeAreaView } from 'react-native';
// import { TextInputComponent,ButtonComponent } from '../MyComponents';

// const Home = () => {
//   const [inputText, setInputText] = useState('');  // State for TextInput

//   const handlePress = () => {
//     alert('Button pressed! Text input: ' + inputText);
//   };

//   return (
  
//     <View>
//       <Text>Welcome to Home Screen</Text>

//       {/* Use TextInputComponent */}
//       <TextInputComponent   
//         placeholder="Enter your name"  // Placeholder for TextInput
//         textValue={inputText}          // State value for TextInput
//         onChangeText={setInputText}    // onChangeText handler to update state
//         CustomStyle={{
//           // paddingLeft: 10,
//           //  marginBottom: 20,
//           //  width: '100%',
//         }}
//       />

//       {/* Use ButtonComponent */}
//       <ButtonComponent
//         buttonTitle="Submit"           // Button text
//         onPress={handlePress} 
//         CustomStyle={{
//           // paddingLeft: 10,
//           //  marginBottom: 20,
//           //  width: '100%',
//         }}         // onPress event handler
//       />
//     </View>
//   );
// };

// export default Home;
