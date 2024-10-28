import React from 'react'
import { Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import tailwind from 'twrnc';

interface ScrollSelectProps {
  value: string,
  selection: (data: string) => void,
  items: any[],
  title: string
}

const ScrollSelect: React.FC<ScrollSelectProps> = ({value, selection, items, title}) => {
  return (
    <View style={tailwind`flex flex-row w-full items-center justify-between px-4 py-3 bg-stone-100 rounded-3 border-2 border-stone-400`}>
      <View style={tailwind``}>
        <Text style={tailwind`text-base`}>{title}</Text>
      </View>
      <View>
        <RNPickerSelect
          value={value} // Default value
          onValueChange={selection}
          items={items}
          placeholder={{}} // Remove placeholder for default selection
          style={{
            inputAndroid: {
              color: 'black',
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              marginBottom: 10,
            },
            inputIOS: {
              color: 'black',
              padding: 4,
              borderBottomWidth: 2,
              borderBottomColor: 'black',
              borderRadius: 5,
              fontSize: 14
            },
          }}
        />
      </View>
    </View>
  )
}

export default ScrollSelect
