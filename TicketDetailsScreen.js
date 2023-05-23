import { View, Image, Text } from 'react-native';
const TicketDetailsScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../ticketdetailsmain.png')} style={{ width: 250, height: 250 }} />
        <Text style={{ fontSize: 50 }}>Ticket details</Text>
      </View>
    );
  };
  export default TicketDetailsScreen