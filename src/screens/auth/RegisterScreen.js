import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AuthHeader from '../../components/headers/AuthHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FlatBtn from '../../components/button/FlatBtn'

import { AntDesign } from "@expo/vector-icons";
import CustomInput from '../../components/inputs/CustomInput'
import { SCREENS } from '../../routes/screens'

const RegisterScreen = ({navigation}) => {
  return (
    <View className="flex-1">
      <AuthHeader title="Register" />

      <KeyboardAwareScrollView className="px-5">
        <View className="my-6">
          <FlatBtn
            icon={<AntDesign name="googleplus" size={24}  color="#fbbc05" />}
            title="Sign up with Google"
            color='#4285f4'
          />
        </View>
        <Text className="my-5 text-center text-green-900 font-bold text-lg">OR</Text>
        <View>

          <CustomInput label="First Name" placeholder='Input your First Name' />
          <CustomInput label="Last Name" placeholder='Input your Last Name' />
          <CustomInput label="Addresss" placeholder='Input your Address' />
          <CustomInput label="LGA, State" placeholder='Input your Address' />
          <CustomInput label="Email" placeholder='Input your email' />
          <CustomInput label="Password" placeholder='**************' />
          <View className="mt-8">
            <FlatBtn title='Sign Up' />
          </View>
        </View>
       
        <TouchableOpacity className="py-2 mx-10 my-10" activeOpacity={0.7} onPress={()=>navigation.navigate(SCREENS.Login)}>
          <Text className="text-center text-xl text-green-800 font-bold">
            Login
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
