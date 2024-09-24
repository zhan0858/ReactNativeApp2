import { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={item.completed ? styles.completed : styles.uncompleted}>
        <Text style={styles.status}>{item.completed ? "Completed ✅" : "NOT YET❌"}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaProvider style={styles.StyleSheet}>
      <SafeAreaView>
        <FlatList
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completed: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#C0EBA6',
    borderRadius: 24
  },
  uncompleted: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ccc',
    borderRadius: 24
  },
  title: {
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold'
  }

});
