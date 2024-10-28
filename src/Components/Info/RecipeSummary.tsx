import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  prepTime: string,
  coolTime: string,
  servings: string,
  calories: string,
  cuisine: string,
  course: string,
  meal: string
}

const RecipeSummary: React.FC<RecipeDetailsProps> = ({prepTime, coolTime, servings, calories, cuisine, course, meal}) => {
  return (
    <View style={tailwind`mt-5`}>
      <View style={tailwind`w-full flex flex-row justify-between items-center`}>
        <Text style={tailwind`text-base font-semibold`}>Prep Time:</Text>
        <Text style={tailwind`text-base font-semibold`}>{prepTime}</Text>
      </View>
      <View style={tailwind`w-full flex flex-row justify-between items-center`}>
        <Text style={tailwind`text-base font-semibold`}>Cook Time:</Text>
        <Text style={tailwind`text-base font-semibold`}>{coolTime}</Text>
      </View>
      <View style={tailwind`w-full flex flex-row justify-between items-center`}>
        <Text style={tailwind`text-base font-semibold`}>Servings:</Text>
        <Text style={tailwind`text-base font-semibold`}>{servings}</Text>
      </View>
      {
        calories
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Calories:</Text>
              <Text style={tailwind`text-base font-semibold`}>{calories}</Text>
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
      {
        course 
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Course:</Text>
              <Text style={tailwind`text-base font-semibold`}>{course}</Text>
            </View>
          : null
      }
      {
        meal 
          ? <View style={tailwind`w-full flex flex-row justify-between items-center`}>
              <Text style={tailwind`text-base font-semibold`}>Meal:</Text>
              <Text style={tailwind`text-base font-semibold`}>{meal}</Text>
            </View>
          : null
      }
    </View>
  )
}

export default RecipeSummary
