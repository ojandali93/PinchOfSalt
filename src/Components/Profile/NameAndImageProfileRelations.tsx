import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';
import supabase from '../../Utils/supabase';
import { useUser } from '../../Context/UserContext';
import { useApp } from '../../Context/AppContext';

interface NameAndImageProps {
  profile: any,
  following: any[]  // Array of follow records (logged-in user's following list)
}

const NameAndImageProfileRelations: React.FC<NameAndImageProps> = ({ profile, following }) => {
  const { currentProfile, getUserFollowingNoRecipe, userFollowingNoReipce } = useUser();
  const { createNotification } = useApp()

  const followRecord = userFollowingNoReipce.find(follow => follow.following === profile.user_id);

  const handleFollow = async () => {
    if (!currentProfile) {
      Alert.alert('Login Required', 'In order to follow a user, you must be logged in.');
      return;
    }

    if (followRecord?.status === 'blocked') {
      Alert.alert('Cannot Follow', 'You are blocked from following this user.');
      return;
    }

    if (!followRecord || followRecord.status === 'unfollow') {
      profile.public ? await createFollow() : await createPendingFollow();
    } else if (followRecord.status === 'follow' || followRecord.status === 'pending') {
      await deleteFollow();
    }
  };

  const createFollow = async () => {
    try {
      const { data, error } = await supabase
        .from('Relations')
        .insert([{ 
          follower: currentProfile.user_id, 
          following: profile.user_id, 
          request: false, 
          status: 'follow' 
        }])
        .select();
        createNotification(
          profile.user_id,
          null,
          null,
          null,
          data[0].id,
          null,
          `${currentProfile.username} is following you.`,
          currentProfile.user_id
        )
      if (error) console.error('Error creating follow:', error);
      else getUserFollowingNoRecipe(currentProfile.user_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createPendingFollow = async () => {
    try {
      const { data, error } = await supabase
        .from('Relations')
        .insert([{ 
          follower: currentProfile.user_id, 
          following: profile.user_id, 
          request: true, 
          status: 'pending' 
        }])
        .select()
        createNotification(
          profile.user_id,
          null,
          null,
          null,
          data[0].id,
          null,
          `${currentProfile.username} requested to follow you.`,
          currentProfile.user_id
        )
      if (error) console.error('Error creating pending follow:', error);
      else getUserFollowingNoRecipe(currentProfile.user_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFollow = async () => {
    try {
      const { error } = await supabase
        .from('Relations')
        .delete()
        .eq('id', followRecord.id);

      if (error) console.error('Error deleting follow:', error);
      else getUserFollowingNoRecipe(currentProfile.user_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const buttonText = followRecord
    ? followRecord.status === 'follow'
      ? 'Following'
      : followRecord.status === 'pending'
      ? 'Pending'
      : 'Follow'
    : 'Follow';

  return (
    <View style={tailwind`flex flex-row items-center justify-between`}>
      <View style={tailwind`flex flex-row items-center`}>
        <Image alt="Profile Picture" style={tailwind`h-18 w-18 bg-stone-300 rounded-full`} source={{ uri: profile.profile_picture }} />
        <View style={tailwind`ml-4`}>
          <Text style={tailwind`text-xl font-semibold`}>{profile.username}</Text>
          <Text style={tailwind`text-base`}>{profile.account_name}</Text>
        </View>
      </View>
      <View>
        {currentProfile && profile.user_id === currentProfile.user_id ? null : (
          <TouchableOpacity
            onPress={handleFollow}
            style={[
              tailwind`p-2 rounded-lg`,
              buttonText === 'Follow' ? tailwind`bg-red-500` : tailwind`bg-gray-500`
            ]}
          >
            <Text style={tailwind`text-white font-semibold`}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NameAndImageProfileRelations;
