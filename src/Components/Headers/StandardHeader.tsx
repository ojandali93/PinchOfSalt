import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Bell, Bookmark, ChevronLeft, Heart, MoreHorizontal, PlusSquare } from 'react-native-feather';
import tailwind from 'twrnc';

interface StandardHeaderProps {
  header: string,
  add?: boolean,
  addClick?: () => void,
  more?: boolean,
  moreClick?: () => void,
  notifications?: boolean,
  notificationsClick?: () => void,
  favorites?: boolean,
  favoritesClick?: () => void,
  back?: boolean,
  like?: boolean,
  likeStatus?: boolean,
  addLike?: () => void,
  removeLike?: () => void,
}

const StandardHeader: React.FC<StandardHeaderProps> = (
  {
    header, 
    add, 
    addClick, 
    more, 
    moreClick, 
    notifications, 
    notificationsClick, 
    favorites, 
    favoritesClick,
    back,
    like,
    likeStatus,
    addLike,
    removeLike
  }
) => {

  const navigation = useNavigation();

  return (
    <View style={tailwind`w-full h-18 bg-slate-950 rounded-bl-5 rounded-br-5`}>
      <View style={tailwind`h-full flex flex-row items-center justify-between px-5`}>
        <View style={tailwind`flex flex-row items-center`}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind`ml-0 mr-3 flex flex-row items-center`}>
            <ChevronLeft height={28} width={28} color={'white'} style={tailwind``} />
          </TouchableOpacity>
        )}
          <Text style={tailwind`text-2xl text-white font-semibold`}>{header}</Text>
        </View>
        <View style={tailwind`flex flex-row items-center`}>
          {add && (
            <TouchableOpacity onPress={addClick}>
              <PlusSquare height={24} width={24} color={'white'} />
            </TouchableOpacity>
          )}
          {more && (
            <TouchableOpacity onPress={moreClick} style={tailwind`ml-4`}>
              <MoreHorizontal height={24} width={24} color={'white'} />
            </TouchableOpacity>
          )}
          {notifications && (
            <TouchableOpacity onPress={favoritesClick} style={tailwind`ml-4`}>
              <Bookmark height={24} width={24} color={'white'} />
            </TouchableOpacity>
          )}
          {favorites && (
            <TouchableOpacity onPress={notificationsClick} style={tailwind`ml-4`}>
              <Bell height={24} width={24} color={'white'} />
            </TouchableOpacity>
          )}
          {like && (
            <TouchableOpacity 
              onPress={likeStatus ? removeLike : addLike} 
              style={tailwind`ml-4`}
            >
              <Bookmark 
                height={24} 
                width={24} 
                color={'white'} // Filled heart if liked, outlined if not
                fill={likeStatus ? 'white' : 'none'} // Outline or filled based on status
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default StandardHeader;
