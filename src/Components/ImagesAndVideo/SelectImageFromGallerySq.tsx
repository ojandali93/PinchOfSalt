import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Camera, ChevronRight, Plus, RefreshCw, X } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'
import tailwind from 'twrnc'

interface SelectImageProps {
  picture: any,
  updatePicture: (data: any) => void,
  required: boolean
}

const SelectImageFromGallerySq: React.FC<SelectImageProps> = ({picture, updatePicture, required}) => {

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
          ? <View style={tailwind`w-full mt-4 bg-stone-300 rounded-2`}>
              <TouchableOpacity onPress={selectImage} style={tailwind`w-full bg-stone-300 rounded-2 flex flex-row items-center justify-between py-3 px-4`}>
                <View style={tailwind`flex flex-row items-center`}>
                  <Camera height={28} width={28} color={'black'}/>
                  <Text style={tailwind`ml-3 text-base font-semibold`}>Select Main Image{required ? <Text style={tailwind`text-red-500`}>*</Text> : null}</Text>
                </View>
                <View>
                  <ChevronRight height={28} width={28} color={'black'}/>
                </View>
              </TouchableOpacity>
              <Image style={tailwind`h-80 rounded-2`} source={{uri: picture.uri}}/>
              <View style={tailwind`absolute z-10 flex-1 top-12 bottom-0 left-0 right-0 p-4 flex flex-row justify-between`}>
                <TouchableOpacity onPress={() => {updatePicture(null)}} style={tailwind`h-10 w-10 bg-stone-400 rounded-full flex justify-center items-center opacity-80`}>
                  <X height={20} width={20} color={'white'}/>
                </TouchableOpacity>
              </View>
            </View>
          : <TouchableOpacity onPress={selectImage} style={tailwind`w-full mt-4 bg-stone-300 rounded-2 flex flex-row items-center justify-between py-3 px-4`}>
              <View style={tailwind`flex flex-row items-center`}>
                <Camera height={28} width={28} color={'black'}/>
                <Text style={tailwind`ml-3 text-base font-semibold`}>Select Main Image{required ? <Text style={tailwind`text-red-500`}>*</Text> : null}</Text>
              </View>
              <View>
                <ChevronRight height={28} width={28} color={'black'}/>
              </View>
            </TouchableOpacity>
      }
    </>
  )
}

export default SelectImageFromGallerySq
