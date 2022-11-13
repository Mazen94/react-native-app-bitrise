import {
  AvoidSoftInput,
  useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import React, {useCallback, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
Text,
} from 'react-native';
const App: React.FC = () => {
  const [text, onChangeText] = React.useState('Useless Text');

  /**
   * You can store additional padding using Reanimated's shared value
   *
   * If you want to keep it simple, you can instead store it in React's useState
   */
  const buttonContainerPaddingValue = useSharedValue(0);

  const buttonContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: buttonContainerPaddingValue.value,
    };
  });

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true); // <---- Tell Android that library will handle keyboard insets manually to match iOS behavior
    AvoidSoftInput.setEnabled(true);

    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onFocusEffect, []);

  useSoftInputHeightChanged(({softInputHeight}) => {
    console.log('i sdsd', softInputHeight);
    /**
     * Set/remove additional padding when soft input is visible/hidden
     *
     * You can save it in Reanimated's shared value and make smooth transition
     * or just store it inside React's useState and add padding conditionally in render part
     *
     * You can also use `useSoftInputShown` & `useSoftInputHidden`
     *
     * useSoftInputShown(({ softInputHeight }) => {
     *   buttonContainerPaddingValue.value = withTiming(softInputHeight);
     * });
     *
     * useSoftInputHidden(() => {
     *   buttonContainerPaddingValue.value = withTiming(0);
     * });
     */
    buttonContainerPaddingValue.value = withTiming(softInputHeight, {
      duration: 360,
      easing: Easing.bezier(0.25, 0, 0.4, 1),
    });
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <ScrollView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </ScrollView>
        </View>
        <Animated.View style={buttonContainerAnimatedStyle}>
          <TouchableOpacity style={styles.button}>
            <Text>Press Here</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
