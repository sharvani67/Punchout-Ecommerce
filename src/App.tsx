import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
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
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <CartProvider> {/* 👈 WRAP WITH CART PROVIDER */}
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* ✅ PUBLIC ROUTES */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            {/* ✅ ADMIN ROUTES */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Login />} />
              
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
              
              <Route path="/forgot-password" element={<ChangePassword />} />
            </Route>

            {/* ✅ 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <WhatsAppFloat />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;