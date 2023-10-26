import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import CustomText from './src/components/CustomText';
import Tettt from './src/components/Tettt';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-300">
      <Text className="text-red-500 font-bold text-lg" >This is Bingo! App</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

