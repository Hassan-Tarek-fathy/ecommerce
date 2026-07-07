"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  { label: "كل الأقسام", value: "all" },
  { label: "إلكترونيات", value: "electronics" },
  { label: "الأزياء", value: "fashion" },
  { label: "المنزل", value: "home" },
  { label: "العناية والجمال", value: "beauty" },
];

const COLORS = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Gray"];

export function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const currentMin = Number(searchParams.get("min")) || 0;
  const currentMax = Number(searchParams.get("max")) || 10000;
  const selectedColors = searchParams.get("color")?.split(",") || [];
  const currentRating = searchParams.get("rating") || "";
  const currentStock = searchParams.get("stock") || "";

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // تصفير الصفحة عند التصفية
    if (!value || value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  function toggleColor(color: string) {
    let newColors = [...selectedColors];
    if (newColors.includes(color)) {
      newColors = newColors.filter((c) => c !== color);
    } else {
      newColors.push(color);
    }
    updateParams("color", newColors.length ? newColors.join(",") : null);
  }

  return (
    <div className={`space-y-8 p-4 bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-md ${isPending ? "opacity-60" : ""}`}>
      {/* الأقسام */}
      <div>
        <h3 className="font-bold text-white mb-4 text-sm border-r-2 border-orange-500 pr-2">الأقسام</h3>
        <RadioGroup value={currentCategory} onValueChange={(val) => updateParams("category", val)}>
          {CATEGORIES.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-reverse space-x-2 py-1">
              <RadioGroupItem value={cat.value} id={cat.value} className="border-white/30 text-orange-500" />
              <Label htmlFor={cat.value} className="text-slate-300 text-sm cursor-pointer">{cat.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* نطاق السعر */}
      <div>
        <h3 className="font-bold text-white mb-4 text-sm border-r-2 border-orange-500 pr-2">نطاق السعر</h3>
        <Slider
          defaultValue={[currentMin, currentMax]}
          max={10000}
          step={100}
          onValueCommitted={(val) => {
            const params = new URLSearchParams(searchParams.toString());
            const range = Array.isArray(val) ? val : [val, val];
            params.set("min", range[0].toString());
            params.set("max", range[1].toString());
            router.push(`/products?${params.toString()}`);
          }}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>{currentMin} ج.م</span>
          <span>{currentMax} ج.م</span>
        </div>
      </div>

      {/* الألوان */}
      <div>
        <h3 className="font-bold text-white mb-4 text-sm border-r-2 border-orange-500 pr-2">الألوان</h3>
        <div className="grid grid-cols-2 gap-2">
          {COLORS.map((color) => (
            <div key={color} className="flex items-center space-x-reverse space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
                className="border-white/30 data-[state=checked]:bg-orange-500"
              />
              <Label htmlFor={color} className="text-slate-300 text-xs cursor-pointer">{color}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* التقييم */}
      <div>
        <h3 className="font-bold text-white mb-4 text-sm border-r-2 border-orange-500 pr-2">تقييم العملاء</h3>
        <RadioGroup value={currentRating} onValueChange={(val) => updateParams("rating", val)}>
          <div className="flex items-center space-x-reverse space-x-2 py-1">
            <RadioGroupItem value="4" id="r4" className="border-white/30" />
            <Label htmlFor="r4" className="text-slate-300 text-sm cursor-pointer">4 ★ وِأعلى</Label>
          </div>
          <div className="flex items-center space-x-reverse space-x-2 py-1">
            <RadioGroupItem value="3" id="r3" className="border-white/30" />
            <Label htmlFor="r3" className="text-slate-300 text-sm cursor-pointer">3 ★ وِأعلى</Label>
          </div>
        </RadioGroup>
      </div>

      {/* التوفر */}
      <div>
        <h3 className="font-bold text-white mb-4 text-sm border-r-2 border-orange-500 pr-2">حالة التوفر</h3>
        <RadioGroup value={currentStock} onValueChange={(val) => updateParams("stock", val)}>
          <div className="flex items-center space-x-reverse space-x-2 py-1">
            <RadioGroupItem value="in" id="s_in" className="border-white/30" />
            <Label htmlFor="s_in" className="text-slate-300 text-sm cursor-pointer">في المخزن</Label>
          </div>
          <div className="flex items-center space-x-reverse space-x-2 py-1">
            <RadioGroupItem value="out" id="s_out" className="border-white/30" />
            <Label htmlFor="s_out" className="text-slate-300 text-sm cursor-pointer">نفذت الكمية</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}