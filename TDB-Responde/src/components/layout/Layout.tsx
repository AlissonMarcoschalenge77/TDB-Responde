import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';
import Footer from './Footer';

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