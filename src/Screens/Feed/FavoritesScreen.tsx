import React, { useState, useCallback } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import TemplateRecipe from '../../Components/Tiles/TemplateRecipe';
import { BlurView } from '@react-native-community/blur';
import AuthInput from '../../Components/Inputs/Authentication/AuthInput';
import RedButton from '../../Components/Buttons/Authentication/RedButton';
import Logo from '../../Assets/icon-red.png';
import { useRecipe } from '../../Context/RecipeContext';
import RecipeTile from '../../Components/Tiles/RecipeTile';
import RecipeTileNoProfile from '../../Components/Tiles/RecipeTileNoProfile';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const {userFavorites} = useUser()

  
  return (
    <View style={tailwind`flex-1 bg-white`}>
        <StandardHeader
          header="Favorites"
          back={true}
        />
        <View style={tailwind`flex-1`}>
          <FlatList
            data={userFavorites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View key={item.id} style={tailwind`p-2`}>
                  <RecipeTileNoProfile recipe={item.Recipes} />
                </View>
              );
            }}
          />
        </View>
      </View>
  );
};

export default FavoritesScreen;
