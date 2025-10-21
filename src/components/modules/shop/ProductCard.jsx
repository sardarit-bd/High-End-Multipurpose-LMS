"use client";

import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaEye, FaTimes } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowProductDetails(true);
  };

  const closeProductDetails = () => {
    setShowProductDetails(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-2xl">
            <span className="rounded-full bg-white px-4 py-2 font-bold text-gray-800">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute right-3 top-3 z-10 rounded-full p-2 transition-all ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FaHeart className="text-sm" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Quick Actions */}
          <div
            className={`absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button 
              onClick={handleQuickView}
              className="rounded-full bg-white/90 p-3 text-gray-700 backdrop-blur-sm transition-all hover:bg-blue-500 hover:text-white"
            >
              <FaEye className="text-sm" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="rounded-full bg-white/90 p-3 text-gray-700 backdrop-blur-sm transition-all hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
              {product.category}
            </span>
            {product.featured && (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                Featured
              </span>
            )}
          </div>

          <h3 className="mb-2 font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Product Details Popup */}
      {showProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeProductDetails}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 backdrop-blur-sm transition-all hover:bg-red-500 hover:text-white"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Additional images can be added here */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.image}
                        alt={`${product.name} ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                        Featured
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || "No description available for this product. This is a high-quality item with excellent features and great value for money."}
                  </p>
                </div>

                {/* Product Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Key Features:</h3>
                  <ul className="space-y-2 text-gray-600">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    )) || (
                      <>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Premium quality materials
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Excellent customer reviews
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Fast and free shipping
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={(e) => {
                      handleAddToCart(e);
                      closeProductDetails();
                    }}
                    disabled={!product.inStock}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-4 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all ${
                      isWishlisted
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Delivery</div>
                    <div className="font-semibold text-gray-800">2-3 Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">In Stock</div>
                    <div className="font-semibold text-gray-800">
                      {product.inStock ? "Available" : "Out of Stock"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCard;