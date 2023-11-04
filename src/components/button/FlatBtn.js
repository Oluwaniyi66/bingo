import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FlatBtn = ({icon, title = 'Title', color = 'rgb(21 128 61)', onPress = ()=>{}, isLoading, disabled, textColor = 'white'}) => {
  return (
    <TouchableOpacity className="w-full bg-green-700 p-4 items-center flex-row justify-center" style={[styles.btnContainer, {backgroundColor: color}]} onPress={onPress} disabled={disabled || isLoading} activeOpacity={0.7}>
        {icon && <View className="mr-2">
            {icon}
        </View>}
        <Text className="text-xl text-white font-semibold " style={{color: textColor}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default FlatBtn

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 8,
    }
})