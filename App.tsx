import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostsScreen from "./src/screens/PostsScreen"
import CommentsScreen from "./src/screens/CommentsScreen"
import EditCommentScreen from "./src/screens/EditCommentScreen"

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Posts",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: "Comments",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EditComment"
          component={EditCommentScreen}
          options={{
            title: "Edit Comment",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
