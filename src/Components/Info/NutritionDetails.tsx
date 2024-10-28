import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  serving_size: string,
  calories: string,
  total_fats: string,
  saturated_fats: string,
  trans_fats: string,
  sodium: string,
  total_carbs: string,
  total_sugar: string,
  protein: string
}

const NutritionDetails: React.FC<RecipeDetailsProps> = ({serving_size, calories, total_fats, 
    saturated_fats, trans_fats, sodium, total_carbs, total_sugar, protein
  }) => {
  return (
    <View style={tailwind`mt-5`}>
      <Text style={tailwind`text-2xl font-bold`}>Nutritional Facts</Text>
      {
        serving_size
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Serving Size:</Text>
              <Text style={tailwind`text-base font-semibold`}>{serving_size}</Text>
            </View>
          : null
      }
      {
        calories
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Calories:</Text>
              <Text style={tailwind`text-base font-semibold`}>{calories}</Text>
            </View>
          : null
      }
      {
        total_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Fats:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_fats}</Text>
            </View>
          : null
      }
      {
        saturated_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Saturated Fats:</Text>
              <Text style={tailwind`text-base font-semibold`}>{saturated_fats}</Text>
            </View>
          : null
      }
      {
        trans_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Carbs:</Text>
              <Text style={tailwind`text-base font-semibold`}>{trans_fats}</Text>
            </View>
          : null
      }
      {
        sodium
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Sodium:</Text>
              <Text style={tailwind`text-base font-semibold`}>{sodium}</Text>
            </View>
          : null
      }
      {
        total_carbs
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Carbs:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_carbs}</Text>
            </View>
          : null
      }
      {
        total_sugar
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Sugars:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_sugar}</Text>
            </View>
          : null
      }
      {
        protein
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Protein:</Text>
              <Text style={tailwind`text-base font-semibold`}>{protein}</Text>
            </View>
          : null
      }
    </View>
  )
}

export default NutritionDetails
