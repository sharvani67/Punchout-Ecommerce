import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar";
import { useParams } from "react-router-dom";
import BASE_URL from "@/Config/Api";

interface SessionItem {
  product_id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Checkout {
  id: number;
  session_id: string;
  buyer_id: number;
  buyer_email: string;
  total: string;
  created_at: string;
}

interface Activity {
  id: number;
  session_id: string;
  action: string;
  data: string | null;
  created_at: string;
}

interface SessionDetails {
  checkout: Checkout | null;
  items: SessionItem[];
  activity: Activity[];
}

export default function SessionDetailsPage() {
  const { id } = useParams();

  const [sessionData, setSessionData] =
    useState<SessionDetails>({
      checkout: null,
      items: [],
      activity: [],
    });

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH SESSION DETAILS
  // =========================================

  const fetchSessionDetails = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/session/${id}`
      );

      setSessionData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionDetails();
  }, []);

  const totalAmount = Number(
    sessionData.checkout?.total || 0
  );

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <div className="pt-32 text-center text-lg font-semibold">
          Loading session details...
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="pt-24 px-4 lg:px-8 pb-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Session Details
          </h1>

          <p className="text-gray-500 mt-2 break-all">
            Session ID : {id}
          </p>
        </div>

        {/* BUYER DETAILS */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
  {sessionData.checkout ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <p className="text-sm text-gray-500">Buyer Email</p>
        <p className="font-semibold text-lg">
          {sessionData.checkout.buyer_email || "-"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Buyer ID</p>
        <p className="font-semibold text-lg">
          {sessionData.checkout.buyer_id || "-"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Checkout Date</p>
        <p className="font-semibold text-lg">
          {new Date(sessionData.checkout.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  ) : (
    // ✅ Show this for ACTIVE / EXPIRED sessions with no checkout yet
    <p className="text-gray-500 italic">
      No checkout record found for this session.
    </p>
  )}
</div>

{/* SUMMARY CARDS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="text-gray-500 text-sm">Total Products</h2>
    <p className="text-3xl font-bold mt-2">{sessionData.items.length}</p>
  </div>
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="text-gray-500 text-sm">Total Quantity</h2>
    <p className="text-3xl font-bold mt-2">
      {sessionData.items.reduce((acc, item) => acc + item.quantity, 0)}
    </p>
  </div>
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="text-gray-500 text-sm">Checkout Total</h2>
    <p className="text-3xl font-bold mt-2 text-green-600">
      {/* ✅ Show dash if no checkout */}
      {sessionData.checkout ? `₹${totalAmount.toLocaleString()}` : "-"}
    </p>
  </div>
</div>

        {/* PURCHASED ITEMS */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">
              Purchased Items
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-center">
                    S.No
                  </th>

                  <th className="p-4 text-center">
                    Product ID
                  </th>

                  <th className="p-4 text-center">
                    Product Name
                  </th>

                  <th className="p-4 text-center">
                    Price
                  </th>

                  <th className="p-4 text-center">
                    Quantity
                  </th>

                  <th className="p-4 text-center">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {sessionData.items.length > 0 ? (
                  sessionData.items.map(
                    (item, index) => (
                      <tr
                        key={
                          item.product_id
                        }
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4 text-center">
                          {index + 1}
                        </td>

                        <td className="p-4 text-center">
                          {
                            item.product_id
                          }
                        </td>

                        <td className="p-4 text-center font-medium">
                          {item.name}
                        </td>

                        <td className="p-4 text-center">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString()}
                        </td>

                        <td className="p-4 text-center">
                          {item.quantity}
                        </td>

                        <td className="p-4 text-center font-semibold text-green-600">
                          ₹
                          {(
                            Number(
                              item.price
                            ) *
                            item.quantity
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      No purchased items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIVITY LOGS */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">
              Activity Logs
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-center">
                    S.No
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>

                  <th className="p-4 text-center">
                    Data
                  </th>

                  <th className="p-4 text-center">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>
                {sessionData.activity.length >
                0 ? (
                  sessionData.activity.map(
                    (
                      activity,
                      index
                    ) => (
                      <tr
                        key={activity.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4 text-center">
                          {index + 1}
                        </td>

                        <td className="p-4 text-center">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {
                              activity.action
                            }
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          {activity.data ||
                            "-"}
                        </td>

                        <td className="p-4 text-center whitespace-nowrap">
                          {new Date(
                            activity.created_at
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-gray-500"
                    >
                      No activity logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}