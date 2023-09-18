import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const MyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch  user's details
    const fetchUserDetails = async () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {

    try {
      await firebase.auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      {user ? (
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{user.displayName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>

          <Button title="Log Out" onPress={handleLogout} color="black" style={{backgroundColor:'gold'}} />
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
   
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    color: '#000',
  },
});
