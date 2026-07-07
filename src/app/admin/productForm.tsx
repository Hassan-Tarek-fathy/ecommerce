"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { createProduct, updateProduct } from "@/lib/products";

const formSchema = z.object({
  name: z.string().min(3, "الاسم قصير جداً"),
  description: z.string().min(10, "الوصف تفصيلي مطلوب"),
  price: z.coerce.number().positive(),
  discountPrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().uuid("اختر قسم صحيح"),
  images: z.string().transform((val) => val.split(",").map(s => s.trim())),
  colors: z.array(z.string()).min(1, "اختر لوناً واحداً على الأقل"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

interface ProductFormProps {
  categories: { id: string; name: string }[];
  initialData?: any;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { featured: false, active: true, colors: [] },
  });

  const selectedColors = watch("colors") || [];

  async function onSubmit(data: any) {
    try {
      if (initialData) {
        await updateProduct(initialData.id, data);
        toast.success("تم التحديث بنجاح");
      } else {
        await createProduct(data);
        toast.success("تم إنشاء المنتج بنجاح");
      }
    } catch {
      toast.error("حدث خطأ غير متوقع");
    }
  }

  const colorOptions = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Gray"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl bg-slate-900 p-8 rounded-3xl border border-white/10 text-white">
      <h2 className="text-xl font-bold mb-4">{initialData ? "تعديل منتج" : "إضافة منتج جديد"}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-300 block mb-2">اسم المنتج</label>
          <Input {...register("name")} className="bg-slate-950 border-white/10" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className="text-sm text-slate-300 block mb-2">القسم</label>
          <select 
            {...register("categoryId")} 
            className="w-full h-10 rounded-md bg-slate-950 border border-white/10 px-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">اختر القسم...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-300 block mb-2">الوصف</label>
        <Textarea {...register("description")} className="bg-slate-950 border-white/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-slate-300 block mb-2">السعر الأساسي</label>
          <Input type="number" {...register("price")} className="bg-slate-950 border-white/10" />
        </div>
        <div>
          <label className="text-sm text-slate-300 block mb-2">سعر الخصم (اختياري)</label>
          <Input type="number" {...register("discountPrice")} className="bg-slate-950 border-white/10" />
        </div>
        <div>
          <label className="text-sm text-slate-300 block mb-2">المخزون (Stock)</label>
          <Input type="number" {...register("stock")} className="bg-slate-950 border-white/10" />
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-300 block mb-2">روابط الصور (مفصولة بفاصلة `,` )</label>
        <Input {...register("images")} placeholder="/images/products/image1.jpg, /images/products/image2.jpg" className="bg-slate-950 border-white/10" />
      </div>

      <div>
        <label className="text-sm text-slate-300 block mb-2">الألوان المتاحة (Multi-Select)</label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => {
            const isSelected = selectedColors.includes(color);
            return (
              <button
                type="button"
                key={color}
                onClick={() => {
                  const updated = isSelected 
                    ? selectedColors.filter((c: string) => c !== color)
                    : [...selectedColors, color];
                  setValue("colors", updated);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${isSelected ? "bg-orange-500 border-orange-500 text-white" : "bg-slate-950 border-white/10 text-slate-400"}`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center space-x-reverse space-x-3">
          <Switch 
            checked={watch("featured")} 
            onCheckedChange={(val) => setValue("featured", val)} 
          />
          <span className="text-sm">تمييز المنتج (Featured)</span>
        </div>
        <div className="flex items-center space-x-reverse space-x-3">
          <Switch 
            checked={watch("active")} 
            onCheckedChange={(val) => setValue("active", val)} 
          />
          <span className="text-sm">نشط في المتجر (Active)</span>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl">
        {initialData ? "حفظ التعديلات" : "إضافة المنتج للمتجر"}
      </Button>
    </form>
  );
}