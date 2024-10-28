import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Maximize, Minimize, Pause, Play } from 'react-native-feather'
import Video from 'react-native-video'
import tailwind from 'twrnc'

interface DispayImageProps {
  video: string,
  maximize: () => void,
}

const DisplayVideoRecipe: React.FC<DispayImageProps> = ({video, maximize}) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false)

  return (
    <View style={tailwind`w-full h-80 rounded-3 my-4`}>
      <Video
        source={{ uri: video }}
        paused={!isPlaying}
        style={tailwind`w-full h-80 rounded-3 rounded-lg`}
        resizeMode="cover"
        onLoadStart={() => setLoadingVideo(true)}
        onLoad={() => setLoadingVideo(false)}
        onError={(e) => console.log('Video error:', e)}
      />
      <View style={tailwind`absolute z-10 w-full h-full flex justify-between`}>
        <TouchableOpacity onPress={maximize} style={tailwind`w-full flex flex-row justify-end p-4`}>
          <Maximize height={28} width={28} color={'white'}/>
        </TouchableOpacity>
        <View style={tailwind`w-full flex flex-row justify-center opacity-50 mb-16`}>
          {isPlaying 
            ? (
              <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={tailwind`h-16 w-16 bg-slate-600 rounded-full flex justify-center items-center`}>
                <Pause height={30} width={30} color={'white'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={tailwind`h-16 w-16 bg-slate-600 rounded-full flex justify-center items-center`}>
                <Play height={30} width={30} color={'white'} />
              </TouchableOpacity>
            )
          }
        </View>
        <View></View>
      </View>
    </View>
  )
}

export default DisplayVideoRecipe
