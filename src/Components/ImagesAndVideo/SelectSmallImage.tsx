import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Camera, Plus, RefreshCw, X } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'
import tailwind from 'twrnc'

interface SelectImageProps {
  picture: any,
  updatePicture: (data: any) => void
}

const SelectSmallImage: React.FC<SelectImageProps> = ({picture, updatePicture}) => {

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', }, (response) => {
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
            fileType: asset.type
          };
          updatePicture(selectedFile)
        }
      }
    });
  }

  return (
    <>
      {
        picture && picture.uri
          ? <TouchableOpacity onPress={selectImage} style={tailwind`h-18 w-18 bg-stone-300 rounded-2`}>
              <Image style={tailwind`flex-1 rounded-2`} source={{uri: picture.uri}}/>
            </TouchableOpacity>
          : <TouchableOpacity onPress={selectImage} style={tailwind`h-18 w-18 bg-stone-300 rounded-2 flex justify-center items-center`}>
              <Camera height={28} width={28} color={'black'}/>
            </TouchableOpacity>
      }
    </>
  )
}

export default SelectSmallImage
