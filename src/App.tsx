// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Index from "./pages/Index";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Values from "./pages/Values";
// import Brand from "./pages/Brand";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import Blog from "./pages/Blog";
// import WhyUs from "./pages/WhyUs";


// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/values" element={<Values />} />
//             <Route path="/brand" element={<Brand />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/whyus" element={<WhyUs />} />
      
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </Layout>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;





import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout"; // 👈 NEW
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import WhatsAppFloat from "./WhatsAppFloat";
import Login from "./pages/Login";
import ChangePassword from "./pages/ForgotPassword";
import ProtectedRoute from "./test/ProtectedRoute";
import ProductTable from "./pages/ProductTable";
import ProductForm from "./pages/ProductsForm";
import Home from "./pages/Home";
import Products from "./pages/Products";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />

        <Routes>

          {/* ✅ PUBLIC ROUTES */}
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
           <Route path="/products" element={<Products />} />
          </Route>

          {/* ✅ ADMIN ROUTES */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Login />} />
            
            {/* Admin Blog Management - Protected */}
            




           

            
            {/* Contacts Management - Protected */}
            <Route
              path="/admin/productstable"
              element={
                <ProtectedRoute>
                  <ProductTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <ProductForm/>
                </ProtectedRoute>
              }
            />
            
            {/* Forgot Password */}
            <Route path="/forgot-password" element={<ChangePassword />} />
          </Route>

          {/* ✅ 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        <WhatsAppFloat />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;