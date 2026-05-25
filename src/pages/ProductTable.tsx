import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Product {
  id?: number;
  product_name: string;
  model_no: string;
  category: string;
  brand: string;
  product_code: string;
  color: string;
  units: string;
  dimensions: string;
  price: string;
  quantity: string;
  product_images?: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 5;

  // Fetch
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete
  const handleDelete = async (id?: number) => {
    if (!id) return;

    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Search
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-4 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Products</h1>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
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

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Model</th>
                <th className="p-4">Category</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price</th>
                <th className="p-4">Qty</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      {p.product_images ? (
                        <img
                          src={`${BASE_URL}/${p.product_images}`}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>

                    <td className="p-4 font-medium">{p.product_name}</td>
                    <td className="p-4">{p.model_no}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">{p.brand}</td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹{p.price}
                    </td>

                    <td className="p-4">{p.quantity}</td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-3 justify-center">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
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
                disabled={currentPage === totalPages}
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