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

          {/* navegação entre paginas usando o Route biblioteca */}

          <Route index element={<Home />} />
          
         
          <Route path="sobre" element={<Sobre />} />
          
         
          <Route path="faq" element={<FAQ />} />
          
          
          <Route path="contato" element={<Contato />} />
          
         
          <Route path="integrantes" element={<Integrantes />} />
          
          
          <Route path="roadmap" element={<Roadmap />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;