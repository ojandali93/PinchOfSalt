import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal, Alert, FlatList, RefreshControl } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile';
import Bio from '../../Components/Profile/Bio';
import Summary from '../../Components/Profile/Summary';
import { useRecipe } from '../../Context/RecipeContext';
import supabase from '../../Utils/supabase';
import { FeedStackParamList } from '../../Navigation/FeedStackNavigation';
import NameAndImageProfileRelations from '../../Components/Profile/NameAndImageProfileRelations';
import { BlurView } from '@react-native-community/blur';
import { Flag, UserX } from 'react-native-feather';

type SingleRecipeRouteProp = RouteProp<FeedStackParamList, 'SelectedProfileScreenFeed'>;

const SelectedProfileScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { user_id } = route.params; 

  const { grabSelectedUserRecipes, selectedUserRecipes } = useRecipe();
  const { selectedUserLists, getSelectedUserLists, userFollowingNoReipce, currentProfile, getUserFollowingNoRecipe,
    getSelectedUserFollowers, getSelectedUserFollowing, selectedUserFollowers, selectedUserFollowing } = useUser()
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [centerView, setCenterView] = useState<string>('Recipes')

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCateogryVisible, setIsCategoryVisible] = useState<boolean>(false)
  
  const [refreshingRecipes, setRefreshingRecipes] = useState<boolean>(false)
  const [refreshingLists, setRefreshingLists] = useState<boolean>(false)
  const [refreshingFollowers, setRefreshingFollowers] = useState<boolean>(false)
  const [refreshingFollowing, setRefreshingFollowing] = useState<boolean>(false)

  const limitStringLength = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    getSelectedUserProfile(user_id)
    getSelectedUserLists(user_id)
    getSelectedUserFollowers(user_id)
    getSelectedUserFollowing(user_id)
  }, [])

  const getSelectedUserProfile = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('user_id', user_id);
      if (error) {
        console.error('Error fetching data:', error);
      }
      setSelectedProfile(data[0])
      grabSelectedUserRecipes(user_id)
      setLoading(false)
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  const reportUser = async (user_id: string | null, category: string) => {
    try {
      const { error: profileError } = await supabase
        .from('Reports')
        .insert([
          {
            user_id: user_id,  // Make sure this maps to user_id in the DB
            recipe_id: null,
            comment_id: null,
            category: category,
            reporting_user: currentProfile && currentProfile.user_id ? currentProfile.user_id : null,
          },
        ]);
      if (profileError) {
        console.error('Error reporting user:', profileError.message);
        return;
      }
      setIsCategoryVisible(false)
      setIsModalVisible(false)
      Alert.alert('Report Confirmed', 'We have received your report and we will investigate the claim.')
    } catch(err) {
      console.error('An error occurred while creating an account:', err);
    }
  }

  const blockUser = async () => {
    try {
      const existingRelation = userFollowingNoReipce.find(
        (relation) => relation.following === selectedProfile.user_id
      );
      if (existingRelation) {
        const { error: updateError } = await supabase
          .from('Relations')
          .update({ status: 'blocked', request: false })
          .eq('id', existingRelation.id);
        if (updateError) {
          console.error('Error updating relation status:', updateError.message);
          return;
        }
        Alert.alert('Blocked', 'This user has been blocked successfully.');
      } else {
        const { error: insertError } = await supabase
          .from('Relations')
          .insert([
            {
              follower: currentProfile.user_id, // Current user's ID
              following: selectedProfile.user_id, // Selected user's ID
              status: 'blocked',
              request: false,
            },
          ]);
        if (insertError) {
          console.error('Error creating relation:', insertError.message);
          return;
        }
        Alert.alert('Blocked', 'This user has been blocked successfully.');
      } -
      getUserFollowingNoRecipe(currentProfile.user_id)
    } catch (err) {
      console.error('Error blocking user:', err);
    } finally {
      setIsModalVisible(false);
    }
  };

  const onRefreshRecipes = useCallback(() => {
    setRefreshingRecipes(true);
    grabSelectedUserRecipes(user_id).finally(() => {
      setRefreshingRecipes(false);
    });
  }, [selectedUserRecipes]);

  const onRefreshLists = useCallback(() => {
    setRefreshingLists(true);
    getSelectedUserLists(user_id).finally(() => {
      setRefreshingLists(false);
    });
  }, [selectedUserLists]);

  const onRefreshFollowers = useCallback(() => {
    setRefreshingFollowers(true);
    getSelectedUserFollowers(user_id).finally(() => {
      setRefreshingFollowers(false);
    });
  }, [selectedUserFollowers]);

  const onRefreshFollowing = useCallback(() => {
    setRefreshingFollowing(true);
    getSelectedUserFollowing(user_id).finally(() => {
      setRefreshingFollowing(false);
    });
  }, [selectedUserFollowing]);
  

  return (
    <View style={tailwind`flex-1`}>
      {
        loading
          ? <View style={tailwind`h-full w-full flex justify-center items-center`}>
              <ActivityIndicator size={'large'} color={'black'}/>
            </View>
          : <>
              <StandardHeader 
                header={'Profile'} 
                back={true} 
                more={true} 
                moreClick={() => setIsModalVisible(true)} // Show modal on "more" click
              />
              <View style={tailwind`flex-1 bg-white p-4`}>
                <NameAndImageProfileRelations 
                  profile={selectedProfile} 
                  following={userFollowingNoReipce}
                />
                <Bio bio={selectedProfile.bio} />
                <Summary 
                  followers={selectedUserFollowers.length} 
                  following={selectedUserFollowing.length} 
                  recipes={selectedUserRecipes.length} 
                  lists={selectedUserLists.length}
                  onSelect={setCenterView} 
                />
                <View style={tailwind`h-1 w-full bg-stone-200 my-4`}></View>
        
                {/* Recipe Grid */}
                <View style={tailwind`flex-1`}>
                  {
                    centerView === 'Recipes'
                      ? <View style={tailwind`flex flex-wrap flex-row h-full`}>
                          <FlatList
                            style={tailwind`h-full`}
                            data={selectedUserRecipes}
                            key={`recipes-${centerView}`} // Use unique key for recipes view
                            numColumns={3} // Display 3 items per row
                            refreshControl={
                              <RefreshControl refreshing={refreshingRecipes} onRefresh={onRefreshRecipes} />
                            }
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                style={tailwind`w-1/3 p-1`} 
                                onPress={() => navigation.navigate('SingleRecipeScreenProfile', { item })}
                              >
                                <Image
                                  source={{ uri: item.main_image }}
                                  style={tailwind`w-full h-32 rounded-lg`}
                                />
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      : centerView === 'Lists'
                          ? <View style={tailwind`flex flex-wrap flex-row h-full`}>
                              <FlatList
                                data={selectedUserLists}
                                style={tailwind`h-full`}
                                key={`lists-${centerView}`} // Unique key for lists view
                                refreshControl={
                                  <RefreshControl refreshing={refreshingLists} onRefresh={onRefreshLists} />
                                }
                                renderItem={(item) => (
                                  <TouchableOpacity
                                    style={tailwind`w-full flex flex-row mb-3`} 
                                    onPress={() => navigation.navigate('SingleListScreenProfile', { item })}
                                  >
                                    <Image
                                      source={{ uri: item.item.collection.main_image }}
                                      style={tailwind`w-28 h-28 rounded-lg`}
                                    />
                                    <View style={tailwind`flex-1 ml-3`}>
                                      <Text style={tailwind`text-xl font-bold my-2`}>{item.item.collection.title}</Text>
                                      <Text style={tailwind`text-base`}>{limitStringLength(item.item.collection.description, 90)}</Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                      : centerView === 'Followers'
                          ? <View style={tailwind`flex flex-wrap flex-row h-full`}>
                              <FlatList
                                data={selectedUserFollowers}
                                style={tailwind`h-full`}
                                key={`followers-${centerView}`} // Unique key for followers view
                                refreshControl={
                                  <RefreshControl refreshing={refreshingFollowers} onRefresh={onRefreshFollowers} />
                                }
                                renderItem={(item) => (
                                  <TouchableOpacity
                                    style={tailwind`w-full flex flex-row items-center mb-3`} 
                                    onPress={() => navigation.navigate('SelectedProfileScreen', {user_id: item.item.Profiles.user_id})}
                                  >
                                    <Image
                                      source={{ uri: item.item.Profiles.profile_picture }}
                                      style={tailwind`w-14 h-14 rounded-full`}
                                    />
                                    <View style={tailwind`flex-1 ml-3`}>
                                      <Text style={tailwind`text-base font-bold`}>{item.item.Profiles.username}</Text>
                                      <Text style={tailwind`text-base`}>{item.item.Profiles.account_name}</Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                      : centerView === 'Following'
                          ? <View style={tailwind`flex flex-wrap flex-row h-full`}>
                              <FlatList
                                data={selectedUserFollowing}
                                style={tailwind`h-full`}
                                key={`following-${centerView}`} // Unique key for following view
                                refreshControl={
                                  <RefreshControl refreshing={refreshingFollowing} onRefresh={onRefreshFollowing} />
                                }
                                renderItem={(item) => {
                                  return(
                                    <TouchableOpacity
                                      style={tailwind`w-full flex flex-row items-center mb-3`} 
                                      onPress={() => navigation.navigate('SelectedProfileScreen', {user_id: item.item.Profiles.user_id})}
                                    >
                                      <Image
                                        source={{ uri: item.item.Profiles.profile_picture }}
                                        style={tailwind`w-14 h-14 rounded-full`}
                                      />
                                      <View style={tailwind`flex-1 ml-3`}>
                                        <Text style={tailwind`text-base font-bold`}>{item.item.Profiles.username}</Text>
                                        <Text style={tailwind`text-base`}>{item.item.Profiles.account_name}</Text>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                }}
                              />
                            </View>
                      : null
                    }
                  </View>
              </View>

              {/* Modal */}
              <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)} // Hide modal when back button is pressed
              >
                <BlurView
                  style={tailwind`absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10`}
                  blurType="dark"
                  blurAmount={5}
                />
                  <TouchableOpacity onPress={() => {setIsModalVisible(false)}} style={tailwind`absolute z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center`}>
                    <View style={tailwind`w-1/2 bg-slate-950 rounded-3 p-3`}>
                      <Text style={tailwind`text-white text-lg font-bold`}>Options</Text>
                      <View style={tailwind`bg-slate-700 rounded-2 mt-5 mb-3`}>
                        <TouchableOpacity onPress={() => {setIsCategoryVisible(!isCateogryVisible)}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950`}>
                          <Flag height={18} width={18} color={'white'}/>
                          <Text style={tailwind`text-white text-base font-white ml-2`}>Report User</Text>
                        </TouchableOpacity>
                        {
                          isCateogryVisible
                            ? <View>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Harassment')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Harassment</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Inappropriate')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Inappropriate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Violence')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Violence</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Bullying')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Bullying</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Spam')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Spam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'False Information')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>False Information</Text>
                                </TouchableOpacity>
                              </View>
                            : null
                        }
                        <TouchableOpacity onPress={() => {blockUser()}} style={tailwind`flex flex-row items-center p-2`}>
                          <UserX height={18} width={18} color={'white'}/>
                          <Text style={tailwind`text-white text-base font-white ml-2`}>Block User</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
              </Modal>
            </>
      }
    </View>
  );
};

export default SelectedProfileScreen;

