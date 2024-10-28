import React from 'react'
import { FlatList, Text, View } from 'react-native'
import tailwind from 'twrnc'

interface InstructionsProps {
  instructions: any[]
}

const InstructionsDetails: React.FC<InstructionsProps> = ({instructions}) => {
  return (
    <View style={tailwind`mt-4`}>
      <View>
        <Text style={tailwind`text-2xl font-bold`}>Instructions</Text>
      </View>
      <View style={tailwind`mt-2`}>
        {
          instructions.map((item, index) => {
            return(
              <View key={index.toString()} style={tailwind`flex flex-row items-start mt-3`}>
                <View style={tailwind`w-2 flex`}>
                  <Text style={tailwind`text-base font-bold`}>{index + 1}</Text>
                </View>
                <Text style={tailwind`text-base ml-3`}>{item.item}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default InstructionsDetails
