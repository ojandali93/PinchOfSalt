import React from 'react'
import { Text, TextInput, View } from 'react-native'
import tailwind from 'twrnc'

interface NutritionFactsProps {
  nutritionalFacts: any,
  updateNutritionalFact: (key: string, value: string) => void,
}

const NutritionalFacts: React.FC<NutritionFactsProps> = ({nutritionalFacts, updateNutritionalFact}) => {
  return (
    <View style={tailwind`w-full px-2 mt-4`}>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Serving Size</Text>
        <TextInput 
          value={nutritionalFacts.servingSize}
          onChangeText={(value) => updateNutritionalFact('servingSize', value)}
          placeholder={'serving size'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Calories</Text>
        <TextInput 
          value={nutritionalFacts.calories}
          onChangeText={(value) => updateNutritionalFact('calories', value)}
          placeholder={'calories'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Fats (g)</Text>
        <TextInput 
          value={nutritionalFacts.totalFats}
          onChangeText={(value) => updateNutritionalFact('totalFats', value)}
          placeholder={'total fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 pl-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Saturated Fats (g)</Text>
        <TextInput 
          value={nutritionalFacts.saturatedFats}
          onChangeText={(value) => updateNutritionalFact('saturatedFats', value)}
          placeholder={'sat. fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 pl-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Trans Fats (g)</Text>
        <TextInput 
          value={nutritionalFacts.transFats}
          onChangeText={(value) => updateNutritionalFact('transFats', value)}
          placeholder={'trans fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Cholestoral (g)</Text>
        <TextInput 
          value={nutritionalFacts.cholesterol}
          onChangeText={(value) => updateNutritionalFact('cholesterol', value)}
          placeholder={'cholesterol'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base pl-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Sodium (mg)</Text>
        <TextInput 
          value={nutritionalFacts.sodium}
          onChangeText={(value) => updateNutritionalFact('sodium', value)}
          placeholder={'sodium'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Carbohydrates (g)</Text>
        <TextInput 
          value={nutritionalFacts.totalCarbohydrates}
          onChangeText={(value) => updateNutritionalFact('totalCarbohydrates', value)}
          placeholder={'total carbs'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 pl-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Dietary Fiber (g)</Text>
        <TextInput 
          value={nutritionalFacts.dietaryFiber}
          onChangeText={(value) => updateNutritionalFact('dietaryFiber', value)}
          placeholder={'dietary fiber'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 pl-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Sigars (g)</Text>
        <TextInput 
          value={nutritionalFacts.totalSugars}
          onChangeText={(value) => updateNutritionalFact('totalSugars', value)}
          placeholder={'total sugar'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Protien (g)</Text>
        <TextInput 
          value={nutritionalFacts.protein}
          onChangeText={(value) => updateNutritionalFact('protein', value)}
          placeholder={'protien'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
          keyboardType='number-pad'
        />
      </View>
    </View>
  )
}

const asdf = [
  'serving side',
  'calories',
  'total fats',
  'saturated fats',
  'trans fat',
  'cholestoral',
  'sodium',
  'total charbohydrates',
  'dietary fiber',
  'total sugar',
  'protien',
]

export default NutritionalFacts
