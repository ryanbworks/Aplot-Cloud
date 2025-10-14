'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PageLoader } from '@/components/ui/PageLoader';

interface NavigationProgressContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const NavigationProgressContext = createContext<NavigationProgressContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useNavigationProgress = () => useContext(NavigationProgressContext);

function NavigationProgressContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Mostrar loading ao mudar de página
    setIsLoading(true);

    // Simular um delay mínimo para mostrar o loading (opcional)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms de loading mínimo

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <NavigationProgressContext.Provider value={{ isLoading, setIsLoading }}>
      <PageLoader isLoading={isLoading} />
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function NavigationProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoader isLoading={true} />}>
      <NavigationProgressContent>{children}</NavigationProgressContent>
    </Suspense>
  );
}

