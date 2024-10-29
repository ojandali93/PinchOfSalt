import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'

interface CategoryProps {
  cuisines: string[],
  categoriesArray?: string[],
  updateCuisine: (data: string) => void,
  header: string
}

const CategoriesSelect: React.FC<CategoryProps> = ({ header, categoriesArray, cuisines, updateCuisine }) => {
  return (
    <View style={tailwind`px-2 mt-4`}>
      <Text style={tailwind`text-lg font-bold text-black mb-2`}>{header}<Text style={tailwind`text-red-500 text-base`}>*</Text> (1 selection required)</Text>
      <View style={tailwind`flex flex-row flex-wrap`}>
        {cuisines.map((cuisine, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updateCuisine(cuisine)}
            style={[
              tailwind`p-2 rounded-lg m-1 w-[30%] border border-gray-300`,
              categoriesArray?.includes(cuisine) ? tailwind`bg-red-500` : tailwind`bg-white`,
            ]}
          >
            <Text style={tailwind`${categoriesArray && categoriesArray.includes(cuisine) ? 'text-white' : 'text-black'} text-center`}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default CategoriesSelect