import React, { useState, useCallback, useEffect } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import { Activity, Check, X } from 'react-native-feather';
import supabase from '../../Utils/supabase';
import { RefreshControl } from 'react-native-gesture-handler';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { currentProfile, userActivity, getUserActivity, userFriendRequests, 
    getUserFriendsPending, userListRequests, getUserListPending, generateNotification } = useUser();

  const [viewOptions, setViewOptions] = useState<string>('Activity')
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingFriends, setRefreshingFriends] = useState(false);
  const [refreshingLists, setRefreshingLists] = useState(false);


  const deleteFriendRequest = async (friend_id: number) => {
    try {
      const {error} = await supabase
        .from('Relations')
        .delete()
        .eq('id', friend_id)

      if(error){
        console.log('There is an error while deleting this request: ', error)
      }
      getUserFriendsPending(currentProfile.user_id)
    } catch(error) {
      console.log('There was an error deleting a request: ', error)
    }
  }

  const updateFriendRequest = async (friend_id: number, fcm_token: any) => {
    try {
      const {error} = await supabase
        .from('Relations')
        .update({
          status: 'follow',
          request: false
        })
        .eq('id', friend_id)

      if(error){
        console.log('There is an error while deleting this request: ', error)
      }
      generateNotification(fcm_token, 'Accepted Friend Request', `${currentProfile.username} accepted your friend request.`)
      getUserFriendsPending(currentProfile.user_id)
    } catch(error) {
      console.log('There was an error deleting a request: ', error)
    }
  }

  const deleteListRequest = async (member_id: number) => {
    try {
      const {error} = await supabase
        .from('Members')
        .delete()
        .eq('id', member_id)

      if(error){
        console.log('There is an error while deleting this list request: ', error)
      }
      getUserListPending(currentProfile.user_id)
    } catch(error) {
      console.log('There was an error deleting a list request: ', error)
    }
  }

  const updateListRequest = async (member_id: number, fcm_token: any) => {
    try {
      const {error} = await supabase
        .from('Members')
        .update({
          status: 'member'
        })
        .eq('id', member_id)

      if(error){
        console.log('There is an error while deleting this list request: ', error)
      }
      generateNotification(fcm_token, 'Accepted List Request', `${currentProfile.username} accepted your list request.`)
      getUserListPending(currentProfile.user_id)
    } catch(error) {
      console.log('There was an error deleting a list request: ', error)
    }
  }

  const onRefreshActivity = useCallback(() => {
    setRefreshing(true);
    getUserActivity(currentProfile.user_id).finally(() => {
      setRefreshing(false);
    });
  }, [userActivity]);

  const onRefreshFriends = useCallback(() => {
    setRefreshingFriends(true);
    getUserFriendsPending(currentProfile.user_id).finally(() => {
      setRefreshingFriends(false);
    });
  }, [userFriendRequests]);

  const onRefreshLists = useCallback(() => {
    setRefreshingLists(true);
    getUserListPending(currentProfile.user_id).finally(() => {
      setRefreshingLists(false);
    });
  }, [userListRequests]);
  
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader
        header="Notifications"
        back={true}
      />
      <View style={tailwind`w-full flex flex-row justify-between pt-3 my-2 px-4`}>
        <TouchableOpacity onPress={() => setViewOptions('Activity')} style={tailwind`w-1/2 items-center pb-3 ${viewOptions === 'Activity' ? 'border-b-4 border-b-red-500' : 'border-b-2 border-b-slate-950' }`}>
          <Text style={tailwind`${viewOptions === 'Activity' ? 'font-bold' : '' }`}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewOptions('Notifications')} style={tailwind`w-1/2 items-center pb-3 ${viewOptions === 'Notifications' ? 'border-b-4 border-b-red-500' : 'border-b-2 border-b-slate-950' }`}>
          <Text style={tailwind`${viewOptions === 'Notifications' ? 'font-bold' : '' }`}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind`flex-1 py-2`}>
        {
          viewOptions === 'Activity' 
            ? <FlatList
                data={userActivity}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return(
                    <View style={tailwind`w-full`}>
                      <View style={tailwind`px-2 pb-1`}>
                        <View style={tailwind`bg-stone-100 flex flex-row p-2 items-center`}>
                          <Image style={tailwind`h-12 w-12 rounded-full`} source={{uri: item.item.image}}/>
                          <View style={tailwind`flex-1 ml-2`}>
                            <Text style={tailwind`text-black text-base`}>{item.item.activity}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefreshActivity} />
                }
              />
            : <View style={tailwind`flex-1`}>
                <View style={tailwind`px-2 mb-2 flex-1`}>
                  <View style={tailwind`w-full bg-stone-200 py-3 px-3`}>
                    <Text style={tailwind`text-lg font-bold`}>Friend Requests</Text>
                  </View>
                  <View style={tailwind`h-full`}>
                    <FlatList
                      data={userFriendRequests}
                      keyExtractor={(item) => item.id}
                      renderItem={(item) => {
                        return(
                          <View style={tailwind`w-full flex flex-row items-center py-2 mt-2 bg-stone-100`}>
                            <View>
                              <Image style={tailwind`h-12 w-12 rounded-full`} source={{uri: item.item.followerProfile.profile_picture}}/>
                            </View>
                            <View style={tailwind`flex-1 ml-4`}>
                              <Text>{item.item.followerProfile.username} wants to follow you</Text>
                            </View>
                            <View style={tailwind`flex flex-row items-center`}>
                              <TouchableOpacity onPress={() => {updateFriendRequest(item.item.id, item.item.followerProfile.fcm_token)}}>
                                <Check height={24} width={24} strokeWidth={2} color={'green'}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {deleteFriendRequest(item.item.id)}}>
                                <X style={tailwind`ml-3 mr-2`} height={24} width={24} strokeWidth={2} color={'red'}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      }}
                      refreshControl={
                        <RefreshControl refreshing={refreshingFriends} onRefresh={onRefreshFriends} />
                      }
                    />
                  </View>
                </View>
                <View style={tailwind`px-2 flex-1`}>
                  <View style={tailwind`w-full bg-stone-200 py-3 px-3`}>
                    <Text style={tailwind`text-lg font-bold`}>Collection Requests</Text>
                  </View>
                  <View style={tailwind`h-full`}>
                    <FlatList
                      data={userListRequests}
                      keyExtractor={(item) => item.id}
                      renderItem={(item) => {
                        return(
                          <View style={tailwind`w-full flex flex-row items-center py-2 mt-2 bg-stone-100`}>
                            <View>
                              <Image style={tailwind`h-12 w-12 rounded-full`} source={{uri: item.item.collection.main_image}}/>
                            </View>
                            <View style={tailwind`flex-1 ml-4`}>
                              <Text>{item.item.profile.username} wants to add you to {item.item.collection.title}</Text>
                            </View>
                            <View style={tailwind`flex flex-row items-center`}>
                              <TouchableOpacity onPress={() => {updateListRequest(item.item.id, item.item.profile.fcm_token)}}>
                                <Check height={24} width={24} strokeWidth={2} color={'green'}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {deleteListRequest(item.item.id)}}>
                                <X style={tailwind`ml-3 mr-2`} height={24} width={24} strokeWidth={2} color={'red'}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      }}
                      refreshControl={
                        <RefreshControl refreshing={refreshingLists} onRefresh={onRefreshLists} />
                      }
                    />
                  </View>
                </View>
              </View>

        }
      </View>
    </View>
  );
};

export default NotificationScreen;
