"use client";

import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
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
          <button className="rounded-full bg-white/90 p-3 text-gray-700 backdrop-blur-sm transition-all hover:bg-blue-500 hover:text-white">
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
  );
};

export default ProductCard;