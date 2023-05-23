import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet, Image, Alert, TouchableOpacity, Animated, Dimensions,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (name === '' && password === '')
     {
      navigation.navigate('ProfileScreen');
    } else {
      Alert.alert(
        'Login Failed',
        'Incorrect username or password.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./Background.jpg')} style={styles.backgroundImage}>
        <View style={styles.formContainer}>
          <Image source={require('./Cat.png')} style={styles.birdImage} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
            <Button title="Login"
            onPress={handleLogin}
            />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 100,
    alignItems: 'center', // Center the content horizontally
    position: 'absolute', // Position the container absolutely
    top: windowHeight / 5 - 100, // Adjust the top position as per your needs
    left: windowWidth / 2 - 100, // Adjust the left position as per your needs
    width: 200, // Adjust the width as per your needs
    height: 200, // Adjust the height as per your needs
  },
  birdImage: {
    width: 250,
    height: 250,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0066c0',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
});

export default LoginScreen;
