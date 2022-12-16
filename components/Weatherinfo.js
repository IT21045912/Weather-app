import { View, Text ,StyleSheet ,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Utils/Index'

const {PRIMERY_COLOR,SECONDARY_COLOR,BORDER_COLOR} =colors

export default function Weatherinfo( {currentWeather}) {

    const{
        main : {temp},
        weather :[details],
        name 
    } = currentWeather
    const {icon , main , description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
   
    
  return (
    <View style={styles.Weatherinfo}>
        <Text>{name}</Text>
        <Image style={styles.WeatherIcon} source={{uri:iconUrl}}/>
        <Text style={styles.textPrimary}>{temp}°</Text>
        <Text style ={styles.WeatherDescription}>{description}</Text>
        <Text style={styles.textSecondary}>{main}</Text>
    </View>
  )
}
const styles = StyleSheet.create({

    Weatherinfo:{
        alignItems:'center'
    },
    WeatherDescription:{
        textTransform:'capitalize'
    },
    WeatherIcon:{
        width:100,
        height:100
    },
    textPrimary:{
        fontSize:40,
        color:PRIMERY_COLOR,
    },
    textSecondary:{
        fontSize:20,
        color:SECONDARY_COLOR,
        fontWeight:'500',
        marginTop:10
    }
    
})