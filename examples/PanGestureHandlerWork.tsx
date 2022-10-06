import { View,StyleSheet,Dimensions, Image } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue,withSpring } from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';


const {width,height}=Dimensions.get("window");

type ContextType={
  translateX:number,
  translateY:number,
}

const PanGestureHandlerWork = () => {
  const translateX=useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
  PanGestureHandlerGestureEvent,
  ContextType>
 ({
    onStart:(event, context)=>{
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive:(event,context)=>{
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
     },
    onEnd:()=>{
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < (width*0.3) + (width-100) / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
 })

 const rStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value-25,
      },
    ],
  };
});


    
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
       
          <Animated.View style={[styles.square, rStyle]} >
            <Image source={require("../assets/playingCard.png")} style={styles.image} resizeMode="stretch" />
          </Animated.View>
       
        </PanGestureHandler>
      </View>
    </View>
  </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: width*0.3,
    height: height*0.25,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth:1,
    top:30
  },
    circle: {
      width: width-100,
      height: width-100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 5,
      borderColor: 'rgba(0, 0, 256, 0.5)',
      top:-100,
      borderStyle:"dotted"
    },
    image:{
      width:"100%",
      height:"100%"
    }
})
export default PanGestureHandlerWork;