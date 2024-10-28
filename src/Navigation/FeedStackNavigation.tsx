import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileSetupScreen from '../Screens/Authentication/ProfileSetupScreen';
import FeedScreen from '../Screens/Feed/FeedScreen';
import CreateRecipeScreen from '../Screens/Recipes/CreateRecipeScreen';
import SingleRecipeScreen from '../Screens/Recipes/SingleRecipeScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SelectedProfileScreen from '../Screens/Profile/SelectedProfileScreen';
import AddRecipeToList from '../Screens/Recipes/AddRecipeToList';
import FavoritesScreen from '../Screens/Feed/FavoritesScreen';

export type FeedStackParamList = {
  FeedScreen: undefined;
  SingleRecipeScreen: {recipe: any};
  CreateRecipeScreen: undefined;
  LoginScreenFeed: undefined;
  SignupScreenFeed: undefined;
  ProfileSetupScreenFeed: undefined;
  SelectedProfileScreen: {user_id: string};
  AddRecipeToList: {recipe_id: number};
  FavoritesScreen: undefined;
};

const StackNav = createStackNavigator<FeedStackParamList>();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="FeedScreen" component={FeedScreen} />
        <StackNav.Screen name="SingleRecipeScreen" component={SingleRecipeScreen} />
        <StackNav.Screen name="CreateRecipeScreen" component={CreateRecipeScreen} />
        <StackNav.Screen name="AddRecipeToList" component={AddRecipeToList} />
        <StackNav.Screen name="LoginScreenFeed" component={LoginScreen} />
        <StackNav.Screen name="SignupScreenFeed" component={SignupScreen} />
        <StackNav.Screen name="ProfileSetupScreenFeed" component={ProfileSetupScreen} />
        <StackNav.Screen name="SelectedProfileScreen" component={SelectedProfileScreen} />
        <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </StackNav.Navigator>
  );
};

export default FeedStackNavigation;
