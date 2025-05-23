'use client';

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pizzaOrders from "./pizzaOrders.json";
import { useSession } from "next-auth/react";

// Mock data for pizza orders
const mockOrders = pizzaOrders as Array<{
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: string;
}>;

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-blue-100 text-blue-800",
  "Out for Delivery": "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="text-lg text-black font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }
  if (!session) return null;

  let filteredOrders = mockOrders;
  if (statusFilter) {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }
  filteredOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === "orderDate") {
      return sortOrder === "asc"
        ? new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        : new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    } else if (sortKey === "id") {
      return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center min-h-[60vh] w-full bg-white px-2 sm:px-4 pt-0.5 sm:pt-2">
      <h1 className="text-xl sm:text-3xl font-extrabold mb-2 w-full text-left">Pizza Orders</h1>
      <div className="w-full mb-6 border-b border-gray-200"></div>
      <div className="w-full mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 rounded-lg shadow-sm px-2 sm:px-6 py-3 sm:py-4 mb-4 text-sm sm:text-base">
          <div className="w-full sm:w-auto">
            <label className="mr-2 font-medium">Filter by Status:</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-black focus:border-black w-full sm:w-auto"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              className={`w-full sm:w-auto px-3 py-1 rounded border font-semibold ${sortKey === 'id' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
              onClick={() => {
                setSortKey('id');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Sort by Order ID
            </button>
            <button
              className={`w-full sm:w-auto px-3 py-1 rounded border font-semibold ${sortKey === 'orderDate' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
              onClick={() => {
                setSortKey('orderDate');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Sort by Order Date
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-lg min-h-[320px] bg-white flex flex-col justify-center">
          <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Order ID</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Customer Name</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Pizza Type</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Quantity</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Order Date</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 border-b text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-lg">
                    <span className="flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v2m0-2h-4m4 0h4" /></svg>
                      No orders found for this filter.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-bold text-black">{order.id}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-black">{order.customerName}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-black">{order.pizzaType}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-black">{order.quantity}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-black">{order.orderDate}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full shadow-sm border ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>{order.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 