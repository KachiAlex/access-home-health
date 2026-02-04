'use client';

import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/lib/firebase';
import { usePathname } from 'next/navigation';

export const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: pathname,
        page_title: document?.title,
      });
    }
  }, [pathname]);
};
