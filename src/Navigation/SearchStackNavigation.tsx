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
import SearchScreen from '../Screens/Search/SearchScreen';

export type SearchStackParamList = {
  SearchScreen: undefined;
  SelectedProfileScreen: {user_id: string};
  SingleRecipeScreen: {recipe: any}
};

const StackNav = createStackNavigator<SearchStackParamList>();

const SearchStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="SearchScreen" component={SearchScreen} />
        <StackNav.Screen name="SelectedProfileScreen" component={SelectedProfileScreen} />
        <StackNav.Screen name="SingleRecipeScreen" component={SingleRecipeScreen} />
    </StackNav.Navigator>
  );
};

export default SearchStackNavigation;
