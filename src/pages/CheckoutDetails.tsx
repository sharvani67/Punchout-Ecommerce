import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Trash2 } from "lucide-react";
import BASE_URL from "@/Config/Api";
import { useNavigate } from "react-router-dom";

interface Session {
  id: number;
  session_id: string;
  buyer_id: number;
  buyer_email: string;

  org_id: number;
  organization_name: string;
  identity: string;
  shared_secret: string;

  total: string;
  created_at: string;

  items: {
    product_id: number;
    name: string;
    price: string;
    quantity: number;
  }[];
}

export default function AllSessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  // =========================================
  // FETCH SESSIONS
  // =========================================

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/all-sessions`
      );

      setSessions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // =========================================
  // DELETE SESSION
  // =========================================

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this session?"
      )
    )
      return;

    try {
      await axios.delete(
        `${BASE_URL}/api/admin/sessions/${id}`
      );

      fetchSessions();

      alert("Session deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // SEARCH
  // =========================================

  const filteredSessions = sessions.filter(
    (session) =>
      Object.values(session)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages = Math.ceil(
    filteredSessions.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedSessions =
    filteredSessions.slice(
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
            Sessions
          </h1>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search session..."
          className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setCurrentPage(1);
          }}
        />

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden overflow-x-auto">
         <table className="min-w-full text-sm">
  <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
    <tr>
      <th className="p-4 text-center">S.No</th>

      <th className="p-4 text-center">
        Session ID
      </th>

      {/* <th className="p-4 text-center">
        Buyer ID
      </th> */}

      <th className="p-4 text-center">
        Buyer Email
      </th>

      <th className="p-4 text-center">
        Organization
      </th>

      <th className="p-4 text-center">
        Identity
      </th>

      {/* <th className="p-4 text-center">
        Shared Secret
      </th> */}

      <th className="p-4 text-center">
        Total Amount
      </th>

      {/* <th className="p-4 text-center">
        Purchased Items
      </th> */}

      <th className="p-4 text-center">
        Created At
      </th>

      {/* <th className="p-4 text-center">
        Actions
      </th> */}
    </tr>
  </thead>

  <tbody>
    {paginatedSessions.length > 0 ? (
      paginatedSessions.map(
        (session, index) => (
          <tr
            key={session.id}
            className="border-b hover:bg-gray-50 transition"
          >
            <td className="p-4 text-center">
              {startIndex + index + 1}
            </td>

            <td className="p-4 text-center break-all">
              <span
                onClick={() =>
                  navigate(
                    `/admin/session-details/${session.session_id}`
                  )
                }
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
              >
                {session.session_id}
              </span>
            </td>
{/* 
            <td className="p-4 text-center">
              {session.buyer_id}
            </td> */}

            <td className="p-4 text-center">
              {session.buyer_email}
            </td>

            <td className="p-4 text-center">
              {session.organization_name}
            </td>

            <td className="p-4 text-center">
              {session.identity}
            </td>

            {/* <td className="p-4 text-center">
              {session.shared_secret}
            </td> */}

            <td className="p-4 text-center font-bold text-green-600">
              ₹
              {Number(
                session.total
              ).toLocaleString()}
            </td>

            {/* <td className="p-4">
              <div className="space-y-1 min-w-[220px]">
                {session.items?.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-lg px-3 py-2 text-xs"
                    >
                      <div className="font-medium">
                        {item.name}
                      </div>

                      <div className="text-gray-600">
                        Qty :
                        {item.quantity}
                      </div>

                      <div className="text-green-600 font-semibold">
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </div>
                    </div>
                  )
                )}
              </div>
            </td> */}

            <td className="p-4 text-center whitespace-nowrap">
              {new Date(
                session.created_at
              ).toLocaleString()}
            </td>

            {/* <td className="p-4">
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    handleDelete(
                      String(
                        session.session_id
                      )
                    )
                  }
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                >
                  <Trash2
                    size={16}
                    className="text-red-600"
                  />
                </button>
              </div>
            </td> */}
          </tr>
        )
      )
    ) : (
      <tr>
        <td
          colSpan={11}
          className="text-center py-6 text-gray-500"
        >
          No sessions found
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