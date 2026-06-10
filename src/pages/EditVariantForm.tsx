import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import BASE_URL from "@/Config/Api";

export default function EditVariant() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    color_name: "",
    color_hex: "#000000",
    price: "",
    stock: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ==========================
  // FETCH VARIANT
  // ==========================

  useEffect(() => {
    fetchVariant();
  }, [id]);

  const fetchVariant = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products/variant/${id}`
      );

      const variant = res.data;

      setForm({
        color_name: variant.color_name || "",
        color_hex: variant.color_hex || "#000000",
        price: variant.price || "",
        stock: variant.stock || "",
      });

      if (variant.images) {
        setExistingImages(
          variant.images.map(
            (img: string) => `${BASE_URL}${img}`
          )
        );
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load variant");
    }
  };

  // ==========================
  // INPUT CHANGE
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
  // IMAGE CHANGE
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
  // UPDATE
  // ==========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "color_name",
        form.color_name
      );

      formData.append(
        "color_hex",
        form.color_hex
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "stock",
        form.stock
      );

      images.forEach((img) => {
        formData.append("images", img);
      });

      await axios.put(
        `${BASE_URL}/api/products/variants/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Variant Updated Successfully");

      navigate("/admin/productvariants");
    } catch (error) {
      console.log(error);
      alert("Failed to update variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-6 lg:px-12 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          Edit Variant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
              required
            />
          </div>

          {/* Color */}

          <div>
            <label className="label">
              Color
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
              Price
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

          {/* Existing Images */}

          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Current Images
            </label>

            <div className="flex flex-wrap gap-3 mt-2">
              {existingImages.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="w-24 h-24 object-cover border rounded-lg"
                  />
                )
              )}
            </div>
          </div>

          {/* Upload New Images */}

          <div className="md:col-span-2 lg:col-span-3">
            <label className="label">
              Upload New Images
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
                  className="w-24 h-24 object-cover border rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Submit */}

          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold"
            >
              {loading
                ? "Updating..."
                : "Update Variant"}
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