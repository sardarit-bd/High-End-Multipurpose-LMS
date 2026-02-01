"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ShoppingCart, CreditCard, Calendar, DollarSign } from "lucide-react";

// Fetch orders hook
const useMyOrders = () => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const res = await api.get('/orders/me');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
}

// Format price
function formatPrice(price, currency = 'USD') {
  const symbols = {
    USD: '$',
    GBP: '£',
    EUR: '€',
  };
  return `${symbols[currency] || currency} ${price.toFixed(2)}`;
}

// Get payment method display name
function getPaymentMethod(provider) {
  const methods = {
    stripe: 'Credit Card',
    paypal: 'PayPal',
    razorpay: 'Razorpay',
  };
  return methods[provider] || provider;
}

export default function PurchaseHistory() {
  const { data: ordersData, isLoading, error } = useMyOrders();

  const orders = ordersData?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white shadow-md px-4 p-6 md:p-12 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Purchase History</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md px-4 p-6 md:p-12 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-text)]">Purchase History</h2>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error loading purchase history. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md px-4 p-6 md:p-12 rounded-lg text-[var(--color-text)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Purchase History</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShoppingCart className="h-5 w-5" />
          <span>{orders.length} {orders.length === 1 ? 'Order' : 'Orders'}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No purchases yet</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 text-sm font-semibold">Order ID</th>
                  <th className="p-3 text-sm font-semibold">Item Type</th>
                  <th className="p-3 text-sm font-semibold">Price</th>
                  <th className="p-3 text-sm font-semibold">Payment Status</th>
                  <th className="p-3 text-sm font-semibold">Payment Method</th>
                  <th className="p-3 text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 text-sm font-mono text-gray-600">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="p-3">
                      <span className="capitalize">{order.itemType}</span>
                    </td>
                    <td className="p-3 font-semibold">
                      {formatPrice(order.price, order.currency)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">{getPaymentMethod(order.provider)}</td>
                    <td className="p-3 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-sm">#{order._id.slice(-8)}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      order.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{order.itemType}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-[var(--color-primary)]">
                      {formatPrice(order.price, order.currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Method:</span>
                    <span>{getPaymentMethod(order.provider)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}