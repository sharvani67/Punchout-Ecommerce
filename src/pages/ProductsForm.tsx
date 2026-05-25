import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

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
  available_stock: string;
  dimensions: string;
  specifications: string;
  weight: string;
  color: string;
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
    available_stock: "",
    dimensions: "",
    specifications: "",
    weight: "",
    color: "",
    discount: "",
    product_description: "",
    warranty: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [pdf, setPdf] = useState<File | null>(null);

  const [preview, setPreview] = useState<string[]>([]);

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

  // =========================================
  // MULTIPLE IMAGES
  // =========================================

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages(files);

    const imagePreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(imagePreviews);
  };

  // =========================================
  // PDF
  // =========================================

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPdf(file);
    }
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Multiple Images
      images.forEach((img) => {
        data.append("product_images", img);
      });

      // PDF
      if (pdf) {
        data.append("product_details_pdf", pdf);
      }

      await axios.post(`${BASE_URL}/api/products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully ✅");

      navigate("/admin/productstable");
    } catch (error) {
      console.log(error);
      alert("Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="label">Product Name</label>
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
            <label className="label">Product Code</label>
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
            <label className="label">Product Category</label>

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
            <label className="label">Product Brand</label>

            <input
              type="text"
              name="product_brand"
              value={form.product_brand}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="label">Available Stock</label>

            <input
              type="number"
              name="available_stock"
              value={form.available_stock}
              onChange={handleChange}
              className="input"
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

          {/* Color */}
          <div>
            <label className="label">Color</label>

            <input
              type="text"
              name="color"
              value={form.color}
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

          {/* Multiple Images */}
          <div>
            <label className="label">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />

            <div className="flex gap-2 mt-3 flex-wrap">
              {preview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover border"
                />
              ))}
            </div>
          </div>

          {/* PDF */}
          <div>
            <label className="label">
              Product Details PDF
            </label>

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
              Product Description
            </label>

            <textarea
              rows={5}
              name="product_description"
              value={form.product_description}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Adding..." : "Add Product"}
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