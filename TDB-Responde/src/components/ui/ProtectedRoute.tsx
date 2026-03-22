// src/components/ui/ProtectedRoute.tsx
// Redireciona para /login se não estiver logado.
// Se "requireVoluntario" for true, bloqueia beneficiários.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

interface Props {
  children: React.ReactNode;
  requireVoluntario?: boolean;
}

function ProtectedRoute({ children, requireVoluntario = false }: Props) {
  const { user, isVoluntario } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (requireVoluntario && !isVoluntario) return <Navigate to="/portal" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;