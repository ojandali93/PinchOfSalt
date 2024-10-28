import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SingleRecipeScreen from '../Screens/Recipes/SingleRecipeScreen';
import SelectedProfileScreen from '../Screens/Profile/SelectedProfileScreen';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
import ListsScreen from '../Screens/Lists/ListsScreen';
import CreateListScreen from '../Screens/Lists/CreateListScreen';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileSetupScreen from '../Screens/Authentication/ProfileSetupScreen';
import SingleListScreen from '../Screens/Lists/SingleListScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';

export type ListStackParamsList = {
  ListsScreen: undefined;
  CreateListScreen: undefined;
  SelectedProfileScreenExplore: {user_id: string};
  LoginScreenList: undefined;
  SignupScreenList: undefined;
  ProfileSetupScreenList: undefined;
  SingleListScreen: {list: any};
  ListDetailsScreen: {list: any}
};

const StackNav = createStackNavigator<ListStackParamsList>();

const ListStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListsScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="ListsScreen" component={ListsScreen} />
        <StackNav.Screen name="CreateListScreen" component={CreateListScreen} />
        <StackNav.Screen name="SelectedProfileScreenExplore" component={SelectedProfileScreen} />
        <StackNav.Screen name="LoginScreenList" component={LoginScreen} />
        <StackNav.Screen name="SignupScreenList" component={SignupScreen} />
        <StackNav.Screen name="ProfileSetupScreenList" component={ProfileSetupScreen} />
        <StackNav.Screen name="SingleListScreen" component={SingleListScreen} />
        <StackNav.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default ListStackNavigation;
