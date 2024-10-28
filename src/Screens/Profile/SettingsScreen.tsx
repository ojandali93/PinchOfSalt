import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { AlertCircle, Bell, Bookmark, ChevronsRight, Edit2, Flag, Heart, List, Lock, LogOut, MessageSquare, Shuffle, Slash, User, X } from 'react-native-feather'
import { useUser } from '../../Context/UserContext'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {
  const navigation = useNavigation()

  const {currentProfile, logoutCurrentUser} = useUser()

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader
        header='Settings'
        back={true}
      />
      <ScrollView>
        <View style={tailwind`p-3`}>
          <View style={tailwind`pb-4 border-b-2 border-b-neutral-700`}>
            <Text style={tailwind`text-xl font-bold`}>Profile & Account</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <User height={18} width={18} color={'black'} />
              <Text style={tailwind`text-lg ml-2`}>Edit Profile</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('ResetPassword') }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Lock height={18} width={18} color={'black'} />
              <Text style={tailwind`text-lg ml-2`}>Reset Password</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Bell height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Notifications</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>

          <View style={tailwind`pb-4 border-b-2 border-b-neutral-700 mt-8`}>
            <Text style={tailwind` text-xl font-bold`}>Activity</Text>
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('FavoritesScreen')}} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Bookmark height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Favorites</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => { }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <MessageSquare height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Comments</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => { navigation.navigate('BlockedUsersScreen') }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Slash height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Blocked Users</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <View style={tailwind`pb-4 border-b-2 border-b-neutral-700 mt-8`}>
            <Text style={tailwind` text-xl font-bold`}>Help & Support</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('ContactUsScreen')}} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Edit2 height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Contact Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('FaqScreen') }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <List height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>FAQ</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('FeedbackScreen')}}   
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <Shuffle height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>Feedback / Suggestions</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('AboutScreen') }}   
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center `}>
              <AlertCircle height={18} width={18} color={'black'} />
              <Text style={tailwind` text-lg ml-2`}>About Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'black'} />
          </TouchableOpacity>

          {
            currentProfile && currentProfile.user_id === '9b362984-669e-4d3f-8d53-38a6d62549bc'
              ? <View>
                  <View style={tailwind`pb-4 border-b-2 border-b-neutral-700 mt-8`}>
                    <Text style={tailwind` text-xl font-bold`}>Admin</Text>
                  </View>
                  <TouchableOpacity onPress={() => {}} 
                    style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
                  >
                    <View style={tailwind`flex flex-row items-center`}>
                      <Flag height={18} width={18} color={'black'} />
                      <Text style={tailwind` text-lg ml-2`}>Reports</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              : null
          }

          <View style={tailwind`pb-4 border-b-2 border-b-neutral-700 mt-8`}>
            <Text style={tailwind` text-xl font-bold`}>Login</Text>
          </View>
          <TouchableOpacity onPress={() => {logoutCurrentUser(navigation)}}  
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <LogOut height={18} width={18} color={'#0ea5e9'} />
              <Text style={tailwind`text-sky-500 text-lg ml-2`}>Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} 
            style={tailwind`flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700`} 
          >
            <View style={tailwind`flex flex-row items-center`}>
              <X height={18} width={18} color={'red'} />
              <Text style={tailwind`text-red-500 text-lg ml-2`}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
