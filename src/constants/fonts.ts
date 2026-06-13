import { Platform } from 'react-native';

export const Font = {
  display: 'Poppins-ExtraBold',
  heading: 'Poppins-Bold',
  body: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  logo: Platform.OS === 'web' ? 'Clash Display' : 'Poppins-ExtraBold',
} as const;

/** Self-hosted TTFs in assets/fonts — safe for Vercel deployments. */
export const fontAssets = {
  'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
};
