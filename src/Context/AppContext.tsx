
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import supabase from '../Utils/supabase';
import { storage } from '../Utils/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Appecipe must be used within a AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  createNotification: (
    user_id: string, 
    like_id: number | null,
    comment_id: number | null,
    post_id: number | null,
    friend_id: number | null, 
    list_id: number | null,
    activity: string,
    created_by: string
  ) => void
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  
  const createNotification = async (
    user_id: string, 
    like_id: number | null,
    comment_id: number | null,
    post_id: number | null,
    friend_id: number | null, 
    list_id: number | null,
    activity: string,
    created_by: string
  ) => {
  
    try {
      // Build the query dynamically to handle nullable fields
      let query = supabase
        .from('Activity')
        .select('*')
        .eq('user_id', user_id)
        .eq('activity', activity);
  
      if (comment_id !== null) query = query.eq('comment_id', comment_id);
      if (post_id !== null) query = query.eq('post_id', post_id);
      if (friend_id !== null) query = query.eq('friend_id', friend_id);
      if (list_id !== null) query = query.eq('friend_id', list_id);
  
      const { data: existingActivity, error: fetchError } = await query.single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.log('Error checking for existing activity: ', fetchError);
        return;
      }
  
      if (existingActivity) {
        return; // Exit if the activity already exists
      }
  
      const { data, error } = await supabase
        .from('Activity')
        .insert([
          {
            user_id,
            like_id,
            comment_id,
            post_id,
            friend_id,
            list_id,
            activity,
            created_by
          }
        ])
        .select();
  
      if (error) {
        console.log('Error adding activity: ', error);
      } else {
      }
    } catch (error) {
      console.log('Unexpected error creating activity: ', error);
    }
  };
  
  
  
  return (
    <AppContext.Provider
      value={{
        createNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
