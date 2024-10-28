import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
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

type SingleRecipeRouteProp = RouteProp<ListStackParamsList, 'SingleListScreen'>;

const SingleListScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { list } = route.params;
  
  const navigation = useNavigation()

  const { currentProfile, getListRecipes, listRecipes } = useUser();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getListRecipes(list.id)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListRecipes(list.id).finally(() => {
      setRefreshing(false);
    });
  }, [currentProfile]);

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header={list.title}
        back={true}
        more={true}
        moreClick={() => {navigation.navigate('ListDetailsScreen', {list: list})}}
      />
      <View style={tailwind`flex-1 bg-white`}>
        <FlatList
              data={listRecipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <View key={item.id} style={tailwind`p-2`}>
                    <RecipeTileNoProfile recipe={item} />
                  </View>
                );
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
      </View>
    </View>
  )
}

export default SingleListScreen
