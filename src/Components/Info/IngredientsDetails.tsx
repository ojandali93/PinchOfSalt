import React from 'react'
import { FlatList, Text, View } from 'react-native'
import tailwind from 'twrnc'

interface InstructionsProps {
  instructions: any[]
}

const IngredientsDetails: React.FC<InstructionsProps> = ({instructions}) => {
  return (
    <View>
      <View>
        <Text style={tailwind`text-2xl font-bold`}>Ingredients</Text>
      </View>
      <View style={tailwind`mt-2`}>
        {
          instructions.map((item, index) => {
            return(
              <View key={index.toString()} style={tailwind`flex flex-row items-center mt-3`}>
                <View style={tailwind`w-24`}>
                  <Text style={tailwind`text-base`}>{item.amount}</Text>
                </View>
                <Text style={tailwind`text-base font-bold ml-3`}>{item.item}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default IngredientsDetails
