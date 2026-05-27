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
import CategoryTable from "./pages/CategoryTable";
import CategoryForm from "./pages/CategoryForm";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import EditCategory from "./pages/EditCategory";
import EditProduct from "./pages/EditProduct";
import SessionItems from "./pages/SessionItem";
import DynamicProductDetail from "./pages/DynamicProductDetails";
import DynamicProducts from "./pages/DynamicProducts";

import { CartProvider } from "./context/CartContext";
import Sessions from "./pages/Sessions";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />

            <Routes>
              {/* ✅ PUBLIC ROUTES */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dynamic-products" element={<DynamicProducts />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                 <Route path="/dynamic-product/:id" element={<DynamicProductDetail />} />
                <Route path="/cart" element={<Cart />} />
    
              </Route>

              {/* ✅ ADMIN ROUTES */}
              <Route element={<AdminLayout />}>
                {/* Login */}
                <Route path="/admin" element={<Login />} />

                {/* Products */}
                <Route
                  path="/admin/productstable"
                  element={
                    <ProtectedRoute>
                      <ProductTable />
                    </ProtectedRoute>
                  }
                />

                 <Route
                  path="/admin/sessions"
                  element={
                    <ProtectedRoute>
                      <Sessions />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/add-product"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />

                 <Route
                  path="/admin/session-details/:id"
                  element={
                    <ProtectedRoute>
                      <SessionItems />
                    </ProtectedRoute>
                  }
                />

                <Route
  path="/admin/edit-product/:id"
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>

                {/* Categories */}
                <Route
                  path="/admin/categories-table"
                  element={
                    <ProtectedRoute>
                      <CategoryTable />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/add-category-product"
                  element={
                    <ProtectedRoute>
                      <CategoryForm />
                    </ProtectedRoute>
                  }
                />
                <Route
  path="/admin/edit-category/:id"
  element={
    <ProtectedRoute>
      <EditCategory />
    </ProtectedRoute>
  }
/>

                {/* Forgot Password */}
                <Route
                  path="/forgot-password"
                  element={<ChangePassword />}
                />
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
};

export default App;