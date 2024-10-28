
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import supabase from '../Utils/supabase';
import { storage } from '../Utils/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

const ListContext = createContext<ListContextType | undefined>(undefined);

export function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('Listecipe must be used within a ListProvider');
  }
  return context;
}

interface ListProviderProps {
  children: ReactNode;
}

interface ListContextType {
  listMembers: any[],
  getListMembers: (list_id: number) => void
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {

  const [listMembers, setListMembers] = useState<any[]>([])

  const getListMembers = async (list_id: number) => {
    try {
      const { data: ListData, error: ListError } = await supabase
        .from('Members')
        .select(`*, Profiles(*)`)
        .eq('collection_id', list_id);
      if (ListError) {
        console.error('Error fetching List:', ListError);
        return;
      }
      setListMembers(ListData);
    } catch (err) {
      console.error('An error occurred while fetching List and profiles:', err);
    }
  }
  
  return (
    <ListContext.Provider
      value={{
        listMembers,
        getListMembers
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
