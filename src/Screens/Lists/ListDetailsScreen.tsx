import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ListStackParamsList } from '../../Navigation/ListStackNavigation'
import { useList } from '../../Context/ListContext'
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile'
import NameAndImageProfileMember from '../../Components/Profile/NameAndImageProfileMember'
import { PlusSquare } from 'react-native-feather'
import { SearchBar } from 'react-native-screens'
import SearchHeader from '../../Components/Headers/SearchHeader'
import SearchInput from '../../Components/Inputs/Content/SearchInput'
import supabase from '../../Utils/supabase'
import { useUser } from '../../Context/UserContext'

type SingleRecipeRouteProp = RouteProp<ListStackParamsList, 'ListDetailsScreen'>;

const ListDetailsScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { list } = route.params;

  const {listMembers, getListMembers} = useList()

  const [addingMembers, setAddingMembers] = useState<boolean>(false)
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [addingMembersToList, setAddingMembersToList] = useState<boolean>(false)

  const toggleAddingMembers = () => {
    setAddingMembers(!addingMembers)
  }

  const toggleSelectingMember = (user_id: string) => {
    if(selectedMembers.includes(user_id)){
      const updatedMembers = selectedMembers.filter((item) => item != user_id)
      setSelectedMembers(updatedMembers)
    } else {
      setSelectedMembers([...selectedMembers, user_id])
    }
  }

  useEffect(() => {
    getListMembers(list.id)
  }, [])

  const handleUpdateSearch = async (data: string) => {
    setSearch(data)
    try {
      // Perform a query to search for profiles by both username and account_name
      const { data: responseData, error } = await supabase
        .from('Profiles')
        .select('*')
        .or(`username.ilike.%${data}%,account_name.ilike.%${data}%`); // Search in both username and account_name
      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }
      setSearchResults(responseData); // Update the state with the fetched profiles
    } catch (err) {
      console.error('Unexpected error during profile search:', err);
    }
  }

  const addMembersToList = () => {
    setAddingMembersToList(true)
    try {
      // Iterate through each selected user_id
      selectedMembers.map(async (user_id) => {
        const { data, error } = await supabase
          .from('Members') // Assuming your table is named 'Members'
          .insert([
            {
              collection_id: list.id, 
              member_id: user_id, 
              status: 'pending', 
            }
          ]);
  
        if (error) {
          console.error(`Error adding user ${user_id} to list ${list.id}:`, error);
          return null; // Return null in case of error
        }
      });
      getListMembers(list.id)
      setAddingMembersToList(false)
      setAddingMembers(false)
    } catch (error) {
      console.error('An unexpected error occurred while adding members to the list:', error);
      Alert.alert('Error', 'An error occurred while adding members. Please try again.');
    }
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header={`${list.title} Details`}
        back={true}
      />
      <View style={tailwind`flex-1 bg-white p-2`}>
        <View style={tailwind`w-full h-80`}>
          <Image style={tailwind`flex-1 rounded-2` } source={{uri: list.main_image}}/>
        </View>
        <View style={tailwind`absolute z-10 w-full h-80 bg-stone-800 opacity-50 top-2 left-2 rounded-2`}/>
        <View style={tailwind`absolute z-15 w-full h-80 top-2 left-2 flex justify-end px-4 py-5`}>
          <Text style={tailwind`text-2xl text-white font-bold mb-2`}>{list.title}</Text>
          <Text style={tailwind`text-base text-white font-semibold`}>{list.description}</Text>
        </View>
        <View style={tailwind`flex-1`}>

          <View style={tailwind`w-full flex flex-row justify-between items-center mt-5 mb-2 px-2`}>
            <Text style={tailwind`font-bold text-xl`}>Members:</Text>
            <TouchableOpacity onPress={toggleAddingMembers}>
              <PlusSquare height={24} width={24} color={'red'}/>
            </TouchableOpacity>
          </View>
          {
            listMembers.length > 0
              ? <FlatList
                  data={listMembers}
                  keyExtractor={(item) => item.id}
                  renderItem={({item, index}) => {
                    return(
                      <View key={index} style={tailwind`p-2`}>
                        <NameAndImageProfileMember status={item.status} username={item.Profiles.username} accountName={item.Profiles.account_name} profilePicture={item.Profiles.profile_picture}/>
                      </View>
                    )
                  }}
                />
              : null
          }
        </View>
      </View>
      <Modal
        visible={addingMembers}
        animationType='slide'
        transparent={true}
      >
         <View style={tailwind`flex-1 flex justify-end mb-22`}>
            <View style={tailwind`w-full h-5/8 bg-white rounded-tr-6 rounded-tl-6 p-4 bg-slate-950`}>
              <SearchInput 
                searchTerm={search}
                changeSeearchTerm={handleUpdateSearch}
                clearSearch={() => {setSearchResults([])}}
                searchResults={searchResults}
                selectedItems={selectedMembers}
                toggleSelectedItem={toggleSelectingMember}
                loading={addingMembersToList}
                confirmClick={addMembersToList}
                toggleAddingMembers={toggleAddingMembers}
              />
            </View>
         </View>
      </Modal>
    </View>
  )
}

export default ListDetailsScreen
