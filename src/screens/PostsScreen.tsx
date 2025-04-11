import React, {useState,  useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

import api from '../api/api';


type PostsScreenProps = {
  navigation: any;
};

export default function PostsScreen({ navigation }: PostsScreenProps) {

    const [posts, setPosts] = useState([])
    useEffect(() => {
      // Fetch posts from the API
      api.get('/posts')
        .then(res => {
          console.log(res?.data);
          // Here you would typically set the posts to state
          setPosts(res?.data);
        })
        .catch(err => {
          console.error(err);
          // Handle error
        });
    }, []);


  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate('Comments', { postId: item?.id, post:item })}
    >
      <Text style={styles.postTitle}>{item?.title}</Text>
      <View style={styles.postContent}>
        <Text numberOfLines={2}>{item?.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  postItem: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
});
