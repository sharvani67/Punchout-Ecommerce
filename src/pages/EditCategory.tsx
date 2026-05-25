import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "@/Config/Api";

export default function EditCategory() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [categoryName, setCategoryName] =
    useState("");

  const [loading, setLoading] = useState(false);

  // =========================================
  // FETCH SINGLE CATEGORY
  // =========================================

  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/categories/${id}`
      );

      setCategoryName(res.data.category_name);
    } catch (error) {
      console.log(error);

      alert("Error fetching category ❌");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // =========================================
  // UPDATE CATEGORY
  // =========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.put(
        `${BASE_URL}/api/categories/${id}`,
        {
          category_name: categoryName,
        }
      );

      alert("Category Updated Successfully ✅");

      navigate("/admin/categories-table");
    } catch (error) {
      console.log(error);

      alert("Error updating category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          Edit Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Category Name */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Category Name
            </label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="Enter category name"
              className="input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              {loading
                ? "Updating..."
                : "Update Category"}
            </button>
          </div>
        </form>
      </div>

      {/* Styles */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #d1d5db;
            padding: 10px;
            border-radius: 10px;
            outline: none;
            transition: 0.2s;
          }

          .input:focus {
            border-color: black;
            box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
          }

          .label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}