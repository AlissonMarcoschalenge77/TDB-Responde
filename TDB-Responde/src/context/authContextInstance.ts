// src/context/authContextInstance.ts
import { createContext } from 'react';
import type { AuthUser } from '../types/index';

export interface AuthContextType {
  user: AuthUser | null;
  login: (usuario: string, senha: string) => 'voluntario' | 'beneficiario' | 'erro';
  logout: () => void;
  isVoluntario: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);