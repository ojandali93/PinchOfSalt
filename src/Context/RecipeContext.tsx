import React, { createContext, useContext, ReactNode, useState, useEffect, Recipeef } from 'react';
import supabase from '../Utils/supabase';
import { storage } from '../Utils/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('Recipeecipe must be used within a RecipeProvider');
  }
  return context;
}

interface RecipeProviderProps {
  children: ReactNode;
}

interface RecipeContextType {
  userRecipes: any[],
  grabUserRecipes: (user_id: string) => void,
  followingRecipes: any[],
  grabUserFollowingRecipes: (user_id: string) => void,
  grabSelectedUserRecipes: (user_id: string) => void,
  selectedUserRecipes: any[]
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {

  const [userRecipes, setUserRecipes] = useState<any[]>([])
  const [selectedUserRecipes, setSelectedUserRecipes] = useState<any[]>([])
  const [followingRecipes, setFollowingRecipes] = useState<any[]>([])

  const grabUserRecipes = async (user_id: string) => {
    try {
      const { data: recipesData, error: recipesError } = await supabase
        .from('Recipes')
        .select(`
          *,
          Categories(*),
          Cuisine(*),
          Ingredients(*),
          Instructions(*),
          Nutrition(*)
        `)
        .eq('user_id', user_id);
      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
        return;
      }
      const recipePromises = recipesData.map(async (recipe) => {
        const { data: profileData, error: profileError } = await supabase
          .from('Profiles')
          .select('*')
          .eq('user_id', recipe.user_id)
          .single(); // Since you are expecting a single profile
        if (profileError) {
          console.error(`Error fetching profile for user_id: ${recipe.user_id}`, profileError);
          return { ...recipe, user_profile: null }; // If there's an error, return the recipe without the profile
        }
        return { ...recipe, user_profile: profileData }; // Add the profile data to the recipe
      });
        const recipesWithProfiles = await Promise.all(recipePromises);
      setUserRecipes(recipesWithProfiles);

    } catch (err) {
      console.error('An error occurred while fetching recipes and profiles:', err);
    }
  };

  const grabSelectedUserRecipes = async (user_id: string) => {
    try {
      const { data: recipesData, error: recipesError } = await supabase
        .from('Recipes')
        .select(`
          *,
          Categories(*),
          Ingredients(*),
          Instructions(*),
          Nutrition(*)
        `)
        .eq('user_id', user_id);
      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
        return;
      }
      const recipePromises = recipesData.map(async (recipe) => {
        const { data: profileData, error: profileError } = await supabase
          .from('Profiles')
          .select('*')
          .eq('user_id', recipe.user_id)
          .single(); // Since you are expecting a single profile
        if (profileError) {
          console.error(`Error fetching profile for user_id: ${recipe.user_id}`, profileError);
          return { ...recipe, user_profile: null }; // If there's an error, return the recipe without the profile
        }
        return { ...recipe, user_profile: profileData }; // Add the profile data to the recipe
      });
        const recipesWithProfiles = await Promise.all(recipePromises);
      setSelectedUserRecipes(recipesWithProfiles);

    } catch (err) {
      console.error('An error occurred while fetching recipes and profiles:', err);
    }
  };
  

  const grabUserFollowingRecipes = (user_id: string) => {
    setFollowingRecipes([])
  }
  
  return (
    <RecipeContext.Provider
      value={{
        userRecipes,
        grabUserRecipes,
        followingRecipes,
        grabUserFollowingRecipes,
        grabSelectedUserRecipes,
        selectedUserRecipes
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
