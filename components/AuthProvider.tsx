// app/components/AuthProvider.tsx
'use client'; // 👈 ESSENCIAL!

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// O SessionProvider precisa ser um componente cliente
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// Nota: Você pode precisar adicionar a prop `session` se estiver usando uma abordagem
// mais complexa, mas para o uso básico, apenas envolver já resolve o erro de contexto.