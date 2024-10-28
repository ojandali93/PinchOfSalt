import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { Bookmark, MoreHorizontal } from 'react-native-feather'
import tailwind from 'twrnc'
import Portrait from '../../Assets/portrait.jpg'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../Context/UserContext'

const imageWidth = Dimensions.get('screen').width
const imageHeight = imageWidth - 86

interface RecipeProps {
  recipe: any
}

const RecipeTileNoProfile: React.FC<RecipeProps> = ({recipe}) => {
  const navigation = useNavigation()

  const { userFavorites, addToFavorite, removeFromFavorite, currentProfile } = useUser()

  // Store the actual favorite record, if it exists
  const isFavorite = userFavorites.find((favorite) => favorite.recipe_id === recipe.id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      // If the record exists, remove the recipe from favorites
      removeFromFavorite(isFavorite.id, currentProfile.user_id) // Pass the favorite's ID for removal
    } else {
      // If the record doesn't exist, add the recipe to favorites
      addToFavorite(currentProfile.user_id, recipe.id)
    }
  }

  const limitStringLength = (text: string) => {
    if (text.length > 96) {
      return text.substring(0, 96) + '...';
    }
    return text;
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleRecipeScreen', {recipe: recipe})} style={tailwind`w-full rounded-3 bg-stone-200 mb-2`}>
      <View style={[tailwind`w-full rounded-3`, {height: imageHeight}]}>
        <Image style={tailwind`w-full h-86 rounded-3`} source={{uri: recipe.main_image}}/>
      </View>
      <View style={[tailwind`absolute z-10 opacity-50 w-full h-86 bg-slate-900 rounded-3`, {height: imageHeight}]}></View>
      <View style={[tailwind`absolute z-15 w-full h-86 flex flex-col justify-between p-3`, {height: imageHeight}]}>
        <View style={tailwind`flex flex-row justify-between`}>
          <Text style={tailwind`text-base font-bold text-white`}>Yield: {recipe.yield}</Text>
          <TouchableOpacity onPress={handleFavoriteToggle}>
            {isFavorite ? (
              <Bookmark height={24} width={24} color={'white'} fill={'white'}/> // Filled bookmark for favorite
            ) : (
              <Bookmark height={24} width={24} color={'white'} /> // Empty bookmark for non-favorite
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={tailwind`text-2xl font-bold text-white`}>{recipe.title}</Text>
          <Text style={tailwind`text-base text-white font-semibold mb-3`}>{limitStringLength(recipe.description)}</Text>
          <View style={tailwind`flex flex-row justify-between items-center`}>
            <Text style={tailwind`text-base font-bold text-white`}>Prep Time: {recipe.prep_time}</Text>
            <Text style={tailwind`text-base font-bold text-white`}>Cook Time: {recipe.cook_time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RecipeTileNoProfile
