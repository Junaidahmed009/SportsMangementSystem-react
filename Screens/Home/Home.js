// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { TextInputComponent,ButtonComponent } from '../MyComponents';

const Home = () => {
  const [inputText, setInputText] = useState('');  // State for TextInput

  const handlePress = () => {
    alert('Button pressed! Text input: ' + inputText);
  };

  return (
  
    <View>
      <Text>Welcome to Home Screen</Text>

      {/* Use TextInputComponent */}
      <TextInputComponent   
        placeholder="Enter your name"  // Placeholder for TextInput
        textValue={inputText}          // State value for TextInput
        onChangeText={setInputText}    // onChangeText handler to update state
        CustomStyle={{
          // paddingLeft: 10,
          //  marginBottom: 20,
          //  width: '100%',
        }}
      />

      {/* Use ButtonComponent */}
      <ButtonComponent
        buttonTitle="Submit"           // Button text
        onPress={handlePress} 
        CustomStyle={{
          // paddingLeft: 10,
          //  marginBottom: 20,
          //  width: '100%',
        }}         // onPress event handler
      />
    </View>
  );
};

export default Home;
