import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  serving_size: string | null,
  calories: string | null,
  total_fats: string | null,
  saturated_fats: string | null,
  trans_fats: string | null,
  sodium: string | null,
  total_carbs: string | null,
  total_sugar: string | null,
  protein: string | null
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
              <Text style={tailwind`text-base font-semibold`}>{serving_size} Servings</Text>
            </View>
          : null
      }
      {
        calories
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Calories:</Text>
              <Text style={tailwind`text-base font-bold`}>{calories}</Text>
            </View>
          : null
      }
      {
        total_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Fats:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_fats}g</Text>
            </View>
          : null
      }
      {
        saturated_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Saturated Fats:</Text>
              <Text style={tailwind`text-base font-semibold`}>{saturated_fats}g</Text>
            </View>
          : null
      }
      {
        trans_fats
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Carbs:</Text>
              <Text style={tailwind`text-base font-semibold`}>{trans_fats}g</Text>
            </View>
          : null
      }
      {
        sodium
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Sodium:</Text>
              <Text style={tailwind`text-base font-semibold`}>{sodium}mg</Text>
            </View>
          : null
      }
      {
        total_carbs
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Carbs:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_carbs}g</Text>
            </View>
          : null
      }
      {
        total_sugar
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Total Sugars:</Text>
              <Text style={tailwind`text-base font-semibold`}>{total_sugar}g</Text>
            </View>
          : null
      }
      {
        protein
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Protein:</Text>
              <Text style={tailwind`text-base font-semibold`}>{protein}g</Text>
            </View>
          : null
      }
    </View>
  )
}

export default NutritionDetails
