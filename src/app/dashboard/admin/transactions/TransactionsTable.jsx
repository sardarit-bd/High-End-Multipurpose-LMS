"use client";
import { FileText, Package, Calendar, ShoppingCart, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom hook for orders with search
const useOrders = (query = {}) => {
  return useQuery({
    queryKey: ['orders-search', query],
    queryFn: async () => {
      const res = await api.get('/orders', { params: query });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function TransactionsTable({ search, page, limit, onPageChange }) {
  const { data: ordersData, isLoading, error } = useOrders({
    q: search,
    page,
    limit
  });

  const orders = ordersData?.data?.orders || [];
  console.log(ordersData);
  const total = ordersData?.data?.total || 0;
  const totalPages = ordersData?.data?.totalPages || 1;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'canceled': return 'bg-gray-100 text-gray-700';
      case 'refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      case 'canceled': return 'Canceled';
      case 'refunded': return 'Refunded';
      default: return status;
    }
  };

  const getItemTypeIcon = (itemType) => {
    switch (itemType) {
      case 'course': return <FileText className="w-4 h-4" />;
      case 'package': return <Package className="w-4 h-4" />;
      case 'ecommerce': return <ShoppingCart className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getItemTypeText = (itemType) => {
    switch (itemType) {
      case 'course': return 'Course';
      case 'package': return 'Package';
      case 'ecommerce': return 'Product';
      case 'event': return 'Event';
      default: return itemType;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-[--radius-card] p-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border-b animate-pulse">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-[--radius-card]">
        Error loading transactions data
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-[--radius-card] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr className="text-left">
              <th className="p-4 font-semibold text-gray-700">Transaction ID</th>
              <th className="p-4 font-semibold text-gray-700">User</th>
              <th className="p-4 font-semibold text-gray-700">Type</th>
              <th className="p-4 font-semibold text-gray-700">Amount</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, index) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-900 font-mono text-xs">
                    {order.transactionId?.slice(0, 20)}...
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-900">{order.userName || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{order.userEmail || 'No email'}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getItemTypeIcon(order.itemType)}
                    </div>
                    <span className="font-medium text-gray-700">
                      {getItemTypeText(order.itemType)}
                    </span>
                  </div>
                  {order.itemType === 'Donation' && <div className="text-xs text-gray-500">{order?.fund || 'NA'}</div>}
                  {order.itemType === 'event' && <div className="text-xs text-gray-500">{order?.event || 'NA'}</div>}
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-900">{order.amountFormatted}</div>
                  <div className="text-xs text-gray-500 capitalize">{order.provider}</div>
                </td>
                <td className="p-4 text-gray-600">{order.dateFormatted}</td>
                <td className="p-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Orders Message */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No transactions found</div>
          {search && (
            <p className="text-gray-500 mt-2">Try a different search term</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing {orders.length} of {total} transactions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className={`p-2 rounded-lg ${page === 1 ? 'text-gray-400 bg-gray-100' : 'text-[#189E75] hover:bg-[#189E75]/10'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-9 h-9 rounded-lg text-sm ${page === pageNum 
                        ? 'bg-[#189E75] text-white shadow' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className={`p-2 rounded-lg ${page === totalPages ? 'text-gray-400 bg-gray-100' : 'text-[#189E75] hover:bg-[#189E75]/10'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}