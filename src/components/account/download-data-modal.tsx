import { Modal, Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';

interface DownloadDataModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DownloadDataModal({ visible, onClose, onConfirm }: DownloadDataModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
        <View
          style={{
            backgroundColor: Palette.surface,
            borderRadius: 24,
            padding: 24,
            width: '100%',
            maxWidth: 360,
            gap: 16,
          }}>
          <Text
            style={{
              fontFamily: Font.heading,
              fontSize: 18,
              color: Palette.ink,
            }}>
            download my data
          </Text>
          <Text
            style={{
              fontFamily: Font.body,
              fontSize: 14,
              color: Palette.textSecondary,
              lineHeight: 21,
            }}>
            We'll email you a link to download your data within 24 hours. The
            archive includes your profile, orders, and preferences.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <PressableScale
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel data download"
              style={{
                flex: 1,
                height: 48,
                borderRadius: 14,
                backgroundColor: Palette.chip,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Font.semibold,
                  fontSize: 14,
                  color: Palette.inkSoft,
                }}>
                cancel
              </Text>
            </PressableScale>
            <PressableScale
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel="Confirm data download request"
              style={{
                flex: 2,
                height: 48,
                borderRadius: Radius.pill,
                backgroundColor: Palette.brand,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ fontFamily: Font.semibold, fontSize: 14, color: '#fff' }}>
                request download
              </Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </Modal>
  );
}
