// src/components/layout/NavBar.tsx
// Atualizado: mostra link "Sistema" quando logado como voluntário,
// "Portal" quando beneficiário, e "Entrar" quando deslogado.

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isVoluntario } = useAuth();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-300 font-bold border-b-2 border-blue-300"
      : "hover:text-blue-300";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex gap-6 justify-center flex-wrap items-center">
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/sobre" className={isActive("/sobre")}>
              Sobre
            </Link>
          </li>
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/faq" className={isActive("/faq")}>
              FAQ
            </Link>
          </li>
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/contato" className={isActive("/contato")}>
              Contato
            </Link>
          </li>
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/integrantes" className={isActive("/integrantes")}>
              Integrantes
            </Link>
          </li>
          <li className="transition-transform duration-300 hover:scale-110">
            <Link to="/roadmap" className={isActive("/roadmap")}>
              Roadmap
            </Link>
          </li>

          <li className="transition-transform duration-300 hover:scale-110">
            <Link
              to="/quero-ser-voluntario"
              className={isActive("/quero-ser-voluntario")}
            >
              Seja Voluntário
            </Link>
          </li>

          {/* Separador visual */}
          <li className="text-gray-600 select-none">|</li>

          {/* Links condicionais por estado de autenticação */}
          {!user && (
            <li className="transition-transform duration-300 hover:scale-110">
              <Link
                to="/login"
                className={`${isActive("/login")} bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm font-semibold`}
              >
                Entrar
              </Link>
            </li>
          )}

          {user && isVoluntario && (
            <li className="transition-transform duration-300 hover:scale-110">
              <Link
                to="/admin"
                className={`${isActive("/admin")} bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm font-semibold`}
              >
                ⚙️ Sistema
              </Link>
            </li>
          )}

          {user && !isVoluntario && (
            <li className="transition-transform duration-300 hover:scale-110">
              <Link
                to="/portal"
                className={`${isActive("/portal")} bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm font-semibold`}
              >
                💙 Portal
              </Link>
            </li>
          )}

          {user && (
            <li className="transition-transform duration-300 hover:scale-110">
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
