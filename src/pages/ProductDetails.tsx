// // src/pages/ProductDetails.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminNavbar from "@/components/AdminNavbar";
// import BASE_URL from "@/Config/Api";
// import { 
//   ArrowLeft, 
//   Edit, 
//   FileText, 
//   Download, 
//   Package, 
//   Tag, 
//   Layers, 
//   Scale, 
//   Palette, 
//   Shield, 
//   CurlyBraces, 
//   FileSearch,
//   ShoppingBag,
//   Truck,
//   Clock,
//   Star,
//   Heart,
//   Share2,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";

// interface Product {
//   id: number;
//   product_name: string;
//   product_code: string;
//   category_name: string;
//   product_brand: string;
//   product_images?: string;
//   product_details_pdf?: string;
//   price: string;
//   available_stock: string;
//   weight: string;
//   color: string;
//   discount: string;
//   warranty: string;
//   dimensions?: string;
//   specifications?: string;
//   product_description?: string;
// }

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState<string>("");
//   const [selectedTab, setSelectedTab] = useState<"details" | "specifications" | "description">("details");

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BASE_URL}/api/products/${id}`);
//       setProduct(response.data);
      
//       const images = response.data.product_images?.split(",");
//       if (images && images.length > 0) {
//         setMainImage(`${BASE_URL}/uploads/products/${images[0].trim()}`);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       alert("Failed to fetch product details");
//       navigate("/admin/productstable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageList = () => {
//     if (!product?.product_images) return [];
//     return product.product_images.split(",").map(img => `${BASE_URL}/uploads/products/${img.trim()}`);
//   };

//   const getDiscountedPrice = () => {
//     if (!product) return 0;
//     const discountPercent = parseFloat(product.discount) || 0;
//     const originalPrice = parseFloat(product.price);
//     return originalPrice - (originalPrice * discountPercent / 100);
//   };

//   if (loading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//           <div className="pt-32 px-4 lg:px-8 pb-10 flex justify-center items-center">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Package className="h-6 w-6 text-pink-500 animate-pulse" />
//                 </div>
//               </div>
//               <p className="mt-4 text-gray-600 font-medium">Loading product details...</p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//           <div className="pt-32 px-4 lg:px-8 pb-10">
//             <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
//               <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//               <p className="text-gray-600 text-lg font-medium">Product not found</p>
//               <button
//                 onClick={() => navigate("/admin/productstable")}
//                 className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
//               >
//                 Back to Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const images = getImageList();
//   const discountedPrice = getDiscountedPrice();
//   const hasDiscount = parseFloat(product.discount) > 0;
//   const isLowStock = parseInt(product.available_stock) < 10 && parseInt(product.available_stock) > 0;
//   const isOutOfStock = parseInt(product.available_stock) === 0;

//   return (
//     <>
//       <AdminNavbar />
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="pt-24 px-4 lg:px-8 pb-10">
//           {/* Breadcrumb */}
//           <div className="mb-6">
//             <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//               <button onClick={() => navigate("/admin/productstable")} className="hover:text-gray-700 transition">
//                 Products
//               </button>
//               <span>›</span>
//               <span className="text-gray-900 font-medium">{product.product_name}</span>
//             </div>
            
//             <button
//               onClick={() => navigate("/admin/productstable")}
//               className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
//             >
//               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//               <span>Back to Products</span>
//             </button>
//           </div>

//           {/* Main Content */}
//           <div className="max-w-7xl mx-auto">
//             {/* Product Header */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
//                 {/* Left Column - Images */}
//                 <div>
//                   {/* Main Image */}
//                   <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-4 border-2 border-gray-100">
//                     {mainImage ? (
//                       <img
//                         src={mainImage}
//                         alt={product.product_name}
//                         className="w-full h-96 object-contain p-4 hover:scale-105 transition-transform duration-500"
//                       />
//                     ) : (
//                       <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-100">
//                         <Package className="h-16 w-16 text-gray-400 mb-2" />
//                         <span className="text-gray-400">No Image Available</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Thumbnail Images */}
//                   {images.length > 0 && (
//                     <div className="flex gap-3 overflow-x-auto pb-2">
//                       {images.map((img, index) => (
//                         <div
//                           key={index}
//                           className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
//                             mainImage === img 
//                               ? "border-pink-500 shadow-lg scale-105" 
//                               : "border-gray-200 hover:border-gray-400 hover:scale-105"
//                           }`}
//                           onClick={() => setMainImage(img)}
//                         >
//                           <img
//                             src={img}
//                             alt={`${product.product_name} - ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* PDF Download */}
//                   {product.product_details_pdf && (
//                     <div className="mt-6">
//                       <a
//                         href={`${BASE_URL}/uploads/pdfs/${product.product_details_pdf}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 group"
//                       >
//                         <FileText size={18} className="group-hover:scale-110 transition-transform" />
//                         <span>View Product PDF</span>
//                         <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
//                       </a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right Column - Product Information */}
//                 <div>
//                   {/* Stock Status Badge */}
//                   <div className="mb-4">
//                     {isOutOfStock ? (
//                       <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
//                         <AlertCircle size={14} />
//                         Out of Stock
//                       </span>
//                     ) : isLowStock ? (
//                       <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
//                         <AlertCircle size={14} />
//                         Low Stock: {product.available_stock} units left
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
//                         <CheckCircle size={14} />
//                         In Stock: {product.available_stock} units
//                       </span>
//                     )}
//                   </div>

