import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo TDB Responde + Texto esquerda - CLICÁVEL */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity transition-transform duration-300 hover:scale-125">
          <img 
            src="/img/LogoTDB.png" 
            alt="Logo TDB" 
            className="h-20 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold leading-none">TDB Responde</h1>
            <p className="text-lg mt-1">Mais agilidade, mais acolhimento</p>
          </div>
        </Link>

        {/* Logo Turma do Bem direita */}
        <a 
          href="https://turmadobem.org.br/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity transition-transform duration-300 hover:scale-125"
        >
          <span className="text-xl">Em colaboração com:</span>
          <img 
            src="/img/turmadobem.png" 
            alt="Turma do Bem" 
            className="h-12 w-auto mb-4 transition-transform duration-300 hover:scale-125"
          />
        </a>

      </div>
    </header>
  );
}

export default Header;