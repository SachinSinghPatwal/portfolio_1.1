"use client";

import { useSyncExternalStore } from "react";
import { useMediaQuery } from "react-responsive";

const emptySubscribe = () => () => {};

export function useResponsive() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Mobile: < 768px
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });
  // Tablet: 768px - 1023px
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  // Desktop: >= 1024px
  const isDesktopQuery = useMediaQuery({ minWidth: 1024 });

  return {
    mounted,
    // On server / before mount, default to desktop to preserve PC SSR and prevent PC layout shift
    isMobile: mounted ? isMobileQuery : false,
    isTablet: mounted ? isTabletQuery : false,
    isDesktop: mounted ? isDesktopQuery : true,
    isTouchDevice: mounted ? (isMobileQuery || isTabletQuery) : false,
  };
}
