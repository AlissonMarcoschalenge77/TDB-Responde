import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  //função para ler URL atual
  const location = useLocation();
  
  //funçaõ para verificar o link se esta ativo ou não
  const isActive = (path: string) => {
      return location.pathname === path 
      ? 'text-blue-300 font-bold border-b-2 border-blue-300'  // Estilo ativo
      : 'hover:text-blue-300';  // Estilo normal
  };
  return (
    <>
       <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex gap-6 justify-center flex-wrap ">
          
          {/* Links para o Nav/Navegação */}
        <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          
          <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/sobre" className={isActive('/sobre')}>
              Sobre
            </Link>
          </li>
          
          <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/faq" className={isActive('/faq')}>
              FAQ
            </Link>
          </li>
          
          <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/contato" className={isActive('/contato')}>
              Contato
            </Link>
          </li>
          
          <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/integrantes" className={isActive('/integrantes')}>
              Integrantes
            </Link>
          </li>
          
          <li className='transition-transform duration-300 hover:scale-125'>
            <Link to="/roadmap" className={isActive('/roadmap')}>
              Roadmap
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
    </>
  )
}

export default NavBar