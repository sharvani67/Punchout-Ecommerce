import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { Trash2 } from "lucide-react";
import BASE_URL from "@/Config/Api";
import { useNavigate } from "react-router-dom";

interface Session {
  id: string;
  buyer_id: string;
  buyer_cookie: string;
  created_at: string;
  last_active: string;
  status: string;
  buyer_email: string;
}

export default function SessionsTable() {
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
        `${BASE_URL}/api/admin/sessions`
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
                <th className="p-4 text-center">
                  S.No
                </th>

                <th className="p-4 text-center">
                  Session ID
                </th>

                <th className="p-4 text-center">
                  Buyer ID
                </th>

                <th className="p-4 text-center">
                  Buyer Email
                </th>

                <th className="p-4 text-center">
                  Buyer Cookie
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Created At
                </th>

                <th className="p-4 text-center">
                  Last Active
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
                      {/* SERIAL NUMBER */}
                      <td className="p-4 text-center">
                        {startIndex + index + 1}
                      </td>

                     {/* SESSION ID */}
<td className="p-4 text-center break-all">
  <span
    onClick={() =>
      navigate(
        `/admin/session-details/${session.id}`
      )
    }
    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
  >
    {session.id}
  </span>
</td>

                      {/* BUYER ID */}
                      <td className="p-4 text-center font-medium">
                        {session.buyer_id}
                      </td>

                      {/* EMAIL */}
                      <td className="p-4 text-center">
                        {session.buyer_email}
                      </td>

                      {/* COOKIE */}
                      <td className="p-4 text-center">
                        {session.buyer_cookie}
                      </td>

                      {/* STATUS */}
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            session.status ===
                            "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>

                      {/* CREATED */}
                      <td className="p-4 text-center whitespace-nowrap">
                        {new Date(
                          session.created_at
                        ).toLocaleString()}
                      </td>

                      {/* LAST ACTIVE */}
                      <td className="p-4 text-center whitespace-nowrap">
                        {new Date(
                          session.last_active
                        ).toLocaleString()}
                      </td>

                      {/* ACTIONS */}
                      {/* <td className="p-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() =>
                              handleDelete(
                                session.id
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
                    colSpan={9}
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