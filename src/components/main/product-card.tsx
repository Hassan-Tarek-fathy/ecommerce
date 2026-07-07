"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/UseCart";
import { toast } from "sonner";
export interface ProductProps {
  product: {
    id: string;
    title: string;
    price: number;
    oldPrice: number | null  ;
    image: string;
    category: string;
    rating: number;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع الانتقال لصفحة التفاصيل عند الضغط على الزر
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
    toast.success("تم إضافة المنتج إلى سلة المشتريات بنجاح.");
  };

  return (
    <Card 
      onClick={() => router.push(`/product/${product.id}`)}
      className="group relative overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 cursor-pointer"
    >
      {/* زر المفضلة */}
      <button 
        onClick={(e) => e.stopPropagation()} 
        className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/60 text-white backdrop-blur-md transition hover:bg-pink-500 hover:scale-110"
      >
        <Heart size={18} />
      </button>

      {/* قسم الصورة مع تأثير ظهور زر التفاصيل */}
      <CardHeader className="p-0 relative overflow-hidden aspect-square w-full bg-slate-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" className="bg-white text-slate-950 font-bold rounded-xl gap-2 hover:bg-slate-200">
            <Eye size={16} />
            عرض التفاصيل
          </Button>
        </div>
        {product.oldPrice && (
          <span className="absolute right-4 top-4 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
            خصم
          </span>
        )}
      </CardHeader>

      {/* تفاصيل المنتج */}
      <CardContent className="p-5 space-y-2">
        <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20 w-max block">
          {product.category}
        </span>
        <h3 className="line-clamp-1 font-bold text-white transition group-hover:text-orange-400">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={14} className="fill-amber-400" />
          <span className="text-xs font-bold text-slate-300">{product.rating}</span>
        </div>
      </CardContent>

      {/* السعر وزر السلة */}
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
        <div className="flex flex-col">
          <span className="text-xl font-black text-white">{product.price} ج.م</span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">{product.oldPrice} ج.م</span>
          )}
        </div>

        <Button 
          size="icon" 
          onClick={handleAddToCart}
          className="h-11 w-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg hover:scale-110 transition duration-300"
        >
          <ShoppingCart size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}