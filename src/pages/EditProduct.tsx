import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [categories, setCategories] = useState<
    Category[]
  >([]);

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

  const [images, setImages] = useState<File[]>(
    []
  );

  const [pdf, setPdf] = useState<File | null>(
    null
  );

  const [preview, setPreview] = useState<
    string[]
  >([]);

  const [existingImages, setExistingImages] =
    useState<string[]>([]);

  const [existingPdf, setExistingPdf] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    fetchCategories();

    fetchProduct();
  }, []);

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

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products/${id}`
      );

      const data = res.data;

      setForm({
        product_name:
          data.product_name || "",
        product_code:
          data.product_code || "",
        product_category_id:
          data.product_category_id || "",
        product_brand:
          data.product_brand || "",
        price: data.price || "",
        available_stock:
          data.available_stock || "",
        dimensions:
          data.dimensions || "",
        specifications:
          data.specifications || "",
        weight: data.weight || "",
        color: data.color || "",
        discount:
          data.discount || "",
        product_description:
          data.product_description || "",
        warranty:
          data.warranty || "",
      });

      // Existing Images
      if (data.product_images) {
        setExistingImages(
          data.product_images.split(",")
        );
      }

      // Existing PDF
      if (data.product_details_pdf) {
        setExistingPdf(
          data.product_details_pdf
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // NEW IMAGES
  // =========================================

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

  // =========================================
  // NEW PDF
  // =========================================

  const handlePdfChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setPdf(file);
    }
  };

  // =========================================
  // REMOVE IMAGE
  // =========================================

  const removeExistingImage = (
    img: string
  ) => {
    const updatedImages =
      existingImages.filter(
        (item) => item !== img
      );

    setExistingImages(updatedImages);
  };

  // =========================================
  // REMOVE PDF
  // =========================================

  const removeExistingPdf = () => {
    setExistingPdf("");
  };

  // =========================================
  // UPDATE PRODUCT
  // =========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      // TEXT FIELDS
      Object.entries(form).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      // EXISTING IMAGES
      data.append(
        "existing_images",
        JSON.stringify(existingImages)
      );

      // EXISTING PDF
      data.append(
        "existing_pdf",
        existingPdf
      );

      // NEW IMAGES
      images.forEach((img) => {
        data.append(
          "product_images",
          img
        );
      });

      // NEW PDF
      if (pdf) {
        data.append(
          "product_details_pdf",
          pdf
        );
      }

      await axios.put(
        `${BASE_URL}/api/products/${id}`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Product Updated Successfully ✅"
      );

      navigate("/admin/productstable");
    } catch (error) {
      console.log(error);

      alert(
        "Error updating product ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="label">
              Product Name
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
              Product Code
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
              Product Category
            </label>

            <select
              name="product_category_id"
              value={
                form.product_category_id
              }
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="label">
              Product Brand
            </label>

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
            <label className="label">
              Price
            </label>

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
            <label className="label">
              Available Stock
            </label>

            <input
              type="number"
              name="available_stock"
              value={
                form.available_stock
              }
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="label">
              Weight
            </label>

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
            <label className="label">
              Color
            </label>

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
            <label className="label">
              Discount
            </label>

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
            <label className="label">
              Warranty
            </label>

            <input
              type="text"
              name="warranty"
              value={form.warranty}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Existing Images */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Existing Images
            </label>

            <div className="flex gap-3 flex-wrap">
              {existingImages.map(
                (img, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={`${BASE_URL}/uploads/products/${img}`}
                      alt=""
                      className="w-24 h-24 rounded-lg object-cover border"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(
                          img
                        )
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Upload Images */}
          <div>
            <label className="label">
              Upload New Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="input"
            />

            <div className="flex gap-2 mt-3 flex-wrap">
              {preview.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                )
              )}
            </div>
          </div>

          {/* Existing PDF */}
          <div>
            <label className="label">
              Existing PDF
            </label>

            {existingPdf ? (
              <div className="flex items-center gap-3">
                <a
                  href={`${BASE_URL}/uploads/pdfs/${existingPdf}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Current PDF
                </a>

                <button
                  type="button"
                  onClick={
                    removeExistingPdf
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ) : (
              <p>No PDF uploaded</p>
            )}
          </div>

          {/* Upload PDF */}
          <div>
            <label className="label">
              Upload New PDF
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
            <label className="label">
              Dimensions
            </label>

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
            <label className="label">
              Specifications
            </label>

            <textarea
              rows={4}
              name="specifications"
              value={
                form.specifications
              }
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
              value={
                form.product_description
              }
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
              {loading
                ? "Updating..."
                : "Update Product"}
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