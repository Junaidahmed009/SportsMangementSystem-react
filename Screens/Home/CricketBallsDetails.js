import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';

export default function CricketBallsDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {fixtureid} = route.params;

  const [team1Deliveries, setTeam1Deliveries] = useState([]);
  const [team2Deliveries, setTeam2Deliveries] = useState([]);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await Api.Fetchdeliveriesdetails(fixtureid);
      if (response.status === 200) {
        const data = response.data;
        setTeam1Deliveries(data.team1 || []);
        setTeam2Deliveries(data.team2 || []);
        // Ensure team names are strings
        setTeam1Name(String(data.team1name || 'Team 1'));
        setTeam2Name(String(data.team2name || 'Team 2'));
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Fixture or Score Found.');
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };

  // const printdata = () => {
  //   console.log(fixtureid);
  //   console.log(team1Deliveries);
  //   console.log(team2Deliveries);
  //   console.log(team1Name);
  //   console.log(team2Name);
  // };
  //   Safely convert all fields to strings before rendering
  const renderDeliveryItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={[styles.rowText, {flex: 1}]}>
        {String(item?.Over ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 1}]}>
        {String(item?.Ball ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 2}]}>
        {String(item?.Striker ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 2}]}>
        {String(item?.NonStriker ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 2}]}>
        {String(item?.Bowler ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 1}]}>
        {String(item?.BatsmanRuns ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 1}]}>
        {String(item?.ExtraRuns ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 2}]}>
        {String(item?.ExtraType ?? '')}
      </Text>
      <Text style={[styles.rowText, {flex: 1}]}>
        {item?.IsWicket ? 'Yes' : 'No'}
      </Text>
    </View>
  );

  //   Render the table header
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, {flex: 1}]}>Over</Text>
      <Text style={[styles.headerText, {flex: 1}]}>Ball</Text>
      <Text style={[styles.headerText, {flex: 2}]}>Striker</Text>
      <Text style={[styles.headerText, {flex: 2}]}>Non-Striker</Text>
      <Text style={[styles.headerText, {flex: 2}]}>Bowler</Text>
      <Text style={[styles.headerText, {flex: 1}]}>Runs</Text>
      <Text style={[styles.headerText, {flex: 1}]}>Extras</Text>
      <Text style={[styles.headerText, {flex: 2}]}>Extra Type</Text>
      <Text style={[styles.headerText, {flex: 1}]}>Wkt</Text>
    </View>
  );

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Ball By Ball Detail" />
      {/* <Button onPress={printdata} title="dsdfna"></Button> */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.phoneheading}>Rotate the Phone For Clear view</Text>
        <Text style={styles.teamHeading}>{team1Name}</Text>
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={team1Deliveries}
            keyExtractor={(item, index) => `team1-${index}`}
            renderItem={renderDeliveryItem}
            scrollEnabled={false}
          />
        </View>

        {/* Team 2 Section */}
        <Text style={styles.teamHeading}>{team2Name}</Text>
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={team2Deliveries}
            keyExtractor={(item, index) => `team2-${index}`}
            renderItem={renderDeliveryItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  teamHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  phoneheading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
    // marginVertical: 10,
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1, // Add border to the entire table
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1, // Line between header and data
    borderColor: '#ddd',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1, // Add line between rows
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  rowText: {
    color: '#333',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 5,
    borderRightWidth: 1, // Add column separation
    borderColor: '#ddd',
  },
  lastColumn: {
    borderRightWidth: 0, // Remove right border for last column
  },
});
