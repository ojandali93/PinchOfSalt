import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { X } from 'react-native-feather'
import tailwind from 'twrnc'
import MainButton from '../../Buttons/Content/MainButton'

interface SearchHeaderProps {
  searchTerm: string,
  changeSeearchTerm: (data: string) => void
  clearSearch: () => void,
  searchResults: any[],
  selectedItems: any[],
  toggleSelectedItem: (user_id: string) => void,
  loading: boolean,
  confirmClick: () => void,
  toggleAddingMembers: () => void
}

const SearchInput: React.FC<SearchHeaderProps> = ({toggleAddingMembers, confirmClick, loading, searchTerm, changeSeearchTerm, clearSearch, searchResults ,selectedItems, toggleSelectedItem}) => {

  const navigation = useNavigation()

  return (
    <View style={tailwind`flex-1 mt-4`}>
      <View style={tailwind`flex flex-row items-center`}>
        <View style={tailwind`flex-1 bg-stone-100 p-1 rounded-full flex flex-row items-center mb-4`}>
          <TextInput 
            value={searchTerm}
            onChangeText={changeSeearchTerm}
            placeholder='Search Users...'
            placeholderTextColor={'#4f4f4f'}
            style={tailwind`flex-1 px-2`}
          />
          <TouchableOpacity onPress={() => {clearSearch()}} style={tailwind`p-2 bg-stone-500 rounded-full`}>
            <X height={16} width={16} color={'white'} style={tailwind``} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tailwind`flex-1`}>
        {
          searchResults.length > 0
            ? <ScrollView style={tailwind`w-full h-full`}>
                {
                  searchResults.map((item) => {
                    return(
                      <View key={item.id} style={tailwind`w-full flex flex-row items-center py-3 border-b-2 border-b-slate-600 px-4`}>
                        <View style={tailwind`h-12 w-12`}>
                          <Image style={tailwind`flex-1 rounded-full`} source={{uri: item.profile_picture}}/>
                        </View>
                        <View style={tailwind`ml-3 flex-1`}>
                          <Text style={tailwind`text-white text-base font-bold`}>{item.username}</Text>
                          <Text style={tailwind`text-white text-sm`}>{item.account_name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {toggleSelectedItem(item.user_id)}} style={tailwind`${selectedItems.includes(item.user_id) ? 'bg-stone-400 w-20' : 'bg-red-500 w-14'} py-0.5 rounded-2 flex justify-center items-center `}>
                          <Text style={tailwind`text-white text-base font-bold`}>{selectedItems.includes(item.user_id) ? 'Remove' : 'Add'}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </ScrollView>
            : null
        }
      </View>
      <View style={tailwind`mb-2`}>
        <MainButton header={`Add Members (${selectedItems.length})`} clickButton={confirmClick} loading={loading}/>
      </View>
      <TouchableOpacity onPress={toggleAddingMembers} style={tailwind`mb-2 mt-3 w-full flex flex-row justify-center`}>
        <Text style={tailwind`text-white font-bold`}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
