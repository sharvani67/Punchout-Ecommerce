// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminNavbar from "@/components/AdminNavbar";
// import { Pencil, Trash2, Plus, FileText } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "@/Config/Api";

// interface Product {
//   id?: number;

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
// }

// export default function ProductTable() {
//   const [products, setProducts] = useState<Product[]>([]);

//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);

//   const navigate = useNavigate();

//   const itemsPerPage = 5;

//   // =========================================
//   // FETCH PRODUCTS
//   // =========================================

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/products`);

//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // =========================================
//   // DELETE PRODUCT
//   // =========================================

//   const handleDelete = async (id?: number) => {
//     if (!id) return;

//     if (!confirm("Are you sure you want to delete?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/products/${id}`);

//       fetchProducts();

//       alert("Product deleted successfully");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // =========================================
//   // SEARCH
//   // =========================================

//   const filteredProducts = products.filter((p) =>
//     p.product_name
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // =========================================
//   // PAGINATION
//   // =========================================

//   const totalPages = Math.ceil(
//     filteredProducts.length / itemsPerPage
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const paginatedProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <AdminNavbar />

//       <div className="pt-24 px-4 lg:px-8 pb-10">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//           <h1 className="text-3xl font-bold">
//             Products
//           </h1>

//           <button
//             onClick={() =>
//               navigate("/admin/add-product")
//             }
//             className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
//           >
//             <Plus size={18} />

//             Add Product
//           </button>
//         </div>

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="🔍 Search product..."
//           className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);

//             setCurrentPage(1);
//           }}
//         />

//         {/* TABLE */}
//        <div className="bg-white rounded-2xl shadow-xl overflow-auto">
//   <table className="min-w-full text-sm">
//     <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
//       <tr>
//         <th className="p-4 text-center">
//           Image
//         </th>

//         <th className="p-4 text-center">
//           Product Name
//         </th>

//         <th className="p-4 text-center">
//           Code
//         </th>

//         <th className="p-4 text-center">
//           Category
//         </th>

//         <th className="p-4 text-center">
//           Brand
//         </th>

//         <th className="p-4 text-center">
//           Price
//         </th>

//         <th className="p-4 text-center">
//           Stock
//         </th>

//         <th className="p-4 text-center">
//           Color
//         </th>

//         <th className="p-4 text-center">
//           Warranty
//         </th>

//         <th className="p-4 text-center">
//           PDF
//         </th>

//         <th className="p-4 text-center">
//           Actions
//         </th>
//       </tr>
//     </thead>

//     <tbody>
//       {paginatedProducts.length > 0 ? (
//         paginatedProducts.map((p) => {
//           const firstImage =
//             p.product_images?.split(",")[0];

//           return (
//             <tr
//               key={p.id}
//               className="border-b hover:bg-gray-50 transition"
//             >
//               {/* IMAGE */}
//               <td className="p-4 text-center">
//                 {firstImage ? (
//                   <img
//                     src={`${BASE_URL}/uploads/products/${firstImage}`}
//                     alt=""
//                     className="w-14 h-14 rounded-lg object-cover border mx-auto"
//                   />
//                 ) : (
//                   <span className="text-gray-400">
//                     No Image
//                   </span>
//                 )}
//               </td>

//               {/* NAME */}
//               <td className="p-4 font-medium text-center">
//                 {p.product_name}
//               </td>

//               {/* CODE */}
//               <td className="p-4 text-center">
//                 {p.product_code}
//               </td>

//               {/* CATEGORY */}
//               <td className="p-4 text-center">
//                 {p.category_name}
//               </td>

//               {/* BRAND */}
//               <td className="p-4 text-center">
//                 {p.product_brand}
//               </td>

//               {/* PRICE */}
//               <td className="p-4 font-semibold text-green-600 text-center">
//                 ₹{p.price}
//               </td>

//               {/* STOCK */}
//               <td className="p-4 text-center">
//                 {p.available_stock}
//               </td>

//               {/* COLOR */}
//               <td className="p-4 text-center">
//                 {p.color}
//               </td>

//               {/* WARRANTY */}
//               <td className="p-4 text-center">
//                 {p.warranty}
//               </td>

