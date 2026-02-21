import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Contato from './pages/Contato'
import Sobre from './pages/Sobre'
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import Integrantes from './pages/Integrantes';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout envolve todas as páginas */}
        <Route path="/" element={<Layout />}>
          
          {/* Página inicial - localhost:5173/ */}
          <Route index element={<Home />} />
          
          {/* Página Sobre - localhost:5173/sobre */}
          <Route path="sobre" element={<Sobre />} />
          
          {/* Página FAQ - localhost:5173/faq */}
          <Route path="faq" element={<FAQ />} />
          
          {/* Página Contato - localhost:5173/contato */}
          <Route path="contato" element={<Contato />} />
          
          {/* Página Integrantes - localhost:5173/integrantes */}
          <Route path="integrantes" element={<Integrantes />} />
          
          {/* Página Roadmap - localhost:5173/roadmap */}
          <Route path="roadmap" element={<Roadmap />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;