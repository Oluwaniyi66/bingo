import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnboardFlow } from 'react-native-onboard'
import { SCREENS } from '../../routes/screens'
import { StatusBar } from 'expo-status-bar'

export default function OnboardingScreen({navigation}) {
  return (
    <View>
        <StatusBar style="auto" backgroundColor='#DCF9ED' />
    <OnboardFlow
    pages={[
        {
            title: 'Welcome to Bingo',
            subtitle: 'Dispose your trash with ease...',
            imageUri: Image.resolveAssetSource(require('../../assets/trashman.png')).uri        
            
        },
        {
            title: 'Experience Ease',
            subtitle: 'With simple clicks, have a collector come pick up',
            imageUri: Image.resolveAssetSource(require('../../assets/truck.png')).uri, 
            primaryButtonTitle: 'Explore',
            
        }
    ]}
    type={'fullscreen'}
    style={{backgroundColor: '#DCF9ED'}}
    onDone={()=>navigation.navigate(SCREENS.Login)}
    />
    </View>
  )
}

const styles = StyleSheet.create({})