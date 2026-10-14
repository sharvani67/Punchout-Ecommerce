import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";
import VariantsSection, {
  VariantRow,
  newVariantRow,
  validateVariants,
  saveVariants,
} from "@/components/VariantsSection";

interface Category {
  id: number;
  category_name: string;
}

interface Product {
  product_name: string;
  product_code: string;
  product_category_id: string;
  product_brand: string;
  price: string;
  dimensions: string;
  specifications: string;
  weight: string;
  discount: string;
  product_description: string;
  warranty: string;
}

export default function ProductForm() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState<Product>({
    product_name: "",
    product_code: "",
    product_category_id: "",
    product_brand: "",
    price: "",
    dimensions: "",
    specifications: "",
    weight: "",
    discount: "",
    product_description: "",
    warranty: "",
  });

  const [pdf, setPdf] = useState<File | null>(null);
  const [variants, setVariants] = useState<VariantRow[]>([newVariantRow()]);
  const [loading, setLoading] = useState(false);

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPdf(file);
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.product_name.trim() ||
      !form.product_code.trim() ||
      !form.product_brand.trim() ||
      !form.product_description.trim()
    ) {
      alert("Please fill all mandatory fields (*)");
      return;
    }

    const variantError = validateVariants(variants);
    if (variantError) {
      alert(variantError);
      return;
    }

    setLoading(true);

    let productId: number | null = null;

    // ---------- STEP 1: CREATE PRODUCT ----------
    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (pdf) {
        data.append("product_details_pdf", pdf);
      }

      const response = await axios.post(`${BASE_URL}/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      productId = response.data.id;
    } catch (error: any) {
      console.error("❌ Product Add Error:", error);

      if (error.response) {
        const errorData = error.response.data;

        if (errorData?.code === "ER_DUP_ENTRY") {
          if (errorData.sqlMessage?.includes("product_code")) {
            alert("Product Code already exists ❌");
          } else {
            alert(errorData.sqlMessage || "Duplicate entry found ❌");
          }
        } else {
          alert(errorData?.message || "Server Error ❌");
        }
      } else if (error.request) {
        alert("No response from server ❌");
      } else {
        alert(error.message || "Something went wrong ❌");
      }

      setLoading(false);
      return;
    }

    // ---------- STEP 2: CREATE VARIANTS ----------
    try {
      if (productId && variants.length > 0) {
        await saveVariants(productId, variants);
      }

      alert("Product & Variants Added Successfully ✅");
      navigate("/admin/productstable");
    } catch (error) {
      console.error("❌ Variant Add Error:", error);
      alert(
        "Product saved, but some variants failed ❌. Please check and re-save variants."
      );
      // Product exists now, so go to edit page to fix variants
      navigate(`/admin/edit-product/${productId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="label">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Product Code */}
          <div>
            <label className="label">
              Product Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="product_code"
              value={form.product_code}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">
              Product Category <span className="text-red-500">*</span>
            </label>
            <select
              name="product_category_id"
              value={form.product_category_id}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="label">
              Product Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="product_brand"
              value={form.product_brand}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Weight */}
          <div>
            <label className="label">Weight</label>
            <input
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="label">Discount</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Warranty */}
          <div>
            <label className="label">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={form.warranty}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* PDF */}
          <div>
            <label className="label">Product Details PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="input"
            />
          </div>

          {/* Dimensions */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">Dimensions</label>
            <textarea
              rows={3}
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Specifications */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">Specifications</label>
            <textarea
              rows={4}
              name="specifications"
              value={form.specifications}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              name="product_description"
              value={form.product_description}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* VARIANTS */}
          <VariantsSection variants={variants} setVariants={setVariants} />

          {/* Submit */}
          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-105 transition py-3 rounded-xl font-semibold"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #d1d5db;
            padding: 10px;
            border-radius: 10px;
            outline: none;
            background: white;
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