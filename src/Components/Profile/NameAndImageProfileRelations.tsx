import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';
import supabase from '../../Utils/supabase';
import { useUser } from '../../Context/UserContext';

interface NameAndImageProps {
  profile: any,
  following: any[]  // Array of follow records (logged-in user's following list)
}

const NameAndImageProfileRelations: React.FC<NameAndImageProps> = ({ profile, following }) => {
  const [followStatus, setFollowStatus] = useState<'follow' | 'unfollow' | 'pending' | 'blocked' | null>(null);
  const [followRecordId, setFollowRecordId] = useState<number | null>(null); // Store the ID of the follow record
  const { currentProfile, getUserFollowing } = useUser();

  useEffect(() => {
    checkFollowStatus();
  }, [following]);

  const checkFollowStatus = () => {
    const followRecord = following.find(follow => follow.following === profile.user_id);

    if (followRecord) {
      setFollowRecordId(followRecord.id);  // Store the record id
      if (followRecord.status === 'pending') {
        setFollowStatus('pending');
      } else if(followRecord.status === 'follow') {
        setFollowStatus('unfollow');
      } else if(followRecord.status === 'blocked') {
        setFollowStatus('blocked')
      } else {
        setFollowStatus(null)
      }
    } else {
      setFollowStatus('follow');
    }
  };

  const handleFollow = async () => {
    if(currentProfile){
      if (followStatus === 'follow') {
        if (profile.public) {
          await createFollow();
        } else {
          await createPendingFollow();
        }
      } else if (followStatus === 'unfollow' || followStatus === 'pending' || followStatus === 'blocked') {
        await deleteFollow();  // Delete the follow record
      } 
    } else {
      Alert.alert('Login Required', 'In order to follow a user, you must be logged in.')
    }
  };

  const createFollow = async () => {
    try {
      const { data, error } = await supabase
        .from('Relations')
        .insert([
          {
            follower: currentProfile.user_id,
            following: profile.user_id,
            request: false,
            status: 'follow'
          }
        ])
        .select();

      if (error) {
        console.error('Error creating follow:', error);
      } else {
        getUserFollowing(currentProfile.user_id); // Refresh follow status
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createPendingFollow = async () => {
    try {
      const { data, error } = await supabase
        .from('Relations')
        .insert([
          {
            follower: currentProfile.user_id,
            following: profile.user_id,
            type: 'friend',
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        console.error('Error creating pending follow:', error);
      } else {
        getUserFollowing(currentProfile.user_id); // Refresh follow status
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFollow = async () => {
    if (followRecordId) {
      try {
        const { error } = await supabase
          .from('Relations')
          .delete()
          .eq('id', followRecordId);  // Use the stored record id

        if (error) {
          console.error('Error deleting follow:', error);
        } else {
          getUserFollowing(currentProfile.user_id); // Refresh follow status
          setFollowStatus('follow'); // Set the status to 'follow' after unfollowing or removing pending
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={tailwind`flex flex-row items-center justify-between`}>
      <View style={tailwind`flex flex-row items-center`}>
        <View style={tailwind`h-18 w-18`}>
          <Image alt='Profile Picture' style={tailwind`h-18 w-18 bg-stone-300 rounded-full`} source={{ uri: profile.profile_picture }} />
        </View>
        <View style={tailwind`ml-4`}>
          <Text style={tailwind`text-xl font-semibold`}>{profile.username}</Text>
          <Text style={tailwind`text-base`}>{profile.account_name}</Text>
        </View>
      </View>
      <View>
        {
          currentProfile && profile.user_id === currentProfile.user_id 
            ? null
            : <TouchableOpacity
                onPress={handleFollow}
                style={[
                  tailwind`p-2 rounded-lg border border-stone-400`,
                  followStatus === 'follow' ? tailwind`bg-red-500` : tailwind`bg-gray-500`, // Red if follow, gray if unfollow or pending
                ]}
              >
                <Text style={tailwind`text-white font-semibold`}>
                  {followStatus === 'follow' && 'Follow'}
                  {followStatus === 'unfollow' && 'Unfollow'}
                  {followStatus === 'pending' && 'Pending'}
                  {followStatus === 'blocked' && 'Blocked'}
                </Text>
              </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default NameAndImageProfileRelations;
