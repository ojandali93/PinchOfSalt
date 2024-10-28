import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SingleRecipeScreen from '../Screens/Recipes/SingleRecipeScreen';
import SelectedProfileScreen from '../Screens/Profile/SelectedProfileScreen';
import ExploreScreen from '../Screens/Explore/ExploreScreen';

export type FeedStackParamList = {
  ExploreScreen: undefined;
  SingleRecipeScreenExplore: {recipe: any};
  SelectedProfileScreen: {user_id: string};
};

const StackNav = createStackNavigator<FeedStackParamList>();

const ExploreStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={{headerShown: false}}>
        <StackNav.Screen name="ExploreScreen" component={ExploreScreen} />
        <StackNav.Screen name="SingleRecipeScreenExplore" component={SingleRecipeScreen} />
        <StackNav.Screen name="SelectedProfileScreen" component={SelectedProfileScreen} />
    </StackNav.Navigator>
  );
};

export default ExploreStackNavigation;
