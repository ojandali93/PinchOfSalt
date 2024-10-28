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
          placeholder={'Enter serving size'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Calories</Text>
        <TextInput 
          value={nutritionalFacts.calories}
          onChangeText={(value) => updateNutritionalFact('calories', value)}
          placeholder={'Enter calories'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Fats</Text>
        <TextInput 
          value={nutritionalFacts.totalFats}
          onChangeText={(value) => updateNutritionalFact('totalFats', value)}
          placeholder={'Enter total fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 px-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Saturated Fats</Text>
        <TextInput 
          value={nutritionalFacts.saturatedFats}
          onChangeText={(value) => updateNutritionalFact('saturatedFats', value)}
          placeholder={'Enter saturated fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 px-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Trans Fats</Text>
        <TextInput 
          value={nutritionalFacts.transFats}
          onChangeText={(value) => updateNutritionalFact('transFats', value)}
          placeholder={'Enter trans fats'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Cholestoral</Text>
        <TextInput 
          value={nutritionalFacts.cholesterol}
          onChangeText={(value) => updateNutritionalFact('cholesterol', value)}
          placeholder={'Enter cholesterol'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Sodium</Text>
        <TextInput 
          value={nutritionalFacts.sodium}
          onChangeText={(value) => updateNutritionalFact('sodium', value)}
          placeholder={'Enter sodium'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Carbohydrates</Text>
        <TextInput 
          value={nutritionalFacts.totalCarbohydrates}
          onChangeText={(value) => updateNutritionalFact('totalCarbohydrates', value)}
          placeholder={'Enter total carbs'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 px-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Dietary Fiber</Text>
        <TextInput 
          value={nutritionalFacts.dietaryFiber}
          onChangeText={(value) => updateNutritionalFact('dietaryFiber', value)}
          placeholder={'Enter dietary fiber'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2 px-4`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Total Sigars</Text>
        <TextInput 
          value={nutritionalFacts.totalSugars}
          onChangeText={(value) => updateNutritionalFact('totalSugars', value)}
          placeholder={'Enter total sugar'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
        />
      </View>
      <View style={tailwind`flex flex-row justify-between mb-2`}>
        <Text style={tailwind`text-lg text-black mr-2`}>Protien</Text>
        <TextInput 
          value={nutritionalFacts.protein}
          onChangeText={(value) => updateNutritionalFact('protein', value)}
          placeholder={'Enter protien'}
          placeholderTextColor={'grey'}
          autoCapitalize={'none'}
          style={tailwind`w-1/3 border-b-2 border-b-stone-700 text-base px-1`}
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
