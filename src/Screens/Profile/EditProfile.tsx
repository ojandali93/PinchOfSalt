import React, { useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import StandardInput from '../../Components/Inputs/Content/StandardInput';
import { useUser } from '../../Context/UserContext';
import { CheckCircle, RefreshCw } from 'react-native-feather';
import MainButton from '../../Components/Buttons/Content/MainButton';
import supabase from '../../Utils/supabase';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const { currentProfile } = useUser();
  const navigation = useNavigation()

  const [username, setUsername] = useState<string>(currentProfile.username);
  const [bio, setBio] = useState<string>(currentProfile.bio);
  const [profilePicutre, setProfilePicture] = useState<any>({
    uri: currentProfile.profile_picture,
    fileType: 'jpg',
  });
  const [location, setLocation] = useState<string>(currentProfile.location);
  const [firstname, setFirstName] = useState<string>(currentProfile.first_name);
  const [lastName, setLastName] = useState<string>(currentProfile.last_name);
  const [accountName, setAccountName] = useState<string>(currentProfile.account_name);
  const [isPublic, setIsPublic] = useState<string>(currentProfile.public);
  const [loading, setLoading] = useState<boolean>(false);

  const [availableUsername, setAvailableUsername] = useState<boolean>(true)

  // Function to update the profile in Supabase
  const updateProfile = async () => {
    try {
      if(availableUsername){
        const { error } = await supabase
          .from('Profiles')
          .update({
            username,
            bio,
            profile_picture: profilePicutre,
            location,
            first_name: firstname,
            last_name: lastName,
            account_name: accountName,
            public: isPublic,
          })
          .eq('id', currentProfile.id); // Use the user's profile ID to update the correct record
  
        if (error) {
          throw error;
        }
        navigation.goBack()
      } else {
        return
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'There was an error updating your profile.');
    } finally {
      setLoading(false);
    }
  };

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

  // Function to check if the username is available
  const checkUsernameAvailability = async (username: string) => {
    setUsername(username)

    if(username === currentProfile.username){
      setAvailableUsername(true)
    } else {
      const { data, error } = await supabase
        .from('Profiles')
        .select('id')
        .eq('username', username)
  
      if (error) {
        console.error('Error checking username availability:', error);
        return false;
      }
  
      // If any user is returned, the username is taken
      if(data.length === 0){
        setAvailableUsername(true)
      } else {
        setAvailableUsername(false)
      }
    }
  };

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader header="Edit Profile" back={true} />
      <ScrollView style={tailwind`flex-1`}>
        <View style={tailwind`flex-1 flex flex-col justify-end`}>
          <View style={tailwind`w-full flex flex-row justify-center`}>
            <Image
              style={tailwind`h-24 w-24 rounded-full bg-stone-200 my-4`}
              source={{ uri: profilePicutre.uri }}
            />
            <TouchableOpacity onPress={selectAnImage}
              style={tailwind`absolute z-10 h-24 w-24 rounded-full my-4 bg-stone-700 opacity-40 flex flex-row justify-center items-center`}
            >
              <RefreshCw height={28} width={28} strokeWidth={2} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={tailwind`py-2 flex flex-col`}>
            <Text style={tailwind`text-base px-2 font-bold`}>Username: </Text>
            <View style={tailwind`flex flex-row items-center`}>
              <View style={tailwind`flex-1`}>
                <StandardInput
                  value={username}
                  updateInput={checkUsernameAvailability}
                  header="Username"
                  multi={false}
                  capitalize="none"
                  placeholder="username"
                  required={false}
                />
              </View>
              <CheckCircle height={28} width={28} style={tailwind`mr-2`} color={availableUsername ? 'green' : 'red'}/>
            </View>
          </View>
          <View style={tailwind`py-2 flex flex-col`}>
            <Text style={tailwind`text-base px-2 font-bold`}>Account Name: </Text>
            <StandardInput
              value={accountName}
              updateInput={setAccountName}
              header="account name"
              multi={false}
              capitalize="none"
              placeholder="account name"
              required={false}
            />
          </View>
          <View style={tailwind`py-2 flex flex-col`}>
            <Text style={tailwind`text-base px-2 font-bold`}>Bio: </Text>
            <StandardInput
              value={bio}
              updateInput={setBio}
              header="Bio"
              multi={false}
              capitalize="none"
              placeholder="bio"
              required={false}
            />
          </View>
          <View style={tailwind`w-full flex flex-row items-center`}>
            <View style={tailwind`py-2 flex flex-col w-1/2`}>
              <Text style={tailwind`text-base px-2 font-bold`}>First Name: </Text>
              <StandardInput
                value={firstname}
                updateInput={setFirstName}
                header="First Name"
                multi={false}
                capitalize="none"
                placeholder="first name"
                required={false}
              />
            </View>
            <View style={tailwind`py-2 flex flex-col w-1/2`}>
              <Text style={tailwind`text-base px-2 font-bold`}>Last Name: </Text>
              <StandardInput
                value={lastName}
                updateInput={setLastName}
                header="Last Name"
                multi={false}
                capitalize="none"
                placeholder="last name"
                required={false}
              />
            </View>
          </View>
          <View style={tailwind`py-2 flex flex-col`}>
            <Text style={tailwind`text-base px-2 font-bold`}>Location: </Text>
            <StandardInput
              value={location}
              updateInput={setLocation}
              header="location"
              multi={false}
              capitalize="none"
              placeholder="location (city, state)..."
              required={false}
            />
          </View>
          <View style={tailwind`py-2 flex flex-row items-center justify-between`}>
            <Text style={tailwind`text-base px-2 font-bold`}>Public: </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#e94f4e' }}
              thumbColor={isPublic ? 'white' : 'white'}
              onValueChange={setIsPublic}
              value={isPublic}
              style={tailwind`mr-2`}
            />
          </View>
        </View>
      </ScrollView>
      <View style={tailwind`p-2`}>
        <MainButton header="Update Account" loading={loading} clickButton={updateProfile} />
      </View>
    </View>
  );
};

export default EditProfile;
