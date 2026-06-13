import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { Platform } from 'react-native';

export const Font = {
  display: 'Poppins-ExtraBold',
  heading: 'Poppins-Bold',
  body: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  logo: Platform.OS === 'web' ? 'Clash Display' : 'Poppins-ExtraBold',
} as const;

/** require() map for expo-font's useFonts(). */
export const fontAssets = {
  'Poppins-Regular': Poppins_400Regular,
  'Poppins-Medium': Poppins_500Medium,
  'Poppins-SemiBold': Poppins_600SemiBold,
  'Poppins-Bold': Poppins_700Bold,
  'Poppins-ExtraBold': Poppins_800ExtraBold,
};
