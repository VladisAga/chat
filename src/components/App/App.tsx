import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { PostsList } from '../PostsList/PosterList';
import { UsersList } from '../UsersList/UserList';
import { AddPost } from '../AddPost/AddPost';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Chat } from '../Chat/Chat';

const Stack = createStackNavigator();

function Appp() {
  
  const styles = StyleSheet.create({
    app: {
      flex: 1,
    },
    rightColumn: {
      flex: 1,
      flexDirection: 'column',
      width: '70%',
    },
    postsList: {
      flex: 1,
    },
    usersList: {
      width: '30%',
    },
  });

  return (
    <View style={styles.app}>
      <UsersList /> {/* !!!!!!! */}
      <View style={styles.rightColumn}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="PostsList">
            <Stack.Screen name="PostsList" component={PostsList} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

export default Appp;
