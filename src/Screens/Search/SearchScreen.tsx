import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Template from '../../Components/Headers/Template';
import tailwind from 'twrnc';
import TemplateRecipe from '../../Components/Tiles/TemplateRecipe';
import { Search, Sliders } from 'react-native-feather';
import supabase from '../../Utils/supabase'; // Assuming you have supabase set up
import RecipeTile from '../../Components/Tiles/RecipeTile';
import {FeaturedFilters} from '../../Other/RecipesOptions'

const SearchScreen = () => {
  const [text, setText] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [featuredRecipes, setFeaturedRecipes] = useState<any[]>([]); // Store the featured recipes here

  // Function to fetch featured recipes and related user profiles
  const getFeaturedRecipes = async () => {
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
        .eq('featured', true); // Only fetch featured recipes

      if (recipesError) {
        console.error('Error fetching featured recipes:', recipesError);
        return;
      }

      setFeaturedRecipes(recipesData); // Update the state with the fetched recipes and user profiles
    } catch (error) {
      console.error('Unexpected error while fetching featured recipes:', error);
    }
  };

  const searchRecipes = async (searchTerm: string) => {
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
        .ilike('title', `%${searchTerm}%`); // Search by title using the search term
  
      if (recipesError) {
        console.error('Error fetching recipes in search screen:', recipesError);
        return;
      }
  
      // Now we loop through the recipes and get the related user profile for each
      
      setFeaturedRecipes(recipesData); // Update the state with the fetched recipes and user profiles
    } catch (error) {
      console.error('Unexpected error while fetching recipes:', error);
    }
  };

  const searchRecipeCategory = async (category: string) => {
    setText(category)
    setFeaturedRecipes([]);
    try {
      const { data: categoryRecords, error: categoryError } = await supabase
        .from('Categories')
        .select('recipe_id')
        .eq('category', category); 
  
      if (categoryError) {
        console.error('Error fetching categories:', categoryError);
        return;
      }
      const recipeIds = categoryRecords.map((record) => record.recipe_id);
      for (const recipeId of recipeIds) {
        const { data: recipeData, error: recipeError } = await supabase
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
          .eq('id', recipeId) 
          .single();
        if (recipeError) {
          console.error(`Error fetching recipe ${recipeId}:`, recipeError);
          continue;
        }
        setFeaturedRecipes(recipeData);
      }
    } catch (error) {
      console.error('Unexpected error while fetching recipes for category:', error);
    }
  };
  
  
  useEffect(() => {
    searchRecipes(text)
  }, [text])

  useEffect(() => {
    getFeaturedRecipes();
  }, []);

  const resetFeatured = () => {
    setText('')
    getFeaturedRecipes();
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <View style={tailwind`w-full bg-slate-950 rounded-bl-5 rounded-br-5 px-4`}>
        <View style={tailwind`mt-2 flex flex-row items-center`}>
          <View style={tailwind`flex-1 bg-stone-100 p-1 rounded-full flex flex-row items-center mb-4`}>
            <TextInput 
              value={text}
              onChangeText={setText}
              placeholder='Search Recipes...'
              placeholderTextColor={'#4f4f4f'}
              style={tailwind`flex-1 px-2`}
            />
            <TouchableOpacity style={tailwind`p-2 bg-stone-500 rounded-full`}>
              <Search height={16} width={16} color={'white'} style={tailwind``} />
            </TouchableOpacity>
          </View>
          {
            text.length > 0 
              ? <TouchableOpacity onPress={() => {resetFeatured()}} style={tailwind`bg-red-500 ml-3 p-2 rounded-full flex flex-row items-center mb-4 `}>
                  <Text style={tailwind`text-base text-white font-semibold`}>{'Clear'}</Text>
                </TouchableOpacity>
              : null
          }
        </View>
        <View style={tailwind`mb-5`}>
          <FlatList
            data={FeaturedFilters}
            horizontal
            renderItem={({item, index}) => {
              return(
                <TouchableOpacity onPress={() => {searchRecipeCategory(item.value)}} key={index} style={tailwind`py-2 px-3 bg-white mr-2 rounded-full`}>
                  <Text style={tailwind`text-black`}>{item.value}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
      <ScrollView style={tailwind`flex-1 p-2`}>
        {featuredRecipes.map((recipe, index) => (
          <RecipeTile key={index} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
