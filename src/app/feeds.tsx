import { Clapperboard } from 'lucide-react-native';

import { ComingSoon } from '@/components/coming-soon';

export default function FeedsScreen() {
  return (
    <ComingSoon
      Icon={Clapperboard}
      title="feeds"
      subtitle="Short videos, meal drops, and live cook-alongs from the preppers you follow."
    />
  );
}
