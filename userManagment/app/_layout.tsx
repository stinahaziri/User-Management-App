// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//IMPORTAT TON
import { Appearance } from 'react-native';//PER LIGHT OSE DARK THEME
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const  theme=colorScheme=="dark"? Colors.dark : Colors.light; 


  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerStyle:{backgroundColor:theme.headerBackground},headerTintColor:theme.text,headerShadowVisible:false}}>

        <Stack.Screen name="index" options={{ title:"Home" ,headerShown:false}}/>
        <Stack.Screen name="AddUser" options={{ title:"AddUser"}}/>
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      </SafeAreaProvider>
   
  );
}
