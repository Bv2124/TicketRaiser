import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,Alert,Button} from 'react-native';


  const TicketDataScreen = ({ navigation, route }) => {
    const [tickets, setTickets] = useState([]);
    const [showAlert,setShowAlert]=useState(false);
    useEffect(() => {
      if (showAlert) {
        cancelable:true
        Alert.alert('Success', 'The selected ticket has been deleted successfully');
        setShowAlert(false); // Reset the showAlert state variable
      }
    }, [showAlert]);
    useEffect(() => {
      if (route.params && route.params.tickets) {
        setTickets(route.params.tickets);
      }
    }, [route.params]);
  const handleEditTicket = (index) => {
  const editedTicket = tickets[index]; // Get the ticket object to edit

  // Navigate to the ticket editing screen, passing the ticket object as a parameter
  navigation.navigate('RaiseTicketScreen', { ticket: editedTicket, navigateTo:'UserProfile' });

};

const handleDeleteTicket = (index) => {
  const updatedTickets = [...tickets]; // Create a copy of the tickets array
  updatedTickets.splice(index, 1); // Remove the ticket at the specified index

  // Update the state with the modified tickets array
  setTickets(updatedTickets);
  // Show an alert indicating successful deletion
 setShowAlert(true);
  
  // Navigate back to the ProfileScreen and pass the updated tickets as a parameter
  navigation.navigate('UserProfile', { updatedTickets });
};



  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
 {tickets ? (
  tickets.map((ticket, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardcontent}>
            <Text style={styles.titl}>Ticket No{index + 1}</Text>
            <Text style={styles.title}>User Name: {ticket.userName}</Text>
            <Text style={styles.title}>User Email: {ticket.userEmail}</Text>
            <Text style={styles.title}>Ticket Date: {ticket.ticketDate}</Text>
            <Text style={styles.title}>User Age: {ticket.userAge}</Text>
            </View>
<View style={styles.buttoncontainer}>
  <Button
    onPress={()=> handleEditTicket(index)}
    title="Edit"
    color='blue'
    />
    <Button
    onPress={()=> handleDeleteTicket(index)}
    title="Delete"
    color='red'
    />
</View>
          </View>
        ))
      ) : (
        <Text>No tickets available</Text>
      )}
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    flexDirection:'row'
  },
  titl: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0066c0',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  cardcontent:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  buttoncontainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
    },
});

export default TicketDataScreen;
