import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export function useTilt(options = {}) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    VanillaTilt.init(node, options);

    return () => {
      if (node.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return tiltRef;
}
