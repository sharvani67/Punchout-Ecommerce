import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Product {
  id: number;
  product_name: string;
}

export default function VariantForm() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    product_id: "",
    color_name: "",
    color_hex: "#000000",
    price: "",
    stock: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ==========================
  // FETCH PRODUCTS
  // ==========================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products/only-products`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // HANDLE CHANGE
  // ==========================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // IMAGES
  // ==========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previews);
  };

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      images.forEach((img) => {
        data.append("images", img);
      });

      await axios.post(
        `${BASE_URL}/api/products/variants`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Variant Added Successfully");

      navigate("/admin/productvariants");
    } catch (error) {
      console.log(error);
      alert("Failed to add variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          Add Product Variant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product */}

          <div>
            <label className="label">
              Product
            </label>

            <select
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Name */}

          <div>
            <label className="label">
              Color Name
            </label>

            <input
              type="text"
              name="color_name"
              value={form.color_name}
              onChange={handleChange}
              className="input"
              placeholder="Black"
              required
            />
          </div>

          {/* Color Hex */}

          <div>
            <label className="label">
              Color Hex
            </label>

            <input
              type="color"
              name="color_hex"
              value={form.color_hex}
              onChange={handleChange}
              className="input h-12"
            />
          </div>

          {/* Price */}

          <div>
            <label className="label">
              Variant Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Stock */}

          <div>
            <label className="label">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Images */}

          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Variant Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />

            <div className="flex flex-wrap gap-3 mt-4">
              {preview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* Submit */}

          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {loading
                ? "Adding..."
                : "Add Variant"}
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
          }

          .input:focus {
            border-color: black;
            box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
          }

          .label {
            display:block;
            margin-bottom:6px;
            font-weight:600;
          }
        `}
      </style>
    </>
  );
}