//                   <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h1>
//                   <p className="text-gray-500 mb-4 flex items-center gap-2">
//                     <Tag size={14} />
//                     Product Code: {product.product_code}
//                   </p>

//                   {/* Rating Placeholder */}
//                   <div className="flex items-center gap-2 mb-6">
//                     <div className="flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-500">(5 customer reviews)</span>
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
//                     {hasDiscount ? (
//                       <>
//                         <div className="flex items-baseline gap-3 flex-wrap">
//                           <span className="text-4xl font-bold text-green-600">
//                             ₹{discountedPrice.toFixed(2)}
//                           </span>
//                           <span className="text-gray-400 line-through text-xl">
//                             ₹{parseFloat(product.price).toFixed(2)}
//                           </span>
//                           <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                             {product.discount}% OFF
//                           </span>
//                         </div>
//                         <p className="text-sm text-green-600 mt-2">
//                           You save: ₹{(parseFloat(product.price) - discountedPrice).toFixed(2)}
//                         </p>
//                       </>
//                     ) : (
//                       <span className="text-4xl font-bold text-green-600">
//                         ₹{parseFloat(product.price).toFixed(2)}
//                       </span>
//                     )}
//                   </div>

//                   {/* Key Info Grid */}
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <Layers className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Category</p>
//                         <p className="font-medium text-gray-900">{product.category_name}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <ShoppingBag className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Brand</p>
//                         <p className="font-medium text-gray-900">{product.product_brand || "N/A"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <Scale className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Weight</p>
//                         <p className="font-medium text-gray-900">{product.weight || "N/A"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <Palette className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Color</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           {product.color && (
//                             <span
//                               className="w-4 h-4 rounded-full border border-gray-300"
//                               style={{ backgroundColor: product.color.toLowerCase() }}
//                             ></span>
//                           )}
//                           <p className="font-medium text-gray-900">{product.color || "N/A"}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <Shield className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Warranty</p>
//                         <p className="font-medium text-gray-900">{product.warranty || "N/A"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
//                       <Truck className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-gray-500">Shipping</p>
//                         <p className="font-medium text-gray-900">Free Delivery</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => navigate(`/admin/edit-product/${product.id}`)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 group"
//                     >
//                       <Edit size={18} className="group-hover:rotate-12 transition-transform" />
//                       Edit Product
//                     </button>
//                     <button
//                       onClick={() => navigate("/admin/productstable")}
//                       className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300"
//                     >
//                       <ArrowLeft size={18} />
//                       Back to List
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               {/* Tab Headers */}
//               <div className="flex border-b">
//                 <button
//                   onClick={() => setSelectedTab("details")}
//                   className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
//                     selectedTab === "details"
//                       ? "text-pink-600 border-b-2 border-pink-600 bg-gradient-to-r from-pink-50 to-orange-50"
//                       : "text-gray-600 hover:text-pink-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <CurlyBraces size={18} />
//                   Additional Details
//                 </button>
                
//                 {product.specifications && (
//                   <button
//                     onClick={() => setSelectedTab("specifications")}
//                     className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
//                       selectedTab === "specifications"
//                         ? "text-pink-600 border-b-2 border-pink-600 bg-gradient-to-r from-pink-50 to-orange-50"
//                         : "text-gray-600 hover:text-pink-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     <FileSearch size={18} />
//                     Specifications
//                   </button>
//                 )}
                
//                 {product.product_description && (
//                   <button
//                     onClick={() => setSelectedTab("description")}
//                     className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
//                       selectedTab === "description"
//                         ? "text-pink-600 border-b-2 border-pink-600 bg-gradient-to-r from-pink-50 to-orange-50"
//                         : "text-gray-600 hover:text-pink-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     <FileText size={18} />
//                     Description
//                   </button>
//                 )}
//               </div>

//               {/* Tab Content */}
//               <div className="p-6 lg:p-8">
//                 {selectedTab === "details" && (
//                   <div className="space-y-6">
//                     {product.dimensions && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                           <CurlyBraces size={18} className="text-pink-500" />
//                           Dimensions
//                         </h3>
//                         <div className="bg-gray-50 rounded-xl p-4">
//                           <p className="text-gray-700 whitespace-pre-wrap">{product.dimensions}</p>
//                         </div>
//                       </div>
//                     )}
                    
//                     {!product.dimensions && !product.specifications && !product.product_description && (
//                       <div className="text-center py-12">
//                         <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                         <p className="text-gray-500">No additional details available</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {selectedTab === "specifications" && product.specifications && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                       <FileSearch size={18} className="text-pink-500" />
//                       Technical Specifications
//                     </h3>
//                     <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
//                       <div className="prose max-w-none">
//                         <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
//                           {product.specifications}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {selectedTab === "description" && product.product_description && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                       <FileText size={18} className="text-pink-500" />
//                       Product Description
//                     </h3>
//                     <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
//                       <div className="prose max-w-none">
//                         <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
//                           {product.product_description}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

          
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



