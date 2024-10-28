import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  categories: any[],
  cuisine: string,
}

const CategoriesDetails: React.FC<RecipeDetailsProps> = ({ categories, cuisine }) => {

  // Create a comma-separated list of categories
  const categoryList = categories?.map((cat: any) => cat.category).join(', ');

  return (
    <View style={tailwind``}>
      {
        categories && categories.length > 0
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Categories:</Text>
              <Text style={tailwind`text-base font-semibold`}>{categoryList}</Text>
            </View>
          : null
      }
      {
        cuisine
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Cuisine:</Text>
              <Text style={tailwind`text-base font-semibold`}>{cuisine}</Text>
            </View>
          : null
      }
    </View>
  )
}

export default CategoriesDetails
