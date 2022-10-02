import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const imageUri =
  'https://galeri13.uludagsozluk.com/632/leyla-ile-mecnun_1794933.png';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get('window');

const PinchGestureHandlerWork = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);
  
    const pinchHandler =
      useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive: (event) => {
          scale.value = event.scale;
          focalX.value = event.focalX;
          focalY.value = event.focalY;
        },
        onEnd: () => {
          scale.value = withTiming(1);
        },
      });
  
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: focalX.value },
          { translateY: focalY.value },
          { translateX: -width / 2 },
          { translateY: -height / 2 },
          { scale: scale.value },
          { translateX: -focalX.value },
          { translateY: -focalY.value },
          { translateX: width / 2 },
          { translateY: height / 2 },
        ],
      };
    });
  
    const focalPointStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
      };
    });
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={{ flex: 1 }}>
            <AnimatedImage
              style={[{ height:height, width:width }, rStyle]}
              source={{ uri: imageUri }}
            />
            <Animated.View style={[styles.focalPoint, focalPointStyle]} />
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    focalPoint: {
      ...StyleSheet.absoluteFillObject,
      width: 20,
      height: 20,
      backgroundColor: 'blue',
      borderRadius: 10,
    },
  });

export default PinchGestureHandlerWork