import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FeedStackParamList } from '../../Navigation/FeedStackNavigation';
import MainButton from '../../Components/Buttons/Content/MainButton';
import tailwind from 'twrnc';
import { useUser } from '../../Context/UserContext';
import CollectionTileSelectable from '../../Components/Tiles/CollectionTileSelectable';
import supabase from '../../Utils/supabase';

type SingleRecipeRouteProp = RouteProp<FeedStackParamList, 'AddRecipeToList'>;

const AddRecipeToList = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { recipe_id } = route.params; 
  const navigation = useNavigation()
  const {userLists} = useUser()

  const [selectedLists, setSelectedLists] = useState<number[]>([])

  const toggleSelectedLIsts = (id: number) => {
    if(selectedLists.includes(id)){
      const filteredLIsts = selectedLists.filter((item) => item != id)
      setSelectedLists(filteredLIsts)
    } else {
      setSelectedLists((prev) => [...prev, id])
    }
  }

  const addRecipeToLists = async () => {
    try {
      if (selectedLists.length === 0) {
        Alert.alert('No Selected Lists', 'There are no selected lists. Select lists or skip.')
      }
      for (const collection_id of selectedLists) {
        const { data, error } = await supabase
          .from('CollectionPlaces') 
          .insert([
            {
              recipe_id: recipe_id,
              collection_id: collection_id
            }
          ]);
        if (error) {
          console.error(`Error adding recipe_id ${recipe_id} to collection:`, error);
        } else {
        }
      }
      setSelectedLists([])
      navigation.navigate('FeedScreen')
    } catch (error) {
      console.error('Unexpected error while adding recipes to lists:', error);
    }
  };
  

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader
        header='Add Recipe To List'
      />
      <ScrollView style={tailwind`flex-1`}>
        <View style={tailwind`p-2`}>
          {
            userLists.map((item, index) => {
              return(
                <View key={index} style={tailwind``}>
                  <CollectionTileSelectable list={item} selectedlists={selectedLists} toggleSelectedList={toggleSelectedLIsts}/>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
      <View style={tailwind`p-2`}>
        <MainButton header='Add Recipe To Lists' clickButton={() => {addRecipeToLists()}} loading={false}/>
        <View style={tailwind`w-full flex flex-row justify-center pt-3`}>
          <TouchableOpacity onPress={() => {navigation.navigate('FeedScreen')}} style={tailwind``}>
            <Text style={tailwind`text-red-500`}>Skip Lists</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddRecipeToList
