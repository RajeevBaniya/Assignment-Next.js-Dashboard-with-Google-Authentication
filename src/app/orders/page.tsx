'use client';

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pizzaOrders from "./pizzaOrders.json";
import { useSession } from "next-auth/react";
import { CheckCircleIcon, ClockIcon, TruckIcon, ShoppingBagIcon, XCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

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
  Pending: "bg-cheese text-text border-cheese",
  Preparing: "bg-blue-50 text-blue-700 border-blue-200",
  "Out for Delivery": "bg-purple-50 text-purple-700 border-purple-200",
  Delivered: "bg-basil text-text border-basil",
  Cancelled: "bg-tomato/20 text-tomato border-tomato",
};

function getStatusColor(status: string) {
  return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800 border-gray-200";
}

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

  // Summary stats
  const totalOrders = mockOrders.length;
  const delivered = mockOrders.filter(o => o.status === "Delivered").length;
  const preparing = mockOrders.filter(o => o.status === "Preparing").length;
  const outForDelivery = mockOrders.filter(o => o.status === "Out for Delivery").length;
  const cancelled = mockOrders.filter(o => o.status === "Cancelled").length;
  const pending = mockOrders.filter(o => o.status === "Pending").length;

  return (
    <div className="flex flex-col items-center min-h-[60vh] w-full bg-cream px-2 sm:px-4 pt-0.5 sm:pt-2">
      <h1 className="text-xl sm:text-3xl font-extrabold mb-2 w-full text-left text-tomato">Pizza Orders</h1>
      <div className="w-full mb-6 border-b border-cheese"></div>
      {/* Cards */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="flex flex-col items-center justify-center gap-1 bg-crust box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <ShoppingBagIcon className="w-5 h-5 text-tomato" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{totalOrders}</div>
            <div className="text-sm text-text/70">Total Orders</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-yellow-50 box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <PauseCircleIcon className="w-5 h-5 text-yellow-400" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{pending}</div>
            <div className="text-sm text-text/70">Pending</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-basil/20 box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <CheckCircleIcon className="w-5 h-5 text-basil" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{delivered}</div>
            <div className="text-sm text-text/70">Delivered</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-blue-50 box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <ClockIcon className="w-5 h-5 text-blue-400" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{preparing}</div>
            <div className="text-sm text-text/70">Preparing</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-purple-50 box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <TruckIcon className="w-5 h-5 text-purple-500" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{outForDelivery}</div>
            <div className="text-sm text-text/70">Out for Delivery</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-tomato/10 box-border rounded-lg shadow py-2 w-full max-w-xs mx-auto">
          <XCircleIcon className="w-5 h-5 text-tomato" />
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-text">{cancelled}</div>
            <div className="text-sm text-text/70">Cancelled</div>
          </div>
        </div>
      </div>
      <div className="w-full mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-crust/40 rounded-lg shadow-sm px-2 sm:px-6 py-3 sm:py-4 mb-4 text-sm sm:text-base">
          <div className="w-full sm:w-auto">
            <label className="mr-2 font-medium text-text">Filter by Status:</label>
            <select
              className="border border-cheese rounded px-2 py-1 focus:ring-2 focus:ring-tomato focus:border-tomato w-full sm:w-auto bg-cream text-text"
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
              className={`w-full sm:w-auto px-3 py-1 rounded border font-semibold transition-colors duration-200 ${sortKey === 'id' ? 'bg-tomato text-white border-tomato' : 'bg-cream text-text border-cheese hover:bg-tomato hover:text-white'}`}
              onClick={() => {
                setSortKey('id');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Sort by Order ID
            </button>
            <button
              className={`w-full sm:w-auto px-3 py-1 rounded border font-semibold transition-colors duration-200 ${sortKey === 'orderDate' ? 'bg-tomato text-white border-tomato' : 'bg-cream text-text border-cheese hover:bg-tomato hover:text-white'}`}
              onClick={() => {
                setSortKey('orderDate');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Sort by Order Date
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-lg min-h-[320px] bg-crust/10 flex flex-col justify-center">
          <table className="min-w-full bg-cream border border-cheese rounded-2xl overflow-hidden text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-cheese/60">
              <tr>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Order ID</th>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Customer Name</th>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-text uppercase tracking-wider">Pizza Type</th>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-text uppercase tracking-wider">Quantity</th>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-text uppercase tracking-wider">Order Date</th>
                <th className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-text uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cheese/40">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-cheese text-lg">
                    <span className="flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-cheese" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v2m0-2h-4m4 0h4" /></svg>
                      No orders found for this filter.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cheese/30 transition-colors duration-200 cursor-pointer">
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-bold text-text text-left">{order.id}</td>
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text text-left">{order.customerName}</td>
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text text-left">{order.pizzaType}</td>
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text text-center">{order.quantity}</td>
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text text-center">{order.orderDate}</td>
                    <td className="border border-cheese px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                      <span className={`px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full shadow-sm border ${getStatusColor(order.status)}`}>{order.status}</span>
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
