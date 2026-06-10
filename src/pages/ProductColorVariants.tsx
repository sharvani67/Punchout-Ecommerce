import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface Variant {
id: number;
product_id: number;
product_name: string;
color_name: string;
color_hex: string;
price: string;
stock: number;
image_url: string;
images: string[];
}

export default function VariantTable() {
const navigate = useNavigate();

const [variants, setVariants] = useState<Variant[]>([]);
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] =
useState(1);

const itemsPerPage = 5;

// ===========================
// FETCH VARIANTS
// ===========================

const fetchVariants = async () => {
try {
const res = await axios.get(
`${BASE_URL}/api/products/all-variants`
);

  setVariants(res.data);
} catch (error) {
  console.log(error);
}

};

useEffect(() => {
fetchVariants();
}, []);

// ===========================
// DELETE VARIANT
// ===========================

const handleDelete = async (
id: number
) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this variant?"
);

if (!confirmDelete) return;

try {
  await axios.delete(
    `${BASE_URL}/api/products/variants/${id}`
  );

  fetchVariants();

  alert(
    "Variant deleted successfully"
  );
} catch (error) {
  console.log(error);
}


};

// ===========================
// SEARCH
// ===========================

const filteredVariants =
variants.filter(
(variant) =>
variant.product_name
.toLowerCase()
.includes(
search.toLowerCase()
) ||
variant.color_name
.toLowerCase()
.includes(
search.toLowerCase()
)
);

// ===========================
// PAGINATION
// ===========================

const totalPages = Math.ceil(
filteredVariants.length /
itemsPerPage
);

const startIndex =
(currentPage - 1) *
itemsPerPage;

const paginatedVariants =
filteredVariants.slice(
startIndex,
startIndex + itemsPerPage
);

return (
<> <AdminNavbar />

  <div className="pt-24 px-4 lg:px-8 pb-10">

    {/* HEADER */}

    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold">
        Product Variants
      </h1>

      <button
        onClick={() =>
          navigate(
            "/admin/add-color-variants"
          )
        }
        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        <Plus size={18} />
        Add Variant
      </button>
    </div>

    {/* SEARCH */}

    <input
      type="text"
      placeholder="🔍 Search variant..."
      className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
      value={search}
      onChange={(e) => {
        setSearch(
          e.target.value
        );

        setCurrentPage(1);
      }}
    />

    {/* TABLE */}

    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

      <table className="min-w-full text-sm">

        <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <tr>
            <th className="p-4 text-center">
              S.No
            </th>

            <th className="p-4 text-center">
              Image
            </th>

            <th className="p-4 text-center">
              Product
            </th>

            <th className="p-4 text-center">
              Color
            </th>

            <th className="p-4 text-center">
              Price
            </th>

            <th className="p-4 text-center">
              Stock
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {paginatedVariants.length >
          0 ? (
            paginatedVariants.map(
              (
                variant,
                index
              ) => (
                <tr
                  key={
                    variant.id
                  }
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-center">
                    {startIndex +
                      index +
                      1}
                  </td>

                  <td className="p-4 text-center">
                    <img
                      src={`${BASE_URL}${variant.image_url}`}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg border mx-auto"
                    />
                  </td>

                  <td className="p-4 text-center font-medium">
                    {
                      variant.product_name
                    }
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">

                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{
                          background:
                            variant.color_hex,
                        }}
                      />

                      <span>
                        {
                          variant.color_name
                        }
                      </span>

                    </div>
                  </td>

                  <td className="p-4 text-center">
                    ₹
                    {
                      variant.price
                    }
                  </td>

                  <td className="p-4 text-center">
                    {
                      variant.stock
                    }
                  </td>

                  <td className="p-4 flex gap-3 justify-center">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-variant/${variant.id}`
                        )
                      }
                      className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"
                    >
                      <Pencil
                        size={
                          16
                        }
                        className="text-blue-600"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          variant.id
                        )
                      }
                      className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                    >
                      <Trash2
                        size={
                          16
                        }
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
                colSpan={
                  7
                }
                className="text-center py-6 text-gray-500"
              >
                No variants found
              </td>
            </tr>
          )}

        </tbody>
      </table>

      {/* PAGINATION */}

      <div className="flex justify-between items-center p-4">

        <span className="text-sm text-gray-600">
          Page{" "}
          {
            currentPage
          }{" "}
          of{" "}
          {totalPages ||
            1}
        </span>

        <div className="flex gap-2">

          <button
            disabled={
              currentPage ===
              1
            }
            onClick={() =>
              setCurrentPage(
                (
                  p
                ) =>
                  p -
                  1
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={
              currentPage ===
                totalPages ||
              totalPages ===
                0
            }
            onClick={() =>
              setCurrentPage(
                (
                  p
                ) =>
                  p +
                  1
              )
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
