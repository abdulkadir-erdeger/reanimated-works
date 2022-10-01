import { useEffect } from 'react';

import Animated, {useSharedValue, useAnimatedStyle, withTiming, withRepeat} from 'react-native-reanimated';

const SIZE=100.0;

const handleRotation=(progress:Animated.SharedValue<number>)=>{
"worklet";

return `${progress.value*2*Math.PI}rad`
}
const Introduction = () => {
    const progres=useSharedValue(1);
    const scale=useSharedValue(2)
    
    const reanimetedStyle=useAnimatedStyle(()=>{
      return{
        opacity:progres.value,
        borderRadius:(progres.value*SIZE)/2,
        transform:[{scale:scale.value},
          {rotate:handleRotation(progres)}]
      }
    },[])
    
    useEffect(()=>{
      progres.value=withRepeat( withTiming(0.5),3,true)
      scale.value=withRepeat( withTiming(1),3,true)
    },[])
    
      return (
       
          <Animated.View
          style={[{height:SIZE, width:SIZE, backgroundColor:"blue"},reanimetedStyle]}
          ></Animated.View>
        
      );
}



export default Introduction