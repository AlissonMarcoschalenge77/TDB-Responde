import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';
import Footer from './Footer';


//o layout serve para organizar e juntar todos os elementos e paginas do meu projeto
//outlet define o espaço vazio que sera preenchido no APP
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;