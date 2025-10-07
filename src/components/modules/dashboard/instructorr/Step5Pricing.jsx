"use client";

import { useCourseStore } from "@/store/useCourseStore";

export default function Step5Pricing() {
  const course = useCourseStore((s) => s.course);
  const updatePricing = useCourseStore((s) => s.updatePricing);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pricing</h3>

      <div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={course.pricing.free} onChange={() => updatePricing({ free: !course.pricing.free })} />
          <span className="text-sm"> Check if this is a free course</span>
        </label>
      </div>

      {!course.pricing.free && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Course Price ($)</label>
              <input value={course.pricing.price} onChange={(e) => updatePricing({ price: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={course.pricing.hasDiscount} onChange={(e) => updatePricing({ hasDiscount: e.target.checked })} />
                <span> Check if this course has discount</span>
              </label>
            </div>

            {course.pricing.hasDiscount && (
              <div>
                <label className="text-sm font-medium">Discount Price ($)</label>
                <input value={course.pricing.discountPrice} onChange={(e) => updatePricing({ discountPrice: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            )}
          </div>
        </>
      )}

      <div>
        <label className="text-sm font-medium">Expiry Period</label>
        <div className="mt-2 flex items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="expiry" checked={course.pricing.expiry === "lifetime"} onChange={() => updatePricing({ expiry: "lifetime" })} />
            <span>Lifetime</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="expiry" checked={course.pricing.expiry === "limited"} onChange={() => updatePricing({ expiry: "limited" })} />
            <span>Limited Time</span>
          </label>
        </div>
        {course.pricing.expiry === "limited" && (
          <div className="mt-3">
            <label className="text-sm">Number of months</label>
            <input value={course.pricing.months} onChange={(e) => updatePricing({ months: e.target.value })} className="w-48 border rounded px-3 py-2 text-sm mt-1" />
          </div>
        )}
      </div>
    </div>
  );
}
