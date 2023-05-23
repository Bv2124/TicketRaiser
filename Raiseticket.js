import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,Alert } from 'react-native';
const RaiseTicketScreen = ({navigation,route}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [userAge, setUserAge] = useState('');
  const [showAlert,setShowAlert] = useState(false);
  useEffect(() => {
    if (showAlert) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      setShowAlert(false); // Reset the showAlert state variable
    }
  }, []);
  useEffect(() => {
    // Check if the ticket object is passed as a parameter
    if (route.params && route.params.ticket) {
      const { userName, userEmail, ticketDate, userAge } = route.params.ticket;
      setUserName(userName);
      setUserEmail(userEmail);
      setTicketDate(ticketDate);
      setUserAge(userAge);
    }
  }, [route.params]);
  const handleCreateTicket = () => {
    if (!userName || !userEmail || !ticketDate || !userAge) {
      setShowAlert(true);
      return;
    }

    const newTicket = {
      userName,
      userEmail,
      ticketDate,
      userAge,
    };

    if (route.params && route.params.ticket) {
      const editedTicket = {
        ...route.params.ticket,
        ...newTicket,
      };

      const { ticket, navigateTo } = route.params;
      ticket.userName = editedTicket.userName;
      ticket.userEmail = editedTicket.userEmail;
      ticket.ticketDate = editedTicket.ticketDate;
      ticket.userAge = editedTicket.userAge;

      setUserName('');
      setUserEmail('');
      setTicketDate('');
      setUserAge('');

      navigation.navigate(navigateTo, { tickets: newTicket });
    } else {
      setUserName('');
      setUserEmail('');
      setTicketDate('');
      setUserAge('');

      navigation.navigate('UserProfile', { newTicket });
    }
  };
  
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}
        source={require('../Background.jpg')}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create New Ticket</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm User Name"
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm User Email"
            onChangeText={(text) => setUserEmail(text)}
            value={userEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(text) => setTicketDate(text)}
            value={ticketDate}
          />
         <TextInput
            style={styles.input}
            placeholder="User Age"
            onChangeText={(text) => setUserAge(text)}
            value={userAge}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateTicket}>
            <Text style={styles.buttonText}>Create Ticket</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066c0',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RaiseTicketScreen;
