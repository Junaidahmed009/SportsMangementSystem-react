import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {getUserData} from './UserData';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';
export default function Account() {
  const navigation = useNavigation();
  const userData = getUserData();
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetchAccountData();
    console.log(data);
  }, []);
  const fetchAccountData = async () => {
    try {
      const userid = userData.id;
      const response = await Api.fetchaccountdata(userid);
      if (response.status === 200) {
        const accountdata = response.data.map(acc => ({
          name: acc.name,
          regno: acc.registration_no,
          role: acc.role,
          session: acc.session,
        }));
        setdata(accountdata);
      } else {
        Alert.alert('No data Found');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Data Found');
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Account Details'}
        // handleBackPress={handlelogin}
      />
      {data.map((item, index) => (
        <View key={index} style={styles.teamContainer}>
          <View style={styles.matchtype}>
            <Text style={styles.teamName}>Name:{item.name}</Text>
          </View>
          <Text style={styles.captainText}>Reg_No: {item.regno}</Text>
          <Text style={styles.captainText}>Role: {item.role}</Text>
          <Text style={styles.captainText}>Sesssin Name: {item.session}</Text>
        </View>
      ))}
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  teamContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    margin: 10,
  },
  teamName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  matchtype: {
    marginBottom: 5,
    // marginTop: 10,
    alignItems: 'center',
  },

  captainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
});
