// src/context/AuthContext.tsx
// Exporta APENAS o AuthProvider (componente).
// AuthContext fica em authContextInstance.ts
// useAuth fica em useAuth.ts

import { useState, useEffect, type ReactNode } from 'react';
import type { AuthUser } from '../types/index';
import { AuthContext } from './authContextInstance';
import { loadTDBState } from './tdbStorage';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem('tdb_auth_user');
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('tdb_auth_user', JSON.stringify(user));
    else localStorage.removeItem('tdb_auth_user');
  }, [user]);

  const login = (usuario: string, senha: string): 'voluntario' | 'beneficiario' | 'erro' => {
    if (!usuario.trim() || !senha.trim()) return 'erro';

    const state = loadTDBState();

    const voluntario = state.voluntarios.find(
      v => v.usuario === usuario.trim() && v.senha === senha.trim()
    );

    if (voluntario) {
      setUser({
        id: voluntario.id,
        nome: voluntario.nome,
        tipo: 'voluntario',
        acessoSigilo: voluntario.acessoSigilo,
        especialidade: voluntario.especialidade,
      });
      return 'voluntario';
    }

    if (usuario.trim().length >= 3 && senha.trim().length >= 4) {
      setUser({
        id: 0,
        nome: usuario.trim(),
        tipo: 'beneficiario',
      });
      return 'beneficiario';
    }

    return 'erro';
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isVoluntario: user?.tipo === 'voluntario' }}>
      {children}
    </AuthContext.Provider>
  );
}