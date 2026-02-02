"use client";

import { useState } from "react";
import { 
  FaStar, 
  FaHeart, 
  FaShoppingCart, 
  FaEye, 
  FaTimes,
  FaDownload,
  FaTruck,
  FaBox,
  FaTag
} from "react-icons/fa";
import { FileText, Package } from "lucide-react";

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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
       

        {/* Product Type Badge */}
        <div className={`absolute left-3 top-10 z-10 rounded-full px-2 py-1 text-xs font-medium ${
          product.type === "digital" 
            ? "bg-blue-500 text-white" 
            : "bg-green-500 text-white"
        }`}>
          {product.type === "digital" ? "DIGITAL" : "PHYSICAL"}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-2xl">
            <span className="rounded-full bg-white px-4 py-2 font-bold text-gray-800">
              Out of Stock
            </span>
          </div>
        )}

        {/* Status Badge */}
        {!product.isActive && (
          <div className="absolute left-3 top-20 z-10 rounded-full bg-gray-500 px-2 py-1 text-xs font-medium text-white">
            INACTIVE
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
              title="Quick View"
            >
              <FaEye className="text-sm" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="rounded-full bg-white/90 p-3 text-gray-700 backdrop-blur-sm transition-all hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
              {product.category || "Uncategorized"}
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
         

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock & Additional Info */}
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaBox className="h-3 w-3" />
              <span>{product.stock} in stock</span>
            </div>
            <div className="flex items-center gap-1">
              <FaTruck className="h-3 w-3" />
              <span>{product.shippingRequired ? "Shipping" : "No Ship"}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full rounded-xl bg-[#047857] py-2 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
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
                {/* Additional images */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images && product.images.length > 0 ? (
                    product.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    // Show placeholder if no additional images
                    [1, 2, 3, 4].map((index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={product.image}
                          alt={`${product.name} ${index}`}
                          className="h-full w-full object-cover opacity-50"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                      {product.category || "Uncategorized"}
                    </span>
                    {product.featured && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                        Featured
                      </span>
                    )}
                    
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      product.type === "digital" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {product.type === "digital" ? "Digital Product" : "Physical Product"}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      product.isActive 
                        ? "bg-green-100 text-green-600" 
                        : "bg-red-100 text-red-600"
                    }`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {product.name}
                  </h1>

                  {/* Slug */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <FaTag className="h-3 w-3" />
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {product.slug}
                    </code>
                  </div>

                  {/* Rating */}
                  {/* <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                    </span>
                  </div> */}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Description:</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || "No detailed description available for this product. This is a high-quality item with excellent features and great value for money."}
                    </p>
                  </div>
                </div>

                {/* Product Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Product Information:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaBox className="h-4 w-4" />
                        <span>Stock:</span>
                        <span className={`font-semibold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>
                          {product.stock} units
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {product.type === "digital" ? (
                          <>
                            <FileText className="h-4 w-4" />
                            <span>Type: Digital</span>
                          </>
                        ) : (
                          <>
                            <Package className="h-4 w-4" />
                            <span>Type: Physical</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaTruck className="h-4 w-4" />
                        <span>Shipping: {product.shippingRequired ? "Required" : "Not Required"}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-gray-600">
                        <span className="block">Created:</span>
                        <span className="font-medium">{formatDate(product.createdAt)}</span>
                      </div>
                    </div>
                    {product.attributes && product.attributes.length > 0 && (
                        <div>
                          <span className="block text-gray-600 mb-1">Attributes:</span>
                          <div className="flex flex-wrap flex-col gap-1">
                            {product.attributes.map((attr, index) => (
                              <span key={index} className="py-1 text-gray-700 rounded text-xs">
                                {attr}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Digital Download Section */}
                {/* {product.type === "digital" && product.digitalUrl && (
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FaDownload className="text-blue-600 text-lg" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Digital Download Available</h4>
                        <p className="text-sm text-blue-600">Access your digital product after purchase</p>
                      </div>
                    </div>
                    <a
                      href={product.digitalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaDownload className="h-4 w-4" />
                      Preview Digital File
                    </a>
                  </div>
                )} */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
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
                  {/* <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all ${
                      isWishlisted
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button> */}
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