import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileSetupScreen from '../Screens/Authentication/ProfileSetupScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SingleListScreen from '../Screens/Lists/SingleListScreen';
import SingleRecipeScreen from '../Screens/Recipes/SingleRecipeScreen';
import SelectedProfileScreen from '../Screens/Profile/SelectedProfileScreen';
import SettingsScreen from '../Screens/Profile/SettingsScreen';
import ContactUsScreen from '../Screens/Profile/ContactUsScreen';
import FaqScreen from '../Screens/Profile/FaqScreen';
import FeedbackScreen from '../Screens/Profile/FeedbackScreen';
import AboutScreen from '../Screens/Profile/AboutScreen';
import EditProfile from '../Screens/Profile/EditProfile';
import ResetPassword from '../Screens/Profile/ResetPassword';
import FavoritesScreen from '../Screens/Feed/FavoritesScreen';
import BlockedUsersScreen from '../Screens/Profile/BlockedUsersScreen';

export type AuthStackParamList = {
  ProfileScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ProfileSetupScreen: {
                        username: string, 
                        firstName: string, 
                        lastName: string,
                        email: string,
                        password: string,
                        name: string},
  SingleRecipeScreen: {list: any},
  SingleListScreen: {recipe: any},
  SelectedProfileScreen: {user_id: string}
  SettingsScreen: undefined
  ContactUsScreen: undefined
  FaqScreen: undefined
  FeedbackScreen: undefined
  AboutScreen: undefined
  EditProfile: undefined
  ResetPassword: undefined
  FavoritesScreen: undefined
  BlockedUsersScreen: undefined
};

const StackNav = createStackNavigator<AuthStackParamList>();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
        <StackNav.Screen name="LoginScreen" component={LoginScreen} />
        <StackNav.Screen name="SignupScreen" component={SignupScreen} />
        <StackNav.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} />
        <StackNav.Screen name="SingleRecipeScreen" component={SingleRecipeScreen} />
        <StackNav.Screen name="SingleListScreen" component={SingleListScreen} />
        <StackNav.Screen name="SelectedProfileScreen" component={SelectedProfileScreen} />
        <StackNav.Screen name="SettingsScreen" component={SettingsScreen} />
        <StackNav.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <StackNav.Screen name="FaqScreen" component={FaqScreen} />
        <StackNav.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <StackNav.Screen name="AboutScreen" component={AboutScreen} />
        <StackNav.Screen name="EditProfile" component={EditProfile} />
        <StackNav.Screen name="ResetPassword" component={ResetPassword} />
        <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <StackNav.Screen name="BlockedUsersScreen" component={BlockedUsersScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileStackNavigation;