// src/pages/ProductDetails.tsx (Updated with category fetch fallback)
// src/pages/ProductDetails.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminNavbar from "@/components/AdminNavbar";
// import BASE_URL from "@/Config/Api";
// import { 
//   ArrowLeft, 
//   Edit, 
//   FileText, 
//   Download, 
//   Package, 
//   Layers, 
//   Scale, 
//   Palette, 
//   Shield, 
//   FileSearch,
//   ShoppingBag,
//   Truck,
//   Clock,
//   Star,
//   Heart,
//   CheckCircle,
//   AlertCircle,
//   Ruler,
//   Hash,
//   Info,
//   Calendar,
//   Percent,
//   Box,
//   ShoppingCart,
//   Code,
//   Weight,
//   Brush,
//   Award
// } from "lucide-react";

// interface Product {
//   id: number;
//   product_name: string;
//   product_code: string;
//   category_name?: string;
//   product_category_id?: string;
//   product_brand: string;
//   product_images?: string;
//   product_details_pdf?: string;
//   price: string;
//   available_stock: string;
//   weight: string;
//   color: string;
//   discount: string;
//   warranty: string;
//   dimensions?: string;
//   specifications?: string;
//   product_description?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface Category {
//   id: number;
//   category_name: string;
// }

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState<string>("");
//   const [selectedTab, setSelectedTab] = useState<"details" | "specifications" | "description">("details");
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     fetchProductDetails();
//     fetchCategories();
//   }, [id]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/categories`);
//       setCategories(res.data);
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     }
//   };

//   const fetchProductDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BASE_URL}/api/products/${id}`);
//       console.log("Product data:", response.data);
//       setProduct(response.data);
      
//       const images = response.data.product_images?.split(",");
//       if (images && images.length > 0) {
//         setMainImage(`${BASE_URL}/uploads/products/${images[0].trim()}`);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       alert("Failed to fetch product details");
//       navigate("/admin/productstable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageList = () => {
//     if (!product?.product_images) return [];
//     return product.product_images.split(",").map(img => `${BASE_URL}/uploads/products/${img.trim()}`);
//   };

//   // Get category name - first try from product, then from categories list
//   const getCategoryName = () => {
//     if (product?.category_name) {
//       return product.category_name;
//     }
//     if (product?.product_category_id && categories.length > 0) {
//       const category = categories.find(c => c.id === parseInt(product.product_category_id!));
//       if (category) {
//         return category.category_name;
//       }
//     }
//     return "—";
//   };

//   // Parse specifications into structured table format
//   const parseSpecificationsToTable = (specText: string) => {
//     if (!specText) return [];
    
//     const lines = specText.split('\n');
//     const tableRows: { label: string; value: string }[] = [];
    
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();
//       if (!line) continue;
      
//       if (line.includes(':')) {
//         const colonIndex = line.indexOf(':');
//         const label = line.substring(0, colonIndex).trim();
//         let value = line.substring(colonIndex + 1).trim();
        
//         if (value.includes('•')) {
//           value = value.split('•').join('\n•');
//         }
        
//         tableRows.push({ label, value });
//       } else if (tableRows.length > 0 && !line.includes(':')) {
//         const lastRow = tableRows[tableRows.length - 1];
//         lastRow.value += '\n' + line;
//       }
//     }
    
//     return tableRows;
//   };

//   const renderSpecificationsTable = () => {
//     if (!product?.specifications) return null;
    
//     const rows = parseSpecificationsToTable(product.specifications);
    
//     if (rows.length === 0) {
//       return (
//         <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
//           {product.specifications}
//         </div>
//       );
//     }
    
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <tbody className="divide-y divide-gray-100">
//             {rows.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50 w-1/3">
//                   {row.label}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600 whitespace-pre-wrap">
//                   {row.value.split('\n').map((line, lineIdx) => (
//                     <span key={lineIdx}>
//                       {line.startsWith('•') ? (
//                         <span className="flex items-start gap-2 mt-1">
//                           <span className="text-pink-500">•</span>
//                           <span>{line.substring(1).trim()}</span>
//                         </span>
//                       ) : line.match(/^\d+\./) ? (
//                         <span className="block mt-1">{line}</span>
//                       ) : (
//                         <span>{line}</span>
//                       )}
//                       {lineIdx < row.value.split('\n').length - 1 && <br />}
//                     </span>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="min-h-screen bg-gray-50">
//           <div className="pt-32 px-4 lg:px-8 pb-10 flex justify-center items-center">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
//               </div>
//               <p className="mt-4 text-gray-500">Loading product details...</p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="min-h-screen bg-gray-50">
//           <div className="pt-32 px-4 lg:px-8 pb-10">
//             <div className="text-center bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
//               <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
//               <p className="text-gray-600">Product not found</p>
//               <button
//                 onClick={() => navigate("/admin/productstable")}
//                 className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
//               >
//                 Back to Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const images = getImageList();
//   const hasDiscount = parseFloat(product.discount) > 0;
//   const isLowStock = parseInt(product.available_stock) < 10 && parseInt(product.available_stock) > 0;
//   const isOutOfStock = parseInt(product.available_stock) === 0;
//   const categoryName = getCategoryName();

