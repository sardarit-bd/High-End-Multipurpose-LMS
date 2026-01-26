"use client";
import { CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { useState, useEffect } from "react";

// Custom hook for orders stats
const useOrderStats = () => {
  return useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await api.get('/orders', { params: { limit: 1000 } });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function OrderStats() {
  const { data: ordersData, isLoading, error } = useOrderStats();

  const orders = ordersData?.data?.orders || [];
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    paidOrders: 0,
    pendingOrders: 0,
    failedOrders: 0
  });

  useEffect(() => {
    if (orders.length > 0) {
      const paidOrders = orders.filter(order => order.status === 'paid');
      const totalRevenue = paidOrders.reduce((sum, order) => sum + order.amount, 0);
      const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;
      
      setStats({
        totalRevenue,
        totalOrders: orders.length,
        avgOrderValue,
        paidOrders: paidOrders.length,
        pendingOrders: orders.filter(order => order.status === 'pending').length,
        failedOrders: orders.filter(order => order.status === 'failed' || order.status === 'canceled').length
      });
    }
  }, [orders]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-6 bg-white rounded-[--radius-card] shadow-md animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
        Error loading order statistics
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Revenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white rounded-[--radius-card] shadow-md border border-gray-100"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">From {stats.paidOrders} successful payments</p>
        </div>
      </motion.div>

      {/* Total Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-white rounded-[--radius-card] shadow-md border border-gray-100"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs">
            <span className="text-emerald-600">{stats.paidOrders} Paid</span>
            <span className="text-amber-600">{stats.pendingOrders} Pending</span>
            <span className="text-red-600">{stats.failedOrders} Failed</span>
          </div>
        </div>
      </motion.div>

      {/* Average Order Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white rounded-[--radius-card] shadow-md border border-gray-100"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg Order Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.avgOrderValue.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">Average revenue per order</p>
        </div>
      </motion.div>
    </div>
  );
}