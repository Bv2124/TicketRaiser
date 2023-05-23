import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entry from './Entry';
import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import ProfileScreen from './ProfileScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    // Simulating a delay to display the splash screen
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // 3000 milliseconds (3 seconds)

    // Animation configuration
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      {splashVisible ? (
        // Splash screen component with animation
        <View style={styles.splashContainer}>
          <Animated.Image
            source={require('./Cat.png')} // Replace with your own splash screen image path
            style={[styles.splashImage, { transform: [{ rotate: spin }] }]}
            resizeMode="contain"
          />
        </View>
      ) : (
        // Main app content
          <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
      <Stack.Screen name="Login Page" component={Entry}  options={{headerShown:false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
       
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '80%',
    height: '80%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default App;