//   return (
//     <>
//       <AdminNavbar />
//       <div className="min-h-screen bg-gray-50">
//         <div className="pt-20 px-4 lg:px-8 pb-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div>
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                     <button onClick={() => navigate("/admin/productstable")} className="hover:text-pink-600 transition">
//                       Products
//                     </button>
//                     <span>/</span>
//                     <span className="text-gray-900 font-medium">{product.product_name}</span>
//                   </div>
//                   <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => navigate(`/admin/edit-product/${product.id}`)}
//                     className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                   >
//                     <Edit size={16} />
//                     Edit Product
//                   </button>
//                   <button
//                     onClick={() => navigate("/admin/productstable")}
//                     className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//                   >
//                     <ArrowLeft size={16} />
//                     Back
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Product Main Info Card */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
//                 {/* Left - Images */}
//                 <div>
//                   <div className="bg-gray-50 rounded-lg overflow-hidden mb-3">
//                     {mainImage ? (
//                       <img
//                         src={mainImage}
//                         alt={product.product_name}
//                         className="w-full h-80 object-contain"
//                       />
//                     ) : (
//                       <div className="w-full h-80 flex flex-col items-center justify-center bg-gray-100">
//                         <Package className="h-12 w-12 text-gray-400" />
//                         <span className="text-gray-400 text-sm mt-2">No Image</span>
//                       </div>
//                     )}
//                   </div>
//                   {images.length > 1 && (
//                     <div className="flex gap-2 overflow-x-auto">
//                       {images.map((img, index) => (
//                         <div
//                           key={index}
//                           className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
//                             mainImage === img ? "border-pink-500" : "border-gray-200 hover:border-gray-400"
//                           }`}
//                           onClick={() => setMainImage(img)}
//                         >
//                           <img src={img} alt="" className="w-full h-full object-cover" />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {product.product_details_pdf && (
//                     <div className="mt-4">
//                       <a
//                         href={`${BASE_URL}/uploads/pdfs/${product.product_details_pdf}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
//                       >
//                         <FileText size={16} />
//                         View Product PDF
//                         <Download size={14} />
//                       </a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right - Basic Info */}
//                 <div>
//                   {/* Stock Status */}
//                   <div className="mb-3">
//                     {isOutOfStock ? (
//                       <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                         <AlertCircle size={12} />
//                         Out of Stock
//                       </span>
//                     ) : isLowStock ? (
//                       <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                         <AlertCircle size={12} />
//                         Low Stock: {product.available_stock}
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                         <CheckCircle size={12} />
//                         In Stock: {product.available_stock}
//                       </span>
//                     )}
//                   </div>

//                   <h2 className="text-xl font-bold text-gray-900 mb-1">{product.product_name}</h2>
//                   <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
//                     <Code size={12} />
//                     Code: {product.product_code}
//                   </p>

//                   {/* Price */}
//                   <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
//                     {hasDiscount ? (
//                       <div>
//                         <div className="flex items-baseline gap-2 flex-wrap">
//                           <span className="text-3xl font-bold text-green-600">
//                             ₹{(parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discount) / 100)).toFixed(2)}
//                           </span>
//                           <span className="text-gray-400 line-through text-sm">
//                             ₹{parseFloat(product.price).toFixed(2)}
//                           </span>
//                           <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
//                             {product.discount}% OFF
//                           </span>
//                         </div>
//                         <p className="text-xs text-green-600 mt-1">
//                           Save: ₹{(parseFloat(product.price) * parseFloat(product.discount) / 100).toFixed(2)}
//                         </p>
//                       </div>
//                     ) : (
//                       <span className="text-3xl font-bold text-gray-900">
//                         ₹{parseFloat(product.price).toFixed(2)}
//                       </span>
//                     )}
//                   </div>

//                   {/* Quick Info Grid */}
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Layers size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Category:</span>
//                       <span className="text-gray-900 font-medium">{categoryName}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <ShoppingBag size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Brand:</span>
//                       <span className="text-gray-900 font-medium">{product.product_brand || "—"}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Weight size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Weight:</span>
//                       <span className="text-gray-900">{product.weight || "—"}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Brush size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Color:</span>
//                       <div className="flex items-center gap-1">
//                         {product.color && product.color !== "—" && (
//                           <span
//                             className="w-3 h-3 rounded-full border"
//                             style={{ backgroundColor: product.color.toLowerCase() }}
//                           />
//                         )}
//                         <span className="text-gray-900">{product.color || "—"}</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Award size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Warranty:</span>
//                       <span className="text-gray-900">{product.warranty || "—"}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Percent size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Discount:</span>
//                       <span className="text-gray-900">{product.discount || "0"}%</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <Truck size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Shipping:</span>
//                       <span className="text-green-600">Free Delivery</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
//                       <ShoppingCart size={14} className="text-pink-500" />
//                       <span className="text-gray-500">Stock:</span>
//                       <span className="text-gray-900">{product.available_stock} units</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="flex border-b overflow-x-auto">
//                 <button
//                   onClick={() => setSelectedTab("details")}
//                   className={`px-5 py-3 text-sm font-medium transition whitespace-nowrap ${
//                     selectedTab === "details"
//                       ? "text-pink-600 border-b-2 border-pink-600"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <Info size={14} />
//                     Additional Details
//                   </div>
//                 </button>
//                 {product.specifications && (
//                   <button
//                     onClick={() => setSelectedTab("specifications")}
//                     className={`px-5 py-3 text-sm font-medium transition whitespace-nowrap ${
//                       selectedTab === "specifications"
//                         ? "text-pink-600 border-b-2 border-pink-600"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <FileSearch size={14} />
//                       Specifications
//                     </div>
//                   </button>
//                 )}
//                 {product.product_description && (
//                   <button
//                     onClick={() => setSelectedTab("description")}
//                     className={`px-5 py-3 text-sm font-medium transition whitespace-nowrap ${
//                       selectedTab === "description"
//                         ? "text-pink-600 border-b-2 border-pink-600"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <FileText size={14} />
//                       Description
//                     </div>
//                   </button>
//                 )}
//               </div>

