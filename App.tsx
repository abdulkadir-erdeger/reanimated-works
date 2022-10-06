import { View, StyleSheet} from 'react-native'
import React from 'react'
import Introduction from './examples/Introduction'
import PanGestureHandlerWork from './examples/PanGestureHandlerWork'
import InterpolateWithScrollView from './examples/InterpolateWithScrollView'
import InterpolateColors from './examples/InterpolateColors'
import PinchGestureHandlerWork from './examples/PinchGestureHandlerWork'
import AnimateOnDoubleTap from './examples/AnimateOnDoubleTap'
import ColorPickerWork from './examples/ColorPickerWork'
import CircularProgressBar from './examples/CircularProgressBar'

const App = () => {
  return (
    <View style={styles.container}>
  <PanGestureHandlerWork/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App