import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileSetupScreen from '../Screens/Authentication/ProfileSetupScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ProfileSetupScreen: {
                        username: string, 
                        firstName: string, 
                        lastName: string,
                        email: string,
                        password: string,
                        name: string}
};

const StackNav = createStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="LoginScreen" component={LoginScreen} />
      <StackNav.Screen name="SignupScreen" component={SignupScreen} />
      <StackNav.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} />
    </StackNav.Navigator>
  );
};

export default AuthStackNavigation;
