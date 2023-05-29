import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../pages/home';
import Login from '../pages/login';
import CreateAtividade from '../pages/activity';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export default function Routes() {

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator initialRouteName='HomeScreen'>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      </HomeStack.Navigator>
    )
  }

  function TabScreens() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={TabScreens} />
        <Stack.Screen name="CreateAtividade" component={CreateAtividade} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
