import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import VariantForm from "./pages/VariantForm";
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
import CheckoutDetails from "./pages/CheckoutDetails";
import EditVariant from "./pages/EditVariantForm";

// IMPORT THE NEW ProductDetails COMPONENT
import ProductDetails from "./pages/ProductDetails";
import PunchoutRoute from "./PunchoutRoute";
import Unauthorized from "./Unauthorized";
import SessionExpired from "./SessionExpired";
import Reports from "./pages/Dashboard";
import ProductColorVariants from "./pages/ProductColorVariants";
const queryClient = new QueryClient();


const App = () => {

  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionFromUrl = params.get("session");

    if (sessionFromUrl) {

      localStorage.setItem(
        "sessionId",
        sessionFromUrl
      );

      localStorage.removeItem(
        "sessionExpired"
      );

      window.history.replaceState(
        {},
        document.title,
        "/dynamic-products"
      );
    }

    // ✅ mark ready AFTER checking
    setSessionReady(true);
  }, []);

  // ⛔ STOP rendering until session handled
  if (!sessionReady) return null;

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
              {/* <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dynamic-products" element={<DynamicProducts />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/dynamic-product/:id" element={<DynamicProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Route> */}

              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/session-expired" element={<SessionExpired />} />

              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <PunchoutRoute>
                      <Home />
                    </PunchoutRoute>
                  }
                />


                <Route
                  path="/products"
                  element={
                    <PunchoutRoute>
                      <Products />
                    </PunchoutRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <PunchoutRoute>
                      <ProductDetail />
                    </PunchoutRoute>
                  }
                />
                <Route
                  path="/dynamic-product/:id"
                  element={
                    <PunchoutRoute>
                      <DynamicProductDetail />
                    </PunchoutRoute>
                  }
                />

                <Route
                  path="/dynamic-products"
                  element={
                    <PunchoutRoute>
                      <DynamicProducts />
                    </PunchoutRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <PunchoutRoute>
                      <Cart />
                    </PunchoutRoute>
                  }
                />
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
                  path="/admin/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/productvariants"
                  element={
                    <ProtectedRoute>
                      <ProductColorVariants />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/add-color-variants"
                  element={
                    <ProtectedRoute>
                      <VariantForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/edit-variant/:id"
                  element={
                    <ProtectedRoute>
                      <EditVariant />
                    </ProtectedRoute>
                  }
                />

                {/* ✅ PRODUCT DETAILS ROUTE - ADDED HERE */}
                <Route
                  path="/admin/product-details/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
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
                  path="/admin/checkout-details"
                  element={
                    <ProtectedRoute>
                      <CheckoutDetails />
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