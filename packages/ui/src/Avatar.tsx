import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { radius as R, gradientFor, typography as t } from '@preppa/theme';

/**
 * User / kitchen avatar. Falls back to initials on a deterministic gradient keyed by
 * name — never a generic silhouette that could be mistaken for a real photo.
 */
export function Avatar({
  name, uri, size = 46, radius = R.avatar,
}: { name: string; uri?: string | null; size?: number; radius?: number }) {
  const initial = (name.trim()[0] ?? '?').toUpperCase();
  const [start, end] = gradientFor(name);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: radius }}
        contentFit="cover"
        accessibilityLabel={name}
      />
    );
  }
  return (
    <LinearGradient
      colors={[start, end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ color: '#fff', fontWeight: t.weight.extrabold, fontSize: size * 0.4, fontFamily: t.family.display }}>
        {initial}
      </Text>
    </LinearGradient>
  );
}
