import Header from './Header';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}