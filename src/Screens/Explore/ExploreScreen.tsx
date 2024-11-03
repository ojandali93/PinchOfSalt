import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import supabase from '../../Utils/supabase';
import StandardHeader from '../../Components/Headers/StandardHeader';
import SearchHeader from '../../Components/Headers/SearchHeader';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const smallImageSize = screenWidth / 3 - 10; // 1x1 size
const largeImageSize = smallImageSize * 2 + 10; // 2x2 size

const ExploreScreen: React.FC = () => {

  const navigation = useNavigation()

  const [recipes, setRecipes] = useState<any[]>([]);

  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    grabAllRecipes();
  }, []);

  const clearSearch = () => {
    setSearch('')
    setSearchResults([])
  }

  const handleUpdateSearch = async (data: string) => {
    setSearch(data)
    try {
      // Perform a query to search for profiles by both username and account_name
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .or(`username.ilike.%${search}%,account_name.ilike.%${search}%`); // Search in both username and account_name
      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }
      setSearchResults(data); // Update the state with the fetched profiles
    } catch (err) {
      console.error('Unexpected error during profile search:', err);
    }
  }

  const grabAllRecipes = async () => {
    try {
      const { data: recipesData, error: recipesError } = await supabase
        .from('Recipes')
        .select(`
          *,
          user_profile:Profiles(*),
          Categories(*),
          Cuisine(*),
          Ingredients(*),
          Instructions(*),
          Nutrition(*)
        `)

      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
        return;
      }

      setRecipes(recipesData);

    } catch (err) {
      console.error('An error occurred while fetching recipes and profiles:', err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    grabAllRecipes().finally(() => {
      setRefreshing(false);
    });
  }, [recipes]);

  const renderRecipeItem = (recipe: any, style: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('SingleRecipeScreenExplore', {recipe: recipe})} style={style}>
        <Image source={{ uri: recipe.main_image }} style={[tailwind`rounded-3`, { width: '100%', height: '100%' }]} />
      </TouchableOpacity>
    );
  };

  const getRecipeChunks = () => {
    let chunks = [];
    for (let i = 0; i < recipes.length; i += 9) {
      const chunk = recipes.slice(i, i + 9); // Get up to 9 recipes per chunk
      chunks.push(chunk); // Push even if it's less than 9
    }
    return chunks;
  };
  
  const renderRecipeGrid = (recipeChunk: any[]) => {
    return (
      <View>
        {/* First Row: 2x2 on the left, two 1x1 on the right */}
        <View style={tailwind`flex-row`}>
          <View style={tailwind`w-2/3 h-80 p-1`}>
            {recipeChunk[0] && renderRecipeItem(recipeChunk[0], tailwind`flex-1`)}
          </View>
          <View style={tailwind`w-1/3 h-80`}>
            <View style={tailwind`flex-1 p-1`}>
              {recipeChunk[1] && renderRecipeItem(recipeChunk[1], tailwind`flex-1`)}
            </View>
            <View style={tailwind`flex-1 p-1`}>
              {recipeChunk[2] && renderRecipeItem(recipeChunk[2], tailwind`flex-1`)}
            </View>
          </View>
        </View>
  
        {/* Second Row: 3x1 layout */}
        <View style={tailwind`flex-row h-40`}>
          <View style={tailwind`flex-1 p-1`}>{recipeChunk[3] && renderRecipeItem(recipeChunk[3], tailwind`flex-1`)}</View>
          <View style={tailwind`flex-1 p-1`}>{recipeChunk[4] && renderRecipeItem(recipeChunk[4], tailwind`flex-1`)}</View>
          <View style={tailwind`flex-1 p-1`}>{recipeChunk[5] && renderRecipeItem(recipeChunk[5], tailwind`flex-1`)}</View>
        </View>
  
        {/* Third Row: Two 1x1 on the left, 2x2 on the right */}
        <View style={tailwind`flex-row`}>
          <View style={tailwind`w-1/3 h-80`}>
            <View style={tailwind`flex-1 p-1`}>
              {recipeChunk[6] && renderRecipeItem(recipeChunk[6], tailwind`flex-1`)}
            </View>
            <View style={tailwind`flex-1 p-1`}>
              {recipeChunk[7] && renderRecipeItem(recipeChunk[7], tailwind`flex-1`)}
            </View>
          </View>
          <View style={tailwind`w-2/3 h-80 p-1`}>
            {recipeChunk[8] && renderRecipeItem(recipeChunk[8], tailwind`flex-1`)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <SearchHeader searchTerm={search} changeSeearchTerm={handleUpdateSearch} clearSearch={clearSearch} searchResults={searchResults}/>
      <FlatList
        data={getRecipeChunks()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderRecipeGrid(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ExploreScreen;
