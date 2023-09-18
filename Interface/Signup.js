import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

import "firebase/compat/auth";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = async (email, password) => {
    // Password pattern for validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (!passwordPattern.test(password)) {
      alert(
        'Password must contain at least one lowercase character, one uppercase character, one number, and be at least 8 characters long.'
      );
      return;
    }
  
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // User successfully registered
      alert('Registration successful!');
      navigation.navigate('Welcome'); // Redirect to the login screen
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Sign Up</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => signupUser(email, password)}
        style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    margin: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
