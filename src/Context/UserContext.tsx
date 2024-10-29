import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import supabase from '../Utils/supabase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { Alert, Platform } from 'react-native';
import { useRecipe } from './RecipeContext';
import { storage } from '../Utils/firebaseConfig';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  currentUser: any; 
  currentProfile: any;
  createUserAccount: (
    username: string, 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any
  ) => void,
  creatingProfile: boolean,
  loggingIn: boolean,
  loginUser: (username: string, password: string, navigation: any, screen: string) => void
  getUserLists: (user_id: string) => void,
  userLists: any[],
  getListRecipes: (list_id: number) => void
  listRecipes: any[]
  selectedUserLists: any[], 
  getSelectedUserLists: (user_id: string) => void
  userFollowing: any[],
  getUserFollowing: (user_id: string) => void
  userFollowers: any[],
  getUserFollowers: (user_id: string) => void
  selectedUserFollowing: any[],
  getSelectedUserFollowing: (user_id: string) => void,
  selectedUserFollowers: any[],
  getSelectedUserFollowers: (user_id: string) => void
  userFavorites: any[],
  grabUserFavorites: (user_id: string) => void,
  addToFavorite: (user_id: string, recipe_id: number) => void,
  removeFromFavorite: (favorite: string, user_id: string) => void
  logoutCurrentUser: (navigation: any) => void
  userBlocked: any[]
  deleteAccount: (profileId: number, navigation: any) => void
}

