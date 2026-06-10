import React from "react";
import AdminNavbar from "@/components/AdminNavbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Apr", sales: 120 },
  { month: "May", sales: 180 },
  { month: "Jun", sales: 250 },
];

const revenueData = [
  { month: "Apr", revenue: 50000 },
  { month: "May", revenue: 85000 },
  { month: "Jun", revenue: 110000 },
];

const AdminReportsPage = () => {
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-50 mt-16">
        {/* HEADER */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6 py-12 lg:px-20">
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Admin Analytics
            </p>

            <h1 className="mt-3 text-5xl font-black text-gray-900">
              Reports Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Track your store performance with simple sales and revenue
              insights.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="px-6 py-10 lg:px-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-500">Total Revenue</h3>
              <h2 className="mt-2 text-4xl font-black text-green-600">
                ₹2,45,000
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-500">Total Orders</h3>
              <h2 className="mt-2 text-4xl font-black text-pink-600">
                1,250
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-500">Customers</h3>
              <h2 className="mt-2 text-4xl font-black text-blue-600">
                890
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-500">Products</h3>
              <h2 className="mt-2 text-4xl font-black text-orange-600">
                320
              </h2>
            </div>

          </div>
        </section>

        {/* CHARTS */}
        <section className="px-6 pb-20 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* SALES CHART */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Total Sales (Last 3 Months)
              </h2>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="sales"
                      fill="#ec4899"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* REVENUE CHART */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Revenue Trend
              </h2>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default AdminReportsPage;