//               <div className="p-5">
//                 {selectedTab === "details" && (
//                   <div className="space-y-4">
//                     {product.dimensions && (
//                       <div>
//                         <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
//                           <Ruler size={16} className="text-pink-500" />
//                           Dimensions
//                         </h3>
//                         <div className="bg-gray-50 rounded-lg p-4">
//                           <p className="text-gray-700 text-sm whitespace-pre-wrap">{product.dimensions}</p>
//                         </div>
//                       </div>
//                     )}
                    
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                         <Box size={16} className="text-pink-500" />
//                         Complete Product Information
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Category</p>
//                           <p className="text-gray-900 font-medium">{categoryName}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Brand</p>
//                           <p className="text-gray-900 font-medium">{product.product_brand || "—"}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Product Code</p>
//                           <p className="text-gray-900 font-medium">{product.product_code}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Weight</p>
//                           <p className="text-gray-900 font-medium">{product.weight || "—"}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Color</p>
//                           <div className="flex items-center gap-2">
//                             {product.color && product.color !== "—" && (
//                               <span
//                                 className="w-4 h-4 rounded-full border"
//                                 style={{ backgroundColor: product.color.toLowerCase() }}
//                               />
//                             )}
//                             <span className="text-gray-900 font-medium">{product.color || "—"}</span>
//                           </div>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Warranty</p>
//                           <p className="text-gray-900 font-medium">{product.warranty || "—"}</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Discount</p>
//                           <p className="text-green-600 font-medium">{product.discount || "0"}%</p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Available Stock</p>
//                           <p className={`font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
//                             {product.available_stock} units
//                           </p>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <p className="text-xs text-gray-500 mb-1">Original Price</p>
//                           <p className="text-gray-900 font-medium">₹{parseFloat(product.price).toFixed(2)}</p>
//                         </div>
//                         {hasDiscount && (
//                           <div className="bg-gray-50 rounded-lg p-3">
//                             <p className="text-xs text-gray-500 mb-1">Discounted Price</p>
//                             <p className="text-green-600 font-medium">
//                               ₹{(parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discount) / 100)).toFixed(2)}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {selectedTab === "specifications" && product.specifications && (
//                   renderSpecificationsTable()
//                 )}

//                 {selectedTab === "description" && product.product_description && (
//                   <div>
//                     <div className="whitespace-pre-wrap text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
//                       {product.product_description}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Product Meta Info */}
//             <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
//               <div className="flex flex-wrap gap-4 text-xs text-gray-400">
//                 {product.id && (
//                   <div className="flex items-center gap-1">
//                     <Hash size={12} />
//                     <span>Product ID: {product.id}</span>
//                   </div>
//                 )}
//                 {product.created_at && (
//                   <div className="flex items-center gap-1">
//                     <Calendar size={12} />
//                     <span>Created: {new Date(product.created_at).toLocaleDateString()}</span>
//                   </div>
//                 )}
//                 {product.updated_at && (
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} />
//                     <span>Last Updated: {new Date(product.updated_at).toLocaleDateString()}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