interface SingleImageProp {
  uri: string | undefined;
  fileType: string | undefined;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  const {grabUserRecipes} = useRecipe()

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentProfile, setCurrentProfile] = useState<any>(null)

  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [loadingSelectedProfile, setLoadingSelectedProfile] = useState<boolean>(false)

  const [creatingProfile, setCreatingProfile] = useState<boolean>(false)
  const [loggingIn, setLoggingIn] = useState<boolean>(false)

  const [userLists, setUserLists] = useState<any[]>([])
  const [listRecipes, setListRecipes] = useState<any[]>([])

  const [selectedUserLists, setSelectedUserLists] = useState<any[]>([])

  const [userFollowing, setUserFollowing] = useState<any[]>([])
  const [userFollowers, setUserFollowers] = useState<any[]>([])

  const [selectedUserFollowing, setSelectedUserFollowing] = useState<any[]>([])
  const [selectedUserFollowers, setSelectedUserFollowers] = useState<any[]>([])

  const [userFavorites, setUserFavorites] = useState<any[]>([])
  const [userBlocked, setUserBlocked] = useState<any[]>([])

  const createUserAccount = async (
    username: string, 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any
  ) => {
    setCreatingProfile(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,        
        password: password, 
        options: {
          data: {
            username: username
          }
        }
      });
      if (signUpError) {
        console.error('Error signing up:', signUpError.message);
        return;
      }
      console.log(profilePic)
      uploadImageToFirebase(username, email, firstName, lastName, profilePic, bio, location, experience, navigation, data.user)
    } catch (error) {
      console.error('there was an error creating the users account: ', error)
    }
  }

  const uploadImageToFirebase = async (
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    profilePic: SingleImageProp, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any,
    user: any
  ) => {
    if (!profilePic) {
      console.log('no profile picture');
      createUsersProfile(username, email, firstName, lastName, '', bio, location, experience, navigation, user.id);
      return;
    }
  
    try {
      const folderName = 'ProfilePictures'; 
      const response = await fetch(profilePic.uri);
      const blob = await response.blob(); 
      const fileKey = `${folderName}/${Date.now()}-${blob.data.name}`;
  
      const storageRef = ref(storage, fileKey);
      const snapshot = await uploadBytesResumable(storageRef, blob);
    
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('image downloadable url: ', downloadURL);
      createUsersProfile(username, email, firstName, lastName, downloadURL, bio, location, experience, navigation, user.id);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const createUsersProfile = async (
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    profilePic: string, 
    bio: string, 
    location: string, 
    experience: string,
    navigation: any,
    user: any
  ) => {
    try{
      const { error: profileError } = await supabase
        .from('Profiles')
        .insert([
          {
            user_id: user,  // Make sure this maps to user_id in the DB
            username: username.toLowerCase(),
            email: email,
            bio: bio,
            location: location,
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            account_name: `${firstName} ${lastName}`,
            profile_picture: profilePic,
            public: true,
            notifications: false,
            verified: false,
            launch: false,
            followers: 0,
            following: 0,
            recipes: 0,
            lists: 0,
            experience: experience
          },
        ]);

      // Handle profile insertion errors
      if (profileError) {
        console.error('Error creating profile:', profileError.message);
        return;
      }

      getUserProfile(navigation, username, user)

    } catch (err) {
      console.error('An error occurred while creating an account:', err);
    }
  }

  const getUserProfile = async (navigation: any, username: string, user: any) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('username', username.toLowerCase());
      if (error) {
        console.error('Error fetching data:', error);
      }
      setCurrentProfile(data)
      setCurrentUser(user)
      setCreatingProfile(false)
      Alert.alert(
        'Account Setup',
        'A verification email has been sent. Please check your email to verify your account. Check your spam folder.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'), // Navigate to the next screen
          },
        ]
      );
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  // USER LOGIN FUNCTIONS
  // - takes in username, password, and navigation

  const loginUser = async (username: string, password: string, navigation: any, screen: string) => {
    setLoggingIn(true)
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('username', username); // Filter where username matches loginUsername
      if (error) {
        // console.error('Error fetching profile:', error.message);
        Alert.alert('Invaid Username', 'Userame does not match any records')
      } else {
        if(data.length === 0){
          Alert.alert('Invaid Username', 'Userame does not match any records')
        } else {
          loginToAccount(data[0]['email'], username, password, navigation, screen)
        }
      }
    } catch (err) {
      console.error('An error occurred while fetching recipes:', err);
    }
  }

  const loginToAccount = async (email: string, username: string, password: string, navigation: any, screen: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error('Login error:', error.message);
        setLoggingIn(false)
        if(error.message === 'Email not confirmed'){
          Alert.alert('Account Confirmation', 'Please check your email and confirm your account before logging in.');
        } else if (error.message != 'Email not confirmed') {
          Alert.alert('Login Failed', 'Username or password does not match our records.');
        }
      } else {
        getUserProfileLogin(username, navigation, data.user, screen)
      }
    } catch (err) {
      console.error('Error logging in:', err.message);
      setLoggingIn(false)
      Alert.alert('An error occurred', 'Please try again later.');
    }
  };

  const logoutCurrentUser = async (navigation: any) => {
    console.log('logout user')
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
        return false;
      }
      setCurrentProfile(null)
      navigation.navigate('ProfileScreen')
      console.log('Successfully logged out');
      return true;
    } catch (err) {
      console.error('Unexpected error logging out:', err);
      return false;
    }
  };

  const getUserProfileLogin = async (username: string, navigation: any, user: any, screen: string) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('username', username);
      if (error) {
        console.error('Error fetching data:', error);
      }
      setCurrentUser(user)
      setCurrentProfile(data[0])
      grabUserRecipes(data[0].user_id)
      getUserLists(data[0].user_id)
      getUserFollowing(data[0].user_id)
      getUserFollowers(data[0].user_id)
      grabUserFavorites(data[0].user_id)
      getUserBlocked(data[0].user_id)
      setLoggingIn(false)
      navigation.navigate(screen)
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  const getUserLists = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Collections')
        .select('*')
        .eq('user_id', user_id); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setUserLists(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const getUserBlocked = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Relations')
        .select(`
          *, 
          Profiles(*)
        `)
        .eq('follower', user_id)
        .eq('status', 'blocked'); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      console.log('all of the blocked users: ', JSON.stringify(collectionsData))
      setUserBlocked(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const getUserFollowing = async (user_id: string) => {
    try {
      const { data: followingData, error: followingError } = await supabase
        .from('Relations')
        .select(`
          *
        `)
        .eq('follower', user_id);
  
      if (followingError) {
        console.error('Error fetching followed profiles:', followingError);
        return;
      }
      let following_ids: any[] = []
      followingData.map((item) => {
        following_ids.push(item.following)
      })
      try {
        const { data: recipesData, error } = await supabase
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
          .in('user_id', following_ids); 

        if (error) {
          console.error('Error fetching recipes:', error);
          return;
        }
        setUserFollowing(recipesData);
      } catch(errors) {
        console.error('An error occured when checking recipes for user_ids:', err);
      }
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };
  
  const getUserFollowers = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Relations')
        .select(`
          *, 
          Profiles(*)
        `)
        .eq('following', user_id); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setUserFollowers(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const getSelectedUserFollowing = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Relations')
        .select(`
          *, 
          Profiles(*)
        `)
        .eq('follower', user_id); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setSelectedUserFollowing(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const getSelectedUserFollowers = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Relations')
        .select(`
          *, 
          Profiles(*)
        `)
        .eq('following', user_id); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setSelectedUserFollowers(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };
  
  const getListRecipes = async (list_id: number) => {
    try {
      // Step 1: Fetch all records from CollectionPlaces where collection_id matches
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('CollectionPlaces')
        .select('recipe_id')
        .eq('collection_id', list_id);
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      if (collectionsData.length === 0) {
        return;
      }
      const recipePromises = collectionsData.map(async (collectionPlace) => {
        const { recipe_id } = collectionPlace;
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
          .eq('id', recipe_id)
          .single();  
        if (recipeError) {
          console.error(`Error fetching recipe with id: ${recipe_id}`, recipeError);
          return null;
        }
        return recipeData;  // Return the recipe data
      });
      const recipes = await Promise.all(recipePromises);
      const filteredRecipes = recipes.filter((recipe) => recipe !== null);
      setListRecipes(filteredRecipes);
    } catch (err) {
      console.error('An error occurred while fetching list recipes:', err);
    }
  };

  const getSelectedUserLists = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Collections')
        .select('*')
        .eq('user_id', user_id); 
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setSelectedUserLists(collectionsData);
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const grabUserFavorites = async (user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Favorites')
        .select('*, Recipes(*)')
        .eq('user_id', user_id)
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      setUserFavorites(collectionsData)
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const addToFavorite = async (user_id: string, recipe_id: number) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Favorites')
        .insert([
          {
            user_id: user_id,
            recipe_id: recipe_id
          }
        ])
        .select()
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      grabUserFavorites(user_id)
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const removeFromFavorite = async (favorite: string, user_id: string) => {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Favorites')
        .delete()
        .eq('id', favorite);
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        return;
      }
      grabUserFavorites(user_id)
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };

  const deleteAccount = async (profileId: number, navigation: any) => {
    setCurrentProfile(null)
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('Profiles')
        .delete()
        .eq('id', profileId);
      if (collectionsError) {
        console.error('Error fetching collections:', collectionsError);
        navigation.goBack()
      }
    } catch (err) {
      console.error('An error occurred while fetching user lists and recipes:', err);
    }
  };
  
  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentProfile,
        createUserAccount,
        creatingProfile,
        loggingIn,
        loginUser,
        getUserLists,
        userLists,
        getListRecipes,
        listRecipes,
        selectedUserLists, 
        getSelectedUserLists,
        userFollowing,
        getUserFollowing,
        userFollowers,
        getUserFollowers,
        selectedUserFollowing,
        getSelectedUserFollowing,
        selectedUserFollowers,
        getSelectedUserFollowers,
        userFavorites,
        grabUserFavorites,
        addToFavorite,
        removeFromFavorite,
        logoutCurrentUser,
        userBlocked,
        deleteAccount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};