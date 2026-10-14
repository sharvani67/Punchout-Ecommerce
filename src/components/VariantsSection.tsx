import axios from "axios";
import BASE_URL from "@/Config/Api";

export interface VariantRow {
  key: string;
  id?: number; // present only for variants already saved in DB
  color_name: string;
  color_hex: string;
  price: string;
  stock: string;
  images: File[]; // newly selected files
  previews: string[]; // previews of new files
  existingImages: string[]; // already saved image URLs (full URL)
}

export const newVariantRow = (): VariantRow => ({
  key: `${Date.now()}-${Math.random()}`,
  color_name: "",
  color_hex: "#000000",
  price: "",
  stock: "",
  images: [],
  previews: [],
  existingImages: [],
});

// ==========================
// VALIDATE
// ==========================
export const validateVariants = (variants: VariantRow[]): string => {
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (!v.color_name.trim() || !v.price || v.stock === "") {
      return `Please fill Color Name, Price and Stock for Variant ${i + 1}`;
    }
  }
  return "";
};

// ==========================
// SAVE (uses existing backend APIs)
// ==========================
export const saveVariants = async (
  productId: number | string,
  variants: VariantRow[],
  deletedIds: number[] = []
) => {
  // Delete removed variants
  for (const id of deletedIds) {
    await axios.delete(`${BASE_URL}/api/products/variants/${id}`);
  }

  // Create / update
  for (const v of variants) {
    const data = new FormData();
    data.append("product_id", String(productId));
    data.append("color_name", v.color_name);
    data.append("color_hex", v.color_hex);
    data.append("price", v.price);
    data.append("stock", v.stock);

    v.images.forEach((img) => data.append("images", img));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    if (v.id) {
      await axios.put(
        `${BASE_URL}/api/products/variants/${v.id}`,
        data,
        config
      );
    } else {
      await axios.post(`${BASE_URL}/api/products/variants`, data, config);
    }
  }
};

// ==========================
// UI COMPONENT
// ==========================
interface Props {
  variants: VariantRow[];
  setVariants: React.Dispatch<React.SetStateAction<VariantRow[]>>;
  onRemoveExisting?: (id: number) => void;
}

export default function VariantsSection({
  variants,
  setVariants,
  onRemoveExisting,
}: Props) {
  const updateField = (
    key: string,
    field: keyof VariantRow,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.key === key ? { ...v, [field]: value } : v))
    );
  };

  const handleImages = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 5) {
      alert("Maximum 5 images per variant");
      e.target.value = "";
      return;
    }

    const previews = files.map((f) => URL.createObjectURL(f));

    setVariants((prev) =>
      prev.map((v) => (v.key === key ? { ...v, images: files, previews } : v))
    );
  };

  const addVariant = () => setVariants((prev) => [...prev, newVariantRow()]);

  const removeVariant = (v: VariantRow) => {
    if (v.id && onRemoveExisting) {
      if (!confirm("Delete this saved variant?")) return;
      onRemoveExisting(v.id);
    }
    setVariants((prev) => prev.filter((item) => item.key !== v.key));
  };

  return (
    <div className="md:col-span-2 lg:col-span-3 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Color Variants</h2>

        <button
          type="button"
          onClick={addVariant}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800"
        >
          + Add Variant
        </button>
      </div>

      {variants.length === 0 && (
        <p className="text-gray-500 text-sm">
          No variants added. Click "+ Add Variant" to add one.
        </p>
      )}

      <div className="space-y-5">
        {variants.map((v, index) => (
          <div
            key={v.key}
            className="border border-gray-200 rounded-xl p-5 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Variant {index + 1}</h3>

              <button
                type="button"
                onClick={() => removeVariant(v)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label">
                  Color Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={v.color_name}
                  onChange={(e) =>
                    updateField(v.key, "color_name", e.target.value)
                  }
                  className="input"
                  placeholder="Black"
                />
              </div>

              <div>
                <label className="label">Color</label>
                <input
                  type="color"
                  value={v.color_hex}
                  onChange={(e) =>
                    updateField(v.key, "color_hex", e.target.value)
                  }
                  className="input h-12"
                />
              </div>

              <div>
                <label className="label">
                  Variant Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={v.price}
                  onChange={(e) =>
                    updateField(v.key, "price", e.target.value)
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="label">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={v.stock}
                  onChange={(e) =>
                    updateField(v.key, "stock", e.target.value)
                  }
                  className="input"
                />
              </div>
            </div>

            {/* Existing images (edit mode) */}
            {v.existingImages.length > 0 && (
              <div className="mt-4">
                <label className="label">Current Images</label>
                <div className="flex flex-wrap gap-3">
                  {v.existingImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Uploading new images will replace the current images.
                </p>
              </div>
            )}

            {/* Upload images */}
            <div className="mt-4">
              <label className="label">
                {v.id ? "Upload New Images" : "Variant Images"} (max 5)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImages(v.key, e)}
                className="input"
              />

              <div className="flex flex-wrap gap-3 mt-3">
                {v.previews.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}