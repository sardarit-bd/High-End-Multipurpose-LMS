"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import {
    Package,
    Check,
    Star,
    Clock,
    Users,
    BookOpen,
    ChevronRight,
    Shield,
    TrendingUp,
    Zap,
    Search,
    Filter,
    Grid,
    List,
    Sparkles,
    Award,
    BadgeCheck,
    ShoppingCart
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function PublicPackagesPage() {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const { user } = useAuth()

    useEffect(() => {
        fetchPackages();
    }, []);

    useEffect(() => {
        filterAndSortPackages();
    }, [packages, search]);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await api.get("/packages");
            setPackages(res.data.data || []);
        } catch (error) {
            console.error("Error fetching packages:", error);
            toast.error("Failed to load packages");
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortPackages = () => {
        let filtered = [...packages];

        // Apply search filter
        if (search) {
            filtered = filtered.filter(pkg =>
                pkg.name.toLowerCase().includes(search.toLowerCase()) ||
                pkg.description?.toLowerCase().includes(search.toLowerCase()) ||
                pkg.features?.some(feature =>
                    feature.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
        setFilteredPackages(filtered);
    };

    const handlePurchase = async (pkg) => {
        e.preventDefault();

        // Check if user is logged in
        console.log(user)
        if (!user) {
            toast.error("Please login to make a donation");
            return;
        }


        try {
            const orderData = {
                fund: selectedFundData.id,
                amount: parseFloat(donationAmount),
                provider: selectedProvider,
                currency: "USD"
            };

            console.log("Processing order", orderData);


            const res = await api.post('package/checkout', orderData)
            const { checkoutUrl } = res?.data?.data

            if (checkoutUrl) {
                window.location.href = checkoutUrl
            }


        } catch (error) {
            console.error("Package Order error:", error);
            toast.error("Error package ordering. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 pb-10 px-4">
                <div className="container mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto"></div>
                        <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="text-center mb-12 bg-gradient-to-r from-[#059669] to-[#0f9293] text-white py-28">
                <div className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4" />
                    Limited Time Offers
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Master with Course Packages
                </h1>
                <p className="text-xl max-w-2xl mx-auto mb-8">
                    Bundle courses together and save up to 60%. Get lifetime access to curated collections.
                </p>
            </div>
            <div className="container mx-auto pt-20 pb-10 px-4">


                {/* Filters & Search */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search packages by name, features, or courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Packages Grid/List */}
                {filteredPackages.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">
                            No packages found
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            {search ? "Try a different search term" : "Check back soon for new package deals!"}
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("all");
                            }}
                            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition shadow-md"
                        >
                            View All Packages
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg) => {
                            const totalValue = pkg.comparePrice;

                            return (
                                <div key={pkg._id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                                    {/* Package Image/Header */}
                                    <div className="relative h-48 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Package className="h-20 w-20 text-[var(--color-primary)] opacity-30" />
                                        </div>

                                        {/* Package Name */}
                                        <div className="absolute bottom-4 left-6 right-6">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                        </div>
                                    </div>

                                    {/* Package Content */}
                                    <div className="p-6">
                                        {/* Price & Savings Section */}
                                        <div className="mb-6">
                                            <div className="flex items-end gap-2 mb-1">
                                                <span className="text-3xl font-bold text-gray-900">${pkg.price.toFixed(2)}</span>
                                                {pkg.comparePrice > pkg.price && (
                                                    <span className="text-lg text-gray-500 line-through">${pkg.comparePrice.toFixed(2)}</span>
                                                )}
                                                {totalValue > pkg.price && (
                                                    <span className="text-sm text-gray-600 ml-auto">
                                                        Value: <span className="font-bold">${totalValue.toFixed(2)}</span>
                                                    </span>
                                                )}
                                            </div>
                                            {pkg.savingsPercentage > 0 && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                        Save {pkg.savingsPercentage}%
                                                    </div>
                                                    <div className="text-sm text-green-600 font-medium">
                                                        (Save ${(totalValue - pkg.price).toFixed(2)})
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Included Courses Section */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                                <BookOpen className="h-5 w-5 text-[var(--color-secondary)]" />
                                                Included Courses:
                                            </h4>
                                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                                {pkg.courseIds?.map((course, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
                                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                                            {course.thumbnail ? (
                                                                <img
                                                                    src={course.thumbnail}
                                                                    alt={course.title}
                                                                    className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-md flex items-center justify-center flex-shrink-0">
                                                                    <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0 flex-1">
                                                                <div className="font-medium text-gray-900 truncate">{course.title}</div>
                                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                    <span className={`px-2 py-0.5 rounded-full ${course.level === 'beginner' ? 'bg-blue-100 text-blue-700' :
                                                                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-red-100 text-red-700'
                                                                        }`}>
                                                                        {course.level}
                                                                    </span>
                                                                    <span>•</span>
                                                                    <span>{course.noOfStudents || 0} students</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                ${course.price?.toFixed(2) || '0.00'}
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {pkg.courseIds?.length > 0 && (
                                                <div className="mt-2 text-sm text-gray-500 text-center">
                                                    Total {pkg.courseIds.length} courses • {pkg.accessDays || 'Lifetime'} access
                                                </div>
                                            )}
                                        </div>

                                        {/* Key Features */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                                <Zap className="h-5 w-5 text-[var(--color-accent)]" />
                                                Package Benefits:
                                            </h4>
                                            <div className="space-y-2">
                                                {pkg.features?.slice(0, 4).map((feature, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                                {pkg.features?.length > 4 && (
                                                    <div className="text-sm text-gray-500 text-center pt-2">
                                                        +{pkg.features.length - 4} more benefits
                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                        {/* CTA Button */}
                                        <Link
                                            href={`/package-checkout/${pkg._id}`}
                                            className="w-full bg-[var(--color-primary)]  text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
                                        >
                                            <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                                            Get This Package
                                            <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>

                                        {/* Guarantee & Support */}
                                        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                                            <div className="inline-flex items-center gap-2 text-xs text-gray-600 justify-center">
                                                <Shield className="h-3 w-3 text-green-500" />
                                                30-Day Guarantee
                                            </div>
                                            <div className="inline-flex items-center gap-2 text-xs text-gray-600 justify-center">
                                                <Clock className="h-3 w-3 text-blue-500" />
                                                Lifetime Updates
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* FAQ/Info Section */}
                <div className="mt-20 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Our Packages?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Get the most value for your learning journey with our carefully curated bundles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Best Value</h3>
                            <p className="text-gray-600">
                                Save up to 60% compared to buying courses individually
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Learn at Your Pace</h3>
                            <p className="text-gray-600">
                                Lifetime access to all course materials and updates
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Risk-Free Learning</h3>
                            <p className="text-gray-600">
                                30-day money-back guarantee on all packages
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}