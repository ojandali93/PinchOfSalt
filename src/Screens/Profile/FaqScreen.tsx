import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { questions } from '../../Utils/questions'
import MainButton from '../../Components/Buttons/Content/MainButton'
import tailwind from 'twrnc';

const FaqScreen = () => {
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader header={'FAQ\'s'} back={true}/>
      <ScrollView style={tailwind`w-full flex flex-col p-2`}>
        {
          questions.map((question: any, index: number) => (
            <View key={index} style={tailwind`mb-4`}>
              <Text style={tailwind`text-xl font-semibold py-3`}>{question.question}</Text>
              {
                question.answer.map((answer: any, answerIndex: number) => (
                  <View key={answerIndex} style={tailwind`mt-4 ml-4`}>
                    <Text style={tailwind`text-base`}>{answerIndex + 1}. {answer}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }
      </ScrollView>
      <View style={tailwind`p-2`}>
        <MainButton header='Contact Support' loading={false} clickButton={() => {navigation.navigate('ContactUsScreen')}}/>
      </View>
    </View>
  )
}

export default FaqScreen
