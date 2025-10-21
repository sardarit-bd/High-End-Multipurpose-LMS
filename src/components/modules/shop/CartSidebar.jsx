"use client";

import { useTranslation } from "react-i18next";
import { FaTimes, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  total
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <section>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">
              {t("cart.title")} ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {t("cart.emptyTitle")}
              </h3>
              <p className="text-gray-500 mb-6">{t("cart.emptySubtitle")}</p>
              <button
                onClick={onClose}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gray-200 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-lg font-bold text-blue-600">
                      ${item.price}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="ml-auto text-sm text-red-500 hover:text-red-600"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">{t("cart.subtotal")}</span>
              <span className="text-xl font-bold text-gray-800">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">{t("cart.shipping")}</span>
              <span className="font-semibold text-green-600">
                {t("cart.free")}
              </span>
            </div>
            <div className="mb-6 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-semibold text-gray-800">
                {t("cart.total")}
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartSidebar;
