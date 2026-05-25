
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Moon, Sun } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import logo from '@/assets/logo.jpeg';

// const navItems = [
//   { path: '/', label: 'Home' },
//   { path: '/products', label: 'Products' },
  
// ];

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dark, setDark] = useState(false);
//   const location = useLocation();

//   // Scroll effect
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // Dark mode toggle
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark);
//   }, [dark]);

//   // Auto close menu on route change
//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? 'backdrop-blur-xl bg-white/70 dark:bg-black/50 shadow-lg border-b border-white/20'
//           : 'bg-transparent'
//       }`}
//     >
//       {/* Gradient Border */}
//       <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500" />

//       <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">

//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="MV Branding"
//             className="h-20 w-auto object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
//           />
//         </Link>

//         {/* DESKTOP NAV (ONLY DESKTOP) */}
//         <nav className="hidden lg:flex items-center gap-2">
//           {navItems.map(item => {
//             const isActive =
//               item.path === '/projectpage'
//                 ? location.pathname.startsWith('/projectpage') ||
//                   location.pathname.startsWith('/viewdetailspage')
//                 : location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
//                   isActive
//                     ? 'text-white'
//                     : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
//                 }`}
//               >
//                 {isActive && (
//                   <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 -z-10 blur-sm opacity-80" />
//                 )}
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-3">
          
//           {/* MENU BUTTON (Mobile + iPad ONLY) */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden p-2"
//           >
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* OVERLAY */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* MOBILE + iPAD DRAWER */}
//       <div
//         className={`lg:hidden fixed top-20 right-0 h-[85vh] w-[70%] sm:w-1/2 transition-all duration-300 z-50 ${
//           mobileOpen ? 'translate-x-0' : 'translate-x-full'
//         } bg-white/95 dark:bg-black/90 backdrop-blur-xl shadow-2xl border-l border-gray-200 overflow-y-auto`}
//       >
//         <nav className="flex flex-col p-4 gap-2">
//           {navItems.map(item => {
//             const isActive =
//               item.path === '/projectpage'
//                 ? location.pathname.startsWith('/projectpage') ||
//                   location.pathname.startsWith('/viewdetailspage')
//                 : location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={`px-4 py-3 rounded-lg font-medium transition ${
//                   isActive
//                     ? 'bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </header>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mainlogo.png";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/collections", label: "Collections" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Scroll Effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />

      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={logo}
              alt="Brand Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

        
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white"
                    : "text-gray-700"
                }`}
              >
                <span className="relative flex items-center gap-2 z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* CART BUTTON */}
          <Link to="/cart">
            <Button className="relative rounded-full px-5 h-11 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-300/50">
              <span className="flex items-center gap-2 text-white font-semibold">
                <ShoppingCart className="w-5 h-5" />

                Cart

                {/* Cart Count */}
                <span className="flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-white text-black font-bold">
                  2
                </span>
              </span>
            </Button>
          </Link>

         

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed top-20 right-0 h-[85vh] w-[78%] sm:w-[55%] transition-all duration-500 z-50 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-gray-200 overflow-y-auto`}
      >
        {/* Mobile Header */}
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Menu
          </h2>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-col p-4 gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center justify-between px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-50 hover:bg-black hover:text-white"
                }`}
              >
                {item.label}

                <ChevronRight className="w-5 h-5" />
              </Link>
            );
          })}

          {/* MOBILE CART BUTTON */}
          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="mt-3"
          >
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-semibold shadow-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Go To Cart
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}