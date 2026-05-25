import { useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Product {
  product_name: string;
  model_no: string;
  category: string;
  brand: string;
  product_code: string;
  color: string;
  units: string;
  dimensions: string;
  price: string;
  description: string;
  quantity: string;
}

export default function ProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Product>({
    product_name: "",
    model_no: "",
    category: "",
    brand: "",
    product_code: "",
    color: "",
    units: "",
    dimensions: "",
    price: "",
    description: "",
    quantity: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit (API integrated from your first code)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("product_images", image);
      }

      await axios.post(`${BASE_URL}/api/products`, data);

      alert("Product Added Successfully ✅");

      navigate("/admin/productstable");
    } catch (error) {
      console.error(error);
      alert("Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Model No */}
          <div>
            <label className="block mb-1 font-medium">Model No</label>
            <input
              name="model_no"
              value={form.model_no}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Product Code */}
          <div>
            <label className="block mb-1 font-medium">Product Code</label>
            <input
              name="product_code"
              value={form.product_code}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block mb-1 font-medium">Color</label>
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Units */}
          <div>
            <label className="block mb-1 font-medium">Units</label>
            <input
              name="units"
              value={form.units}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block mb-1 font-medium">Dimensions</label>
            <input
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block mb-1 font-medium">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="input"
            />

            {preview && (
              <img
                src={preview}
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="input"
            />
          </div>

          {/* Button */}
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

      {/* Reusable Input Style */}
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
        `}
      </style>
    </>
  );
}