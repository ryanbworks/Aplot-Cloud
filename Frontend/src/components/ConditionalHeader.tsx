'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Páginas onde o header NÃO deve aparecer
  const hideHeaderPaths = [
    '/dashboard',
    '/dashboard/suporte/ticket',
    '/dashboard/suporte/novo-ticket'
  ];
  
  // Verificar se a rota atual deve esconder o header
  const shouldHideHeader = hideHeaderPaths.some(path => pathname.startsWith(path));
  
  // Se deve esconder, não renderizar nada
  if (shouldHideHeader) {
    return null;
  }
  
  // Caso contrário, mostrar o header
  return <Header />;
}
