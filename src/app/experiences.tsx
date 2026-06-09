import { Ticket } from 'lucide-react-native';

import { ComingSoon } from '@/components/coming-soon';

export default function ExperiencesScreen() {
  return (
    <ComingSoon
      Icon={Ticket}
      title="experiences"
      subtitle="Book catering, cooking classes, and tasting events — or post a request and let local preppers bid."
    />
  );
}
