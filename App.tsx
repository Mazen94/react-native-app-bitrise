import React from 'react';
import {SafeAreaView, View} from 'react-native';
import VideoCall from './src/Screens/VideoCall';
const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <VideoCall />
      </View>
    </SafeAreaView>
  );
};
export default App;
