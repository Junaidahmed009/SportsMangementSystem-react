import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Appbar, customText} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

//TextBox
export const TextInputComponent = ({
  placeholder,
  textValue,
  onChangeText,
  CustomStyle,
}) => (
  <TextInput
    style={[styles.input, CustomStyle]}
    placeholder={placeholder}
    value={textValue}
    onChangeText={onChangeText}
    placeholderTextColor="#999" // Placeholder color
    // keyboardType={Keyboardtype} // Show numeric keyboard
  />
  // <View>
  //     <TextInputComponent
  //       placeholder="Reg-no(2000-arid-111)"
  //       textValue={regno}
  //       onChangeText={regno => setregno(regno)}
  //       CustomStyle={{
  //         // padding:20,
  //         // width:'90%',
  //         marginTop: 30,
  //         marginHorizontal: 10,
  //       }}
  //     const [tname, setname] = useState();
  //   </View>
);

//Button
export const ButtonComponent = ({
  buttonTitle,
  onPress,
  CustomStyle,
  customTextstyle,
}) => (
  <TouchableOpacity style={[styles.button, CustomStyle]} onPress={onPress}>
    <Text style={[styles.buttonText, customTextstyle]}>{buttonTitle}</Text>
  </TouchableOpacity>
  //Components
  //  <View style={styles.buttons}>
  //  <ButtonComponent
  //    buttonTitle='Ok'
  //    onPress={Eventmanagerdata}
  //    CustomStyle={{
  //      width: '50%',
  //      marginHorizontal: 5,
  //    }}
  //  /></View>

  //Stle of button
  // buttons: {
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   padding: 20
  // }
);

//Drop Down
export const DropdownComponent = ({
  items,
  placeholder,
  CustomStyle,
  dropDownContainerStyle,
  open,
  value,
  setOpen,
  setValue,
  setItems,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder || 'Select an option'}
      style={[styles.dropdown, CustomStyle]}
      dropDownContainerStyle={[
        styles.dropDownContainer,
        dropDownContainerStyle,
      ]}
    />
    // to check the setting go to CricketRegistration of dropdowns
    //Ststes
    //   const [open1, setOpen1] = useState(false);
    // const [value1, setValue1] = useState(null);
    // const [items1, setItems1] = useState([]);

    //Components used when to import the drop down in other Screens.
    //  // CustomStyle={}         // Optional custom styles
    // // dropDownContainerStyle={styles.dropDownContainerCustom}
    // open={open1}
    // value={value1}
    // items={items1}
    // setOpen={setOpen1}
    // setValue={setValue1}
    // setItems={setItems1}
    // placeholder="Select Session"
  );
};

//AppBar
export const AppBarComponent = ({handleBackPress, title, CustomStyle}) => (
  <Appbar.Header style={[styles.appbarSetting, CustomStyle]}>
    <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
    <Appbar.Content title={title} titleStyle={styles.appbarTitle} />
  </Appbar.Header>
  //<AppBarComponent title={'BIIT Sports'} handleBackPress={handlelogin}/>
);

//SAfeAreaview
export const SafeAreaViewComponent = ({children, CustomStyle}) => (
  <SafeAreaView style={[styles.safeArea, CustomStyle]}>{children}</SafeAreaView>
);
export const BASE_URL =
  'http://192.168.189.60/SportsManagementSystemBE/Resources';

//
export const Card = ({children, customStyle}) => {
  return <View style={[styles.card, customStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 50, // More rounded button
    alignItems: 'center',
    // width: '90%',  // Smaller width for button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  appbarSetting: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    margin: 10,
  },
  dropDownContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 12,
    minHeight: 200, // Ensures the card is at least 100px tall
    marginTop: 30,
  },
});
