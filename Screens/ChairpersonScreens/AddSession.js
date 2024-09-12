import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

export default function AddSession() {
    const [name, setName] = React.useState("");
    const [startdate, setStartdate] = React.useState(new Date());
    const [enddate, setEnddate] = React.useState(new Date());
    const [openStart, setOpenStart] = React.useState(false);
    const [openEnd, setOpenEnd] = React.useState(false);
    const navigation = useNavigation();

    const handlesessions = async () => {
        if (!name) {
            Alert.alert('Name field is empty.');
            return;
        }
    
        const sessiondetail = {
            name,
            startDate: startdate,
            endDate: enddate
        };
    
        try {
            const response = await Api.addsession(sessiondetail);
    
            if (response.status === 201) {
                Alert.alert('Session Saved SucessFully.');
                navigation.navigate('Chairperson')
                    
            } else {
                Alert.alert('Failed to save session.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Alert.alert('Session Name already exists.');
            } else {
                Alert.alert('An error occurred. Please try again.');
            }
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    };

    const handleBack = () => {
        navigation.goBack(); // Use goBack() to return to the previous screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={styles.appbarsetting}>
                <Appbar.BackAction onPress={handleBack} color="#ffffff" />
                <Appbar.Content title="Sessions" titleStyle={styles.appbarTitle} />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput
                    style={styles.textbox1}
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />
                <Button onPress={() => setOpenStart(true)} mode="contained" style={styles.dateButton}>
                    <Text style={styles.textstyling}>Start Date: {formatDate(startdate)}</Text>
                </Button>
                <DatePicker
                    modal
                    mode="date"
                    open={openStart}
                    date={startdate}
                    onConfirm={(date) => {
                        setOpenStart(false);
                        setStartdate(date);
                    }}
                    onCancel={() => setOpenStart(false)}
                />
                <Button onPress={() => setOpenEnd(true)} mode="contained" style={styles.dateButton}>
                    <Text style={styles.textstyling}>End Date: {formatDate(enddate)}</Text>
                </Button>
                <DatePicker
                    modal
                    mode="date"
                    open={openEnd}
                    date={enddate}
                    onConfirm={(date) => {
                        setOpenEnd(false);
                        setEnddate(date);
                    }}
                    onCancel={() => setOpenEnd(false)}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.buttonlogin}
                        mode="contained"
                        onPress={handlesessions}
                        labelStyle={{ fontSize: 17, color: '#ffffff' }}
                    >
                        Save
                    </Button>
                </View>
            </View>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textbox1: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
    },
    dateButton: {
        backgroundColor: '#6200ee',
        marginBottom: 15,
        justifyContent: 'center',
        height: 45,
        width: 340,
        margin: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonlogin: {
        backgroundColor: '#6200ee',
        width: 200,
        height: 40,
    },
    textstyling: {
        color: '#ffffff',
        fontSize: 20,
    }
});
