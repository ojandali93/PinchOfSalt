import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Plus, X } from 'react-native-feather';
import tailwind from 'twrnc';

interface IngredientInputProps {
  items: any[],
  updateItem: (id: any, item: string) => void;
  removeItem: (id: string) => void;
  addItem: () => void;
  title: string
}

const InstructionsInput: React.FC<IngredientInputProps> = ({
  items,
  updateItem,
  removeItem,
  addItem,
  title
}) => {

  return (
    <View style={tailwind`mt-2 px-2`}>
      {items.map((item, index) => (
        <View key={item.id} style={tailwind`w-full flex flex-row justify-center mb-2`}>
          <View style={tailwind`w-full flex flex-row items-center mt-2`}>
            <Text style={tailwind`text-base font-bold mr-2`}>{index + 1}.{index === 0 ? <Text style={tailwind`text-red-500`}>*</Text> : null}</Text>
            
            <TextInput
              value={item.name}
              onChangeText={(text) => updateItem(item.id, text)}
              placeholder="Enter ingredient..."
              style={tailwind`flex-2 border-b-2 border-gray-400 p-1`}
              multiline
            />
            
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={tailwind`bg-red-500 h-8 w-8 flex justify-center items-center rounded-1 ml-2`}
            >
              <X height={20} width={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      
      <View style={tailwind`w-full self-center mt-1`}>
        <TouchableOpacity
          onPress={addItem}
          style={tailwind`w-full bg-green-500 p-2 mt-1 rounded-2 flex flex-row justify-center items-center`}
        >
          <Plus height={20} width={20} color="white" />
          <Text style={tailwind`text-white text-center text-base font-bold ml-2 py-1`}>
            Add {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstructionsInput;
