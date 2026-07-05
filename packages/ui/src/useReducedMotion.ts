import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * True when the OS "reduce motion" setting is on. Every animated component in the
 * app must consult this and provide a static/crossfade fallback — the council flagged
 * the prototype's spinners, the QR "scan" sweep, the live blip pulse, and the
 * fade/"layer in" transitions as having no reduced-motion path.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (mounted) setReduced(v);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return reduced;
}
