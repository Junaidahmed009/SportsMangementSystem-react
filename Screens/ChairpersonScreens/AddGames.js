import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react';
import { Checkbox,Appbar,Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function AddGames() {
    const [cricchecked, setcricChecked] = React.useState(false);
    const [footballchecked, setfootballChecked] = React.useState(false);
    const [tennischecked, settennisChecked] = React.useState(false);
    const [ludochecked, setludoChecked] = React.useState(false);
    const [badmintonchecked, setbadmintonChecked] = React.useState(false);
    const navigation = useNavigation();

    const handleGames=()=>{
      const gamedetail={
        game:cricchecked,
        game:cricchecked,
        game:cricchecked,
        game:cricchecked,
        game:cricchecked,
      }
    }






    const handlechairperson=()=>{
      navigation.navigate('Chairperson')
    }


  return (
    <SafeAreaView style={styles.container}>
         <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handlechairperson} color="#ffffff" />
        <Appbar.Content title="Sports" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <View>

    <View style={styles.checkboxview} >
    <Checkbox 
      status={cricchecked ? 'checked' : 'unchecked'}
      onPress={() => {
        setcricChecked(!cricchecked);
      }}
   
    />
    <Text style={styles.Checkboxtext} >Cricket</Text> 
    </View>

    <View style={styles.checkboxview} >
    <Checkbox 
      status={footballchecked ? 'checked' : 'unchecked'}
      onPress={() => {
        setfootballChecked(!footballchecked);
      }}
   
    />
    <Text style={styles.Checkboxtext} >Football</Text> 
    </View>
    <View style={styles.checkboxview} >
    <Checkbox 
      status={tennischecked ? 'checked' : 'unchecked'}
      onPress={() => {
        settennisChecked(!tennischecked);
      }}
   
    />
    <Text style={styles.Checkboxtext} >Tennis</Text> 
    </View>
    <View style={styles.checkboxview} >
    <Checkbox 
      status={ludochecked ? 'checked' : 'unchecked'}
      onPress={() => {
        setludoChecked(!ludochecked);
      }}
   
    />
    <Text style={styles.Checkboxtext} >Ludo</Text> 
    </View>
    <View style={styles.checkboxview} >
    <Checkbox 
      status={badmintonchecked ? 'checked' : 'unchecked'}
      onPress={() => {
        setbadmintonChecked(!badmintonchecked);
      }}
   
    />
    <Text style={styles.Checkboxtext} >Badminton</Text> 
    </View>
    <View style={styles.buttonContainer}>
      <Button 
     style={styles.buttonlogin} 
     mode="contained" onPress={() => console.log('Pressed')}
     labelStyle={{ fontSize: 17,color:'#ffffff'}}
     >
   Save
  </Button>
  </View>



    </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
container:{
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
  checkboxview:{
    flexDirection: 'row',
    alignItems:'center',
    padding:15
  },
  Checkboxtext:{
        color: 'black',
        fontSize: 28,
  },
  buttonContainer: {
    alignItems: 'center', // Center horizontally
    marginTop: 60, // Optional: adjust spacing as needed
    fontSize:400,
    marginBottom:7,
    
  },
  buttonlogin:{
    backgroundColor:'#6200ee',
    width: 200,
    height: 40,
  },

})