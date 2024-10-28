import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import tailwind from 'twrnc';
import TopLogin from '../../Components/Authentication/TopLogin';
import AuthInput from '../../Components/Inputs/Authentication/AuthInput';
import RedButton from '../../Components/Buttons/Authentication/RedButton';
import { useUser } from '../../Context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RecipesStackParamList } from '../../Navigation/RecipesStackNavigation';
import FixedTopLogin from '../../Components/Authentication/FixedTopLogin';
import { Plus } from 'react-native-feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthStackParamList } from '../../Navigation/AuthStackNavigation';
import ScrollSelect from '../../Components/Inputs/Content/ScrollSelect';

type SingleRecipeRouteProp = RouteProp<AuthStackParamList, 'ProfileSetupScreen'>;

const ProfileSetupScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const {username, firstName, lastName, email, password, name} = route.params;

  const navigation = useNavigation()
  const {creatingProfile, createUserAccount} = useUser()

  const [bio, setBio] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [profilePicture, setProfilePicture] = useState<any>(null)
  const [experience, setExperience] = useState<string>('')

  const cookingSkillLevels = [
    {
      label: 'Beginner',
      value: 'Beginner'
    },
    {
      label: 'Novice',
      value: 'Novice'
    },
    {
      label: 'Intermediate',
      value: 'Intermediate'
    },
    {
      label: 'Proficient',
      value: 'Proficient'
    },
    {
      label: 'Advanced',
      value: 'Advanced'
    },
    {
      label: 'Expert',
      value: 'Expert'
    },
    {
      label: 'Professional Chef',
      value: 'Professional Chef'
    },
    {
      label: 'Master Chef',
      value: 'Master Chef'
    }
  ];

  const submitUserLogin = () => {
    createUserAccount(username, email, password, firstName, lastName, profilePicture, bio, location, experience, navigation)
  }

  const selectAnImage = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        // Check the video duration
        if (asset.duration && asset.duration > 60) {
          Alert.alert("Video exceeds limit.", "Please select a video that is 60 seconds or less.");
        } else {
          const selectedFile = {
            uri: asset.uri,
            fileType: asset.type,
          };
          setProfilePicture(selectedFile)
        }
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts based on the platform
      style={tailwind`flex-1 bg-white`}
    >
      <ScrollView contentContainerStyle={tailwind`flex-grow`} showsVerticalScrollIndicator={false}>
        <FixedTopLogin header='Create Profile' back={true}/>
        <View style={tailwind`w-full py-6 px-4`}>

          <View style={tailwind`w-full flex flex-row justify-start items-center`}>
            {
              profilePicture && profilePicture.uri
                ? <Image style={tailwind`h-24 w-24 bg-stone-400 rounded-full`} alt='profilePicture' source={{uri: profilePicture.uri}} />
                : <TouchableOpacity onPress={() => {selectAnImage()}} style={tailwind`h-24 w-24 bg-stone-400 rounded-full flex justify-center items-center`}>
                    <Plus height={24} width={24} color={'black'}/>
                  </TouchableOpacity>
            }
            <View style={tailwind`ml-4`}>
              <Text style={tailwind`text-lg font-bold`}>{username}</Text>
              <Text style={tailwind`text-base font-semibold`}>{name}</Text>
            </View>
          </View>

          {/* Username Input */}
          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='MessageSquare'
              valid={false}
              validation={false}
              placeholder='Bio...'
              placeholderColor='grey'
              multi={true}
              secure={false}
              value={bio}
              onChange={setBio}
              capitalization={false}
              loading={false}
            />
          </View>

          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='MapPin'
              valid={false}
              validation={false}
              placeholder='Location (city, state)...'
              placeholderColor='grey'
              multi={false}
              secure={false}
              value={location}
              onChange={setLocation}
              capitalization={false}
              loading={false}
            />
          </View>

          <View style={tailwind`mt-4`}>
            <ScrollSelect value={experience} selection={setExperience} items={cookingSkillLevels} title='Experience Cooking'/>
          </View>


          {/* Login Button */}
          <View style={tailwind`mt-4`}>
            <RedButton submit={submitUserLogin} loading={creatingProfile}/>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetupScreen;