//               {/* PDF */}
//               <td className="p-4 text-center">
//                 {p.product_details_pdf ? (
//                   <a
//                     href={`${BASE_URL}/uploads/pdfs/${p.product_details_pdf}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center justify-center gap-1 text-blue-600 hover:underline"
//                   >
//                     <FileText size={16} />
//                     View
//                   </a>
//                 ) : (
//                   "-"
//                 )}
//               </td>

//               {/* ACTIONS */}
//               <td className="p-4">
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/admin/edit-product/${p.id}`
//                       )
//                     }
//                     className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
//                   >
//                     <Pencil
//                       size={16}
//                       className="text-blue-600"
//                     />
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleDelete(p.id)
//                     }
//                     className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
//                   >
//                     <Trash2
//                       size={16}
//                       className="text-red-600"
//                     />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           );
//         })
//       ) : (
//         <tr>
//           <td
//             colSpan={11}
//             className="text-center py-6 text-gray-500"
//           >
//             No products found
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>

//   {/* PAGINATION */}
//   <div className="flex justify-between items-center p-4">
//     <span className="text-sm text-gray-600">
//       Page {currentPage} of{" "}
//       {totalPages || 1}
//     </span>

//     <div className="flex gap-2">
//       <button
//         disabled={currentPage === 1}
//         onClick={() =>
//           setCurrentPage((p) => p - 1)
//         }
//         className="px-3 py-1 border rounded disabled:opacity-50"
//       >
//         Prev
//       </button>

//       <button
//         disabled={
//           currentPage === totalPages ||
//           totalPages === 0
//         }
//         onClick={() =>
//           setCurrentPage((p) => p + 1)
//         }
//         className="px-3 py-1 border rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   </div>
// </div>
//       </div>
//     </>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Pencil, Trash2, Plus, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Product {
  id?: number;
  product_name: string;
  product_code: string;
  category_name: string;
  product_brand: string;
  product_images?: string;
  product_details_pdf?: string;
  price: string;
  available_stock: string;
  weight: string;
  color: string;
  discount: string;
  warranty: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // =========================================
  // FETCH PRODUCTS
  // =========================================

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================================
  // DELETE PRODUCT
  // =========================================

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      fetchProducts();
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // SEARCH
  // =========================================

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-4 lg:px-8 pb-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Products</h1>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search product..."
          className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
              <tr>
                <th className="p-4 text-center">Image</th>
                <th className="p-4 text-center">Product Name</th>
                <th className="p-4 text-center">Code</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-center">Brand</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Color</th>
                <th className="p-4 text-center">Warranty</th>
                <th className="p-4 text-center">PDF</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => {
                  const firstImage = p.product_images?.split(",")[0];
                  return (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                      {/* IMAGE */}
                      <td className="p-4 text-center">
                        {firstImage ? (
                          <img
                            src={`${BASE_URL}/uploads/products/${firstImage}`}
                            alt=""
                            className="w-14 h-14 rounded-lg object-cover border mx-auto"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>

                      {/* NAME */}
                      <td className="p-4 font-medium text-center">{p.product_name}</td>

                      {/* CODE */}
                      <td className="p-4 text-center">{p.product_code}</td>

                      {/* CATEGORY */}
                      <td className="p-4 text-center">{p.category_name}</td>

                      {/* BRAND */}
                      <td className="p-4 text-center">{p.product_brand}</td>

                      {/* PRICE */}
                      <td className="p-4 font-semibold text-green-600 text-center">
                        ₹{p.price}
                      </td>

                      {/* STOCK */}
                      <td className="p-4 text-center">{p.available_stock}</td>

                      {/* COLOR */}
                      <td className="p-4 text-center">{p.color}</td>

                      {/* WARRANTY */}
                      <td className="p-4 text-center">{p.warranty}</td>

                      {/* PDF */}
                      <td className="p-4 text-center">
                        {p.product_details_pdf ? (
                          <a
                            href={`${BASE_URL}/uploads/pdfs/${p.product_details_pdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1 text-blue-600 hover:underline"
                          >
                            <FileText size={16} />
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex gap-3 justify-center">
                          {/* VIEW BUTTON */}
                          <button
                            onClick={() => navigate(`/admin/product-details/${p.id}`)}
                            className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition"
                            title="View Details"
                          >
                            <Eye size={16} className="text-green-600" />
                          </button>

                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                            className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition"
                          >
                            <Pencil size={16} className="text-blue-600" />
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full transition"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}