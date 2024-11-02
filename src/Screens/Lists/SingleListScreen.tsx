import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { useRecipe } from '../../Context/RecipeContext'
import RecipeTile from '../../Components/Tiles/RecipeTile'
import { RefreshControl } from 'react-native-gesture-handler'
import { useUser } from '../../Context/UserContext'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import CollectionInput from '../../Components/Inputs/Content/CollectionInput'
import CollectionTile from '../../Components/Tiles/CollectionTile'
import { ListStackParamsList } from '../../Navigation/ListStackNavigation'
import RecipeTileNoProfile from '../../Components/Tiles/RecipeTileNoProfile'
import { Check } from 'react-native-feather'
import MainButton from '../../Components/Buttons/Content/MainButton'
import supabase from '../../Utils/supabase'
import { useList } from '../../Context/ListContext'

type SingleRecipeRouteProp = RouteProp<ListStackParamsList, 'SingleListScreen'>;

const SingleListScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { list } = route.params;
  
  const navigation = useNavigation();
  
  const { currentProfile, getListRecipes, listRecipes } = useUser();
  const { userRecipes } = useRecipe();
  const { getListMembers, listMembers } = useList()
  
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [addingRecipesToCollection, setAddRecipesToCollection] = useState<boolean>(false);

  useEffect(() => {
    getListRecipes(list.collection.id);
    getListMembers(list.collection.id)
  }, []);
  
  const toggleSelectedRecipes = (recipe_id: number) => {
    if (selectedRecipes.includes(recipe_id)) {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipe_id));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe_id]);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListRecipes(list.id).finally(() => {
      setRefreshing(false);
    });
  }, [currentProfile]);

  const addRecipesToCollections = async (collectionId: number) => {
    setAddRecipesToCollection(true);
    try {
      const recipeEntries = selectedRecipes.map(recipeId => ({
        recipe_id: recipeId,
        collection_id: collectionId
      }));
  
      // Insert recipes to collection
      const { data: collectionData, error: collectionError } = await supabase
        .from('CollectionPlaces')
        .insert(recipeEntries)
        .select();
  
      if (collectionError) {
        console.error('Error inserting recipes into collection:', collectionError);
        setAddRecipesToCollection(false);
        return;
      }
  
      const activityEntries: any[] = [];
      listMembers.forEach(member => {
        selectedRecipes.forEach(recipeId => {
          activityEntries.push({
            user_id: member.Profiles.user_id,   
            like_id: null,
            comment_id: null,
            post_id: recipeId,
            friend_id: null,    
            list_id: list.id,      
            activity: `A new recipe was added to ${list.title}`,   
            created_by: currentProfile.user_id
          });
        });
      });
  
      // Insert the activity entries into the Activity table
      const { data: activityData, error: activityError } = await supabase
        .from('Activity')
        .insert(activityEntries);
  
      if (activityError) {
        console.error('Error creating activity records:', activityError);
      } else {
        console.log('Activity records created for list members:', activityData);
      }
      setSelectedRecipes([])
      getListRecipes(list.id)
      setAddRecipesToCollection(false);
      setShowModal(!showModal)
    } catch (error) {
      console.error('Unexpected error while adding recipes and creating activity records:', error);
      setAddRecipesToCollection(false);
    }
  };
  

  // Filter user recipes to exclude those already in the list
  const filteredUserRecipes = userRecipes.filter(
    userRecipe => !listRecipes.some(listRecipe => listRecipe.id === userRecipe.id)
  );

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header={list.collection.title}
        back={true}
        add={true}
        addClick={() => setShowModal(!showModal)}
        more={true}
        moreClick={() => navigation.navigate('ListDetailsScreen', { list })}
      />
      <View style={tailwind`flex-1 bg-white`}>
        <FlatList
          data={listRecipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={tailwind`p-2`}>
              <RecipeTileNoProfile recipe={item} collectionId={list.id}/>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={tailwind`flex-1 flex justify-end mb-22`}>
          <View style={tailwind`w-full h-5/8 bg-white rounded-tr-6 rounded-tl-6 p-4`}>
            <Text style={tailwind`text-xl font-bold`}>Add Posts To Collection:</Text>
            <FlatList
              data={filteredUserRecipes}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              style={tailwind`flex-1 mt-4`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleSelectedRecipes(item.id)}
                  style={tailwind`w-1/3 h-34 p-1`}
                >
                  <Image style={tailwind`flex-1 rounded-2`} source={{ uri: item.main_image }} />
                  {selectedRecipes.includes(item.id) && (
                    <View style={tailwind`absolute inset-0`}>
                      <View style={tailwind`absolute inset-0 bg-black opacity-50 rounded-2 p-1`} />
                      <View style={tailwind`absolute inset-0 flex justify-center items-center p-1`}>
                        <Check height={28} width={28} color="white" />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
            <MainButton header="Add Recipes To List" clickButton={() => addRecipesToCollections(list.id)} loading={addingRecipesToCollection} />
            <View style={tailwind`w-full flex flex-row items-center justify-center pt-3`}>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Text style={tailwind`font-semibold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SingleListScreen;
