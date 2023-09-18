import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.characterItem}>
      <Text style={styles.characterName}>{item.fullName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <Icon name="cog" size={26} color="#0000FF" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  settingsIcon: {
    marginRight: 10,
    
  },
  characterItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
  },
  characterName: {
    fontSize: 18,
  },
});
