import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  //função para ler URL atual
  const location = useLocation();
  
  //funçaõ para verificar o link se esta ativo ou não
  const isActive = (path: String) => {
      return location.pathname === path 
      ? 'text-blue-300 font-bold border-b-2 border-blue-300'  // Estilo ativo
      : 'hover:text-blue-300';  // Estilo normal
  };
  return (
    <>
       <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex gap-6 justify-center flex-wrap">
          
        <li>
          <Link to="/" className={isActive('/')}>
            Home 
          </Link>
        </li>

        <li>
          <Link to="/Sobre" className={isActive('/Sobre')}>
            Sobre
          </Link>
        </li>
        
        <li>
          <Link to="/Contato" className={isActive('/Contato')}>
            Contato
          </Link>
        </li>
          
        </ul>
      </div>
    </nav>
    </>
  )
}

export default NavBar