// src/pages/ProductDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import BASE_URL from "@/Config/Api";
import {
  ArrowLeft, Edit, FileText, Download, Package, Layers, Shield,
  FileSearch, ShoppingBag, Truck, Clock, CheckCircle, AlertCircle,
  Ruler, Hash, Info, Calendar, Percent, Box, ShoppingCart, Code,
  Award, Palette, Weight, Brush,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductVariant {
  id: number;
  product_id: number;
  color_name: string;       // API field
  color_hex: string;        // API field e.g. "#000000"
  price: string;            // variant-specific price
  stock: number;            // variant-specific stock (number, not string)
  image_url: string;        // primary image path (relative, prepend BASE_URL)
  images: string[];         // array of relative image paths
  // discount is on the product, not the variant – we'll pass it down
}

interface Product {
  id: number;
  product_name: string;
  product_code: string;
  category_name?: string;
  product_category_id?: string | number;
  product_brand: string;
  product_images?: string;
  product_details_pdf?: string;
  price: string;
  available_stock?: string | null;   // may be null – use variant.stock instead
  dimensions?: string;
  specifications?: string;
  weight?: string;
  color?: string | null;             // may be null – use variant.color_name instead
  discount: string;
  product_description?: string;
  warranty?: string;
  created_at?: string;
  updated_at?: string;
  variants?: ProductVariant[];
}

interface Category {
  id: number;
  category_name: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Discounted price. Discount is on the product level. */
function calcDiscountedPrice(price: string, discount: string): number {
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  if (d <= 0 || d >= 100) return p;
  return p - (p * d) / 100;
}

function hasDiscount(discount: string): boolean {
  const d = parseFloat(discount);
  return isFinite(d) && d > 0;
}

/** Variant images are relative paths – prepend BASE_URL */
function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // path is like "/uploads/products/filename.jpg"
  return `${BASE_URL}${path}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<"details" | "specifications" | "description">("details");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (e) {
      console.log("Error fetching categories:", e);
    }
  };

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/products/products-with-variants/${id}/`
      );
      const data: Product = response.data;
      setProduct(data);

      // Select first variant by default
      if (data.variants && data.variants.length > 0) {
        const first = data.variants[0];
        setSelectedVariant(first);
        // Use first image from the variant's images array
        if (first.images && first.images.length > 0) {
          setMainImage(resolveImageUrl(first.images[0]));
        } else if (first.image_url) {
          setMainImage(resolveImageUrl(first.image_url));
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      try {
        const fallback = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(fallback.data);
      } catch {
        alert("Failed to fetch product details");
        navigate("/admin/productstable");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.images && variant.images.length > 0) {
      setMainImage(resolveImageUrl(variant.images[0]));
    } else if (variant.image_url) {
      setMainImage(resolveImageUrl(variant.image_url));
    }
  };

  const getCategoryName = () => {
    if (product?.category_name) return product.category_name;
    if (product?.product_category_id && categories.length > 0) {
      const cat = categories.find(
        (c) => c.id === parseInt(String(product.product_category_id))
      );
      if (cat) return cat.category_name;
    }
    return "—";
  };

  // ── Active values come from selected variant + product ────────────────────
  // Price: from variant  |  Discount: from product  |  Stock: from variant
  const activePrice    = selectedVariant?.price ?? product?.price ?? "0";
  const activeDiscount = product?.discount ?? "0";   // discount is product-level
  const activeStock    = selectedVariant !== null ? selectedVariant.stock : null;
  const activeColor    = selectedVariant?.color_name ?? "—";
  const activeColorHex = selectedVariant?.color_hex ?? "";

  const discounted   = hasDiscount(activeDiscount);
  const finalPrice   = calcDiscountedPrice(activePrice, activeDiscount);
  const savedAmount  = parseFloat(activePrice) - finalPrice;

  const isOutOfStock = activeStock !== null && activeStock === 0;
  const isLowStock   = activeStock !== null && activeStock > 0 && activeStock < 10;

  // Active image list from selected variant
  const activeImages: string[] = selectedVariant?.images?.map(resolveImageUrl) ?? [];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto" />
            <p className="mt-4 text-gray-500">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <AdminNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <p className="text-gray-600">Product not found</p>
            <button
              onClick={() => navigate("/admin/productstable")}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </>
    );
  }

  const categoryName = getCategoryName();
  const variants = product.variants ?? [];

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 px-4 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">

            {/* ── Header ── */}
            <div className="mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <button
                      onClick={() => navigate("/admin/productstable")}
                      className="hover:text-pink-600 transition"
                    >
                      Products
                    </button>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.product_name}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <Edit size={16} />
                    Edit Product
                  </button>
                  <button
                    onClick={() => navigate("/admin/productstable")}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                </div>
              </div>
            </div>

            {/* ── Main Card ── */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* LEFT – Images */}
                <div className="p-6 border-r border-gray-100">
                  {/* Main image */}
                  <div
                    className="bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center"
                    style={{ minHeight: 320 }}
                  >
                    {mainImage ? (
                      <img
                        key={mainImage}
                        src={mainImage}
                        alt={product.product_name}
                        className="w-full h-80 object-contain transition-all duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-80">
                        <Package className="h-12 w-12 text-gray-300" />
                        <span className="text-gray-400 text-sm mt-2">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail strip */}
                  {activeImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {activeImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMainImage(img)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                            mainImage === img
                              ? "border-pink-500 ring-1 ring-pink-300"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* PDF link */}
                  {product.product_details_pdf && (
                    <div className="mt-4">
                      <a
                        href={`${BASE_URL}/uploads/pdfs/${product.product_details_pdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <FileText size={15} />
                        View Product PDF
                        <Download size={13} />
                      </a>
                    </div>
                  )}
                </div>

                {/* RIGHT – Info */}
                <div className="p-6 flex flex-col gap-5">

                  {/* Stock badge – from variant */}
                  <div>
                    {activeStock === null ? (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <AlertCircle size={12} /> Select a variant
                      </span>
                    ) : isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <AlertCircle size={12} /> Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <AlertCircle size={12} /> Low Stock: {activeStock} left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} /> In Stock: {activeStock} units
                      </span>
                    )}
                  </div>

                  {/* Name & code */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">{product.product_name}</h2>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <Code size={11} /> Code: {product.product_code}
                    </p>
                  </div>

                  {/* Price block – variant price + product discount */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
                    {discounted ? (
                      <>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl font-extrabold text-green-600">
                            ₹{finalPrice.toFixed(2)}
                          </span>
                          <span className="text-gray-400 line-through text-base">
                            ₹{parseFloat(activePrice).toFixed(2)}
                          </span>
                          <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                            {parseFloat(activeDiscount).toFixed(0)}% OFF
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1 font-medium">
                          You save: ₹{savedAmount.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold text-gray-900">
                        ₹{parseFloat(activePrice).toFixed(2)}
                      </span>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                  </div>

                  {/* ── Color Variants ── */}
                  {variants.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <Palette size={14} className="text-pink-500" />
                        Colour:{" "}
                        <span className="font-bold text-gray-900">{activeColor}</span>
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {variants.map((variant) => {
                          const vPrice = parseFloat(variant.price);
                          // Discount is product-level, applied to variant price
                          const vFinal = calcDiscountedPrice(variant.price, activeDiscount);
                          const vHasDiscount = hasDiscount(activeDiscount);
                          // Thumbnail: first image in array, or image_url
                          const vThumb = variant.images?.length
                            ? resolveImageUrl(variant.images[0])
                            : variant.image_url
                            ? resolveImageUrl(variant.image_url)
                            : "";
                          const isActive = selectedVariant?.id === variant.id;
                          const vOutOfStock = variant.stock === 0;

                          return (
                            <button
                              key={variant.id}
                              onClick={() => handleVariantSelect(variant)}
                              className={`relative flex flex-col items-center rounded-xl border-2 p-2 w-24 transition-all duration-200 ${
                                isActive
                                  ? "border-blue-500 shadow-md bg-blue-50"
                                  : vOutOfStock
                                  ? "border-gray-200 opacity-60 bg-gray-50"
                                  : "border-gray-200 hover:border-gray-400 bg-white"
                              }`}
                            >
                              {/* Image or color swatch */}
                              <div className="w-14 h-14 rounded-lg overflow-hidden mb-1 bg-gray-100 flex items-center justify-center">
                                {vThumb ? (
                                  <img
                                    src={vThumb}
                                    alt={variant.color_name}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <span
                                    className="w-8 h-8 rounded-full border border-gray-300 block"
                                    style={{ backgroundColor: variant.color_hex || "#ccc" }}
                                  />
                                )}
                              </div>

                              {/* Color name */}
                              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                                {variant.color_name}
                              </span>

                              {/* Final price */}
                              <span className="text-xs font-bold text-gray-900 mt-0.5">
                                ₹{vFinal.toFixed(0)}
                              </span>

                              {/* Strikethrough original price if discounted */}
                              {vHasDiscount && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ₹{vPrice.toFixed(0)}
                                </span>
                              )}

                              {/* Out of stock label */}
                              {vOutOfStock && (
                                <span className="text-[9px] text-red-500 font-semibold mt-0.5">
                                  Out of stock
                                </span>
                              )}

                              {/* Active checkmark */}
                              {isActive && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle size={10} className="text-white" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Quick info grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: <Layers size={13} className="text-pink-500" />, label: "Category", value: categoryName },
                      { icon: <ShoppingBag size={13} className="text-pink-500" />, label: "Brand", value: product.product_brand || "—" },
                      { icon: <Weight size={13} className="text-pink-500" />, label: "Weight", value: product.weight || "—" },
                      {
                        icon: <Brush size={13} className="text-pink-500" />,
                        label: "Color",
                        value: activeColor,
                        colorHex: activeColorHex,
                      },
                      { icon: <Award size={13} className="text-pink-500" />, label: "Warranty", value: product.warranty || "—" },
                      {
                        icon: <Percent size={13} className="text-pink-500" />,
                        label: "Discount",
                        value: `${parseFloat(activeDiscount).toFixed(0)}%`,
                      },
                      { icon: <Truck size={13} className="text-pink-500" />, label: "Shipping", value: "Free Delivery", green: true },
                      {
                        icon: <ShoppingCart size={13} className="text-pink-500" />,
                        label: "Stock",
                        value: activeStock !== null ? `${activeStock} units` : "—",
                      },
                    ].map(({ icon, label, value, colorHex, green }) => (
                      <div key={label} className="flex items-center gap-2 text-xs bg-gray-50 px-3 py-2 rounded-lg">
                        {icon}
                        <span className="text-gray-500 shrink-0">{label}:</span>
                        {colorHex ? (
                          <span className="flex items-center gap-1 font-medium text-gray-900 truncate">
                            <span
                              className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                              style={{ backgroundColor: colorHex }}
                            />
                            {value}
                          </span>
                        ) : (
                          <span className={`font-medium truncate ${green ? "text-green-600" : "text-gray-900"}`}>
                            {value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-4 pt-1">
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <ShoppingCart size={18} className="text-orange-400" />
                      <span className="text-[10px] text-gray-500 font-medium leading-tight">10 days<br />Replacement</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <Truck size={18} className="text-orange-400" />
                      <span className="text-[10px] text-gray-500 font-medium leading-tight">Free<br />Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <Shield size={18} className="text-orange-400" />
                      <span className="text-[10px] text-gray-500 font-medium leading-tight">{product.warranty || "1 Year"}<br />Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Tabs Section ── */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {(
                  [
                    { key: "details", label: "Additional Details", icon: <Info size={13} /> },
                    ...(product.specifications
                      ? [{ key: "specifications", label: "Specifications", icon: <FileSearch size={13} /> }]
                      : []),
                    ...(product.product_description
                      ? [{ key: "description", label: "Description", icon: <FileText size={13} /> }]
                      : []),
                  ] as { key: "details" | "specifications" | "description"; label: string; icon: JSX.Element }[]
                ).map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTab(key)}
                    className={`px-5 py-3 text-sm font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                      selectedTab === key
                        ? "text-pink-600 border-b-2 border-pink-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* ── Details Tab ── */}
                {selectedTab === "details" && (
                  <div className="space-y-5">
                    {product.dimensions && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                          <Ruler size={15} className="text-pink-500" />
                          Dimensions
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 text-sm whitespace-pre-wrap">{product.dimensions}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                        <Box size={15} className="text-pink-500" />
                        Complete Product Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { label: "Category", value: categoryName },
                          { label: "Brand", value: product.product_brand || "—" },
                          { label: "Product Code", value: product.product_code },
                          { label: "Weight", value: product.weight || "—" },
                          { label: "Colour (selected)", value: activeColor },
                          { label: "Warranty", value: product.warranty || "—" },
                          { label: "Discount (product)", value: `${parseFloat(activeDiscount).toFixed(0)}%`, green: true },
                          {
                            label: "Stock (selected variant)",
                            value: activeStock !== null ? `${activeStock} units` : "—",
                            colored: activeStock === 0 ? "red" : "green",
                          },
                          { label: "Variant Price (MRP)", value: `₹${parseFloat(activePrice).toFixed(2)}` },
                          ...(discounted
                            ? [{ label: "Final Price", value: `₹${finalPrice.toFixed(2)}`, green: true }]
                            : []),
                          ...(discounted
                            ? [{ label: "You Save", value: `₹${savedAmount.toFixed(2)}`, green: true }]
                            : []),
                        ].map(({ label, value, green, colored }) => (
                          <div key={label} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">{label}</p>
                            <p
                              className={`font-semibold text-sm ${
                                colored === "red"
                                  ? "text-red-600"
                                  : colored === "green" || green
                                  ? "text-green-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* All variants comparison table */}
                    {variants.length > 1 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <Palette size={15} className="text-pink-500" />
                          All Colour Variants
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-gray-100">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="px-4 py-2 text-left">Colour</th>
                                <th className="px-4 py-2 text-right">MRP</th>
                                <th className="px-4 py-2 text-right">Discount</th>
                                <th className="px-4 py-2 text-right">Final Price</th>
                                <th className="px-4 py-2 text-right">Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {variants.map((v) => {
                                const vFinal = calcDiscountedPrice(v.price, activeDiscount);
                                const vIsActive = selectedVariant?.id === v.id;
                                return (
                                  <tr
                                    key={v.id}
                                    onClick={() => handleVariantSelect(v)}
                                    className={`border-t border-gray-100 cursor-pointer transition ${
                                      vIsActive ? "bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                                  >
                                    <td className="px-4 py-2 font-medium text-gray-800">
                                      <div className="flex items-center gap-2">
                                        {v.color_hex && (
                                          <span
                                            className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                                            style={{ backgroundColor: v.color_hex }}
                                          />
                                        )}
                                        {v.color_name}
                                        {vIsActive && (
                                          <CheckCircle size={13} className="text-blue-500 ml-1" />
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 text-right text-gray-500">
                                      ₹{parseFloat(v.price).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      {hasDiscount(activeDiscount) ? (
                                        <span className="text-green-600 font-medium">
                                          {parseFloat(activeDiscount).toFixed(0)}%
                                        </span>
                                      ) : (
                                        <span className="text-gray-400">—</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-right font-bold text-gray-900">
                                      ₹{vFinal.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      <span
                                        className={`text-xs font-semibold ${
                                          v.stock === 0
                                            ? "text-red-500"
                                            : v.stock < 10
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                        }`}
                                      >
                                        {v.stock}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Specifications Tab ── */}
                {selectedTab === "specifications" && product.specifications && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileSearch size={16} className="text-pink-500" />
                      Technical Specifications
                    </h3>
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                      <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                        {product.specifications}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Description Tab ── */}
                {selectedTab === "description" && product.product_description && (
                  <div className="whitespace-pre-wrap text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {product.product_description}
                  </div>
                )}
              </div>
            </div>

            {/* ── Meta Footer ── */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                {product.id && (
                  <div className="flex items-center gap-1">
                    <Hash size={11} />
                    <span>Product ID: {product.id}</span>
                  </div>
                )}
                {selectedVariant && (
                  <div className="flex items-center gap-1">
                    <Hash size={11} />
                    <span>Variant ID: {selectedVariant.id}</span>
                  </div>
                )}
                {product.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar size={11} />
                    <span>Created: {new Date(product.created_at).toLocaleDateString()}</span>
                  </div>
                )}
                {product.updated_at && (
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>Last Updated: {new Date(product.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}