import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import RaiseTicketScreen from './Tickets/Raiseticket';
import TicketDataScreen from './Tickets/Ticketdata';
import TicketDetailsScreen from './Tickets/TicketDetailsScreen';

const ProfileScreen = ({ navigation,route}) => {
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    if (route.params && route.params.newTicket) {
      const { newTicket } = route.params;
      setTickets((prevTickets) => [...prevTickets, newTicket]);
    } else if (route.params && route.params.editedTicket) {
      const { editedTicket } = route.params;
      const updatedTickets = tickets.map((ticket) => {
        if (ticket.id === editedTicket.id) {
          return editedTicket;
        }
        return ticket;
      });
      setTickets(updatedTickets);
    } else if (route.params && route.params.updatedTickets) {
      const { updatedTickets } = route.params;
      setTickets(updatedTickets);
    }
  }, [route.params]);
  


  const openDrawer = () => {
    navigation.openDrawer();
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openDrawer}>
          <Image source={require('./Cat.png')} style={{ width: 40, height:40 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}
        source={require('./Background.jpg')}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 16 }}>
          <Text style={{ fontWeight: '800', fontSize: 25 }}>Main Screen</Text>
          <View />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('RaiseTicketScreen') }>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('./newticketsmall.png')} style={{ width: 50, height: 50 }} />
                <Text style={{ fontWeight: '800' }}>Raise new tickets</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TicketDataScreen', { tickets, setTickets,navigateTo: 'UserProfile'})}>
  <View style={{ alignItems: 'center' }}>
    <Image source={require('./ticketdata.png')} style={{ width: 50, height: 50 }} />
    <Text style={{ fontWeight: '800' }}>Ticket data</Text>
  </View>
</TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('TicketDetailsScreen')}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('./ticketdetailssmall.png')} style={{ width: 50, height: 50 }} />
                <Text style={{ fontWeight: '800' }}>Ticket details</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Image source={require('./UserIcon.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Vignesh</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={{ alignItems: 'baseline', padding: 90 }}>
        <Image source={require('./Cat.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const ProfileStack = () => {
  const [tickets, setTickets] = useState([]);

  const handleAddTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="UserProfile"
        options={{ title: 'User Profile' }}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="RaiseTicketScreen"
        options={{ title: 'Raise Ticket' }}
      >
        {(props) => <RaiseTicketScreen {...props}tickets={tickets} setTickets={setTickets}/>}
      </Drawer.Screen>
      <Drawer.Screen
  name="TicketDataScreen"
  options={{ title: 'Ticket Data' }}
>
  {(props) => (
    <TicketDataScreen {...props} tickets={tickets} setTickets={setTickets} />
  )}
</Drawer.Screen>

      <Drawer.Screen name="TicketDetailsScreen" component={TicketDetailsScreen} />
    </Drawer.Navigator>
  );
};



export default ProfileStack