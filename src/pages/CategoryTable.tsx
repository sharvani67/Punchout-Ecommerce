import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Category {
  id?: number;
  category_name: string;
  created_at?: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState(""); 

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 5;

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/categories`
      );

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================================
  // DELETE CATEGORY
  // =========================================

  const handleDelete = async (id?: number) => {
    if (!id) return;

    if (
      !confirm(
        "Are you sure you want to delete this category?"
      )
    )
      return;

    try {
      await axios.delete(
        `${BASE_URL}/api/categories/${id}`
      );

      fetchCategories();

      alert("Category deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // SEARCH
  // =========================================

  const filteredCategories = categories.filter((c) =>
    c.category_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedCategories =
    filteredCategories.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-4 lg:px-8 pb-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <button
            onClick={() =>
              navigate("/admin/add-category-product")
            }
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <Plus size={18} />

            Add Category
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search category..."
          className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setCurrentPage(1);
          }}
        />

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="min-w-full text-sm">
           <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
  <tr>
    <th className="p-4 text-center">S.No</th>

    <th className="p-4 text-center">
      Category Name
    </th>

    <th className="p-4 text-center">
      Created Date
    </th>

    <th className="p-4 text-center">
      Actions
    </th>
  </tr>
</thead>

            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map(
                  (category, index) => (
                    <tr
                      key={category.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* SERIAL NUMBER */}
                      <td className="p-4 text-center">
                        {startIndex + index + 1}
                      </td>

                     {/* CATEGORY NAME */}
<td className="p-4 font-medium text-center">
  {category.category_name}
</td>

{/* DATE */}
<td className="p-4 text-center">
  {category.created_at
    ? new Date(category.created_at).toLocaleDateString()
    : "-"}
</td>

                      {/* ACTIONS */}
                      <td className="p-4 flex gap-3 justify-center">
                        {/* EDIT */}
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/edit-category/${category.id}`
                            )
                          }
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                        >
                          <Pencil
                            size={16}
                            className="text-blue-600"
                          />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(category.id)
                          }
                          className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                        >
                          <Trash2
                            size={16}
                            className="text-red-600"
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {totalPages || 1}
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => p - 1)
                }
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <button
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage((p) => p + 1)
                }
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