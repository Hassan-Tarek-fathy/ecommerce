"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Heart, Minus, Plus,ShoppingCart, Star,Loader2,} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products";
import { useCart } from "@/lib/UseCart";


function useToast() {
  return {
    toast: (opts: { title: string; description?: string }) => {
      console.info("toast:", opts.title, opts.description ?? "");
    },
  };
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  category: {
    name: string;
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { toast } = useToast();
  const addItem = useCart((state) => state.addItem);

  // حالات التحكم في المنتج وحالة التحميل
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState(0);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data as unknown as ProductData);
        }
      } catch (error) {
        console.error("فشل في جلب بيانات المنتج:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[image] || "/placeholder.jpg",
    });

    toast({
      title: "تم الإضافة إلى السلة",
      description: `تم إضافة ${quantity} من (${product.name}) إلى سلتك بنجاح.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
        <p className="text-sm font-medium text-gray-500">جاري تحميل تفاصيل المنتج...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4 pt-28">
        <h2 className="text-xl font-bold text-gray-800">عذراً، هذا المنتج غير متوفر أو تم حذفه!</h2>
        <Link href="/products">
          <Button className="bg-orange-500 hover:bg-orange-600">العودة لقائمة المنتجات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 pt-28 pb-12">
      <div className="container mx-auto px-4">
        
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition"
        >
          <ArrowRight size={18} />
          العودة للمتجر
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
              <Image
                src={product.images[image] || "/placeholder.jpg"}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                      image === index ? "border-orange-500 scale-95" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
              {product.category.name}
            </span>

            <h1 className="mt-4 text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">{product.rating}</span>
              <span className="text-gray-400">| منتج موثوق</span>
            </div>

            <div className="mt-6 flex items-end gap-4 border-b border-gray-100 pb-6">
              <h2 className="text-3xl font-black text-orange-600">
                {product.price} ج.م
              </h2>
              {product.discountPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">
                  {product.discountPrice} ج.م
                </span>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-gray-600 text-sm sm:text-base">
              {product.description}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-bold text-gray-800 text-sm">المقاس المتاح:</h3>
                <div className="flex gap-3">
                  {product.sizes.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => setSize(index)}
                      className={`rounded-xl border px-5 py-2 text-xs font-bold transition ${
                        size === index
                          ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-bold text-gray-800 text-sm">اللون المتاح:</h3>
                <div className="flex gap-3">
                  {product.colors.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => setColor(index)}
                      className={`h-9 w-9 rounded-full border-4 shadow-sm transition ${item} ${
                        color === index ? "border-orange-500 scale-110" : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="mb-3 font-bold text-gray-800 text-sm">الكمية المطلوبة:</h3>
              <div className="flex w-fit items-center rounded-xl border border-gray-200 p-0.5 bg-gray-50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-200"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">المخزون المتوفر: {product.stock} قطع فقط</p>
            </div>

            <div className="mt-10 flex gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-13 bg-orange-500 hover:bg-orange-600 font-bold text-base rounded-xl transition shadow-lg shadow-orange-500/10 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? "نفذت الكمية" : "إضافة إلى السلة"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-13 w-13 rounded-xl border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-pink-500"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-2 font-bold text-gray-800 text-xs">ملخص الاختيار الحالي:</h3>
              <div className="space-y-1.5 text-xs text-gray-500">
                <p><span className="font-medium text-gray-700">رقم الباركود (ID):</span> {product.id}</p>
                {product.sizes.length > 0 && (
                  <p><span className="font-medium text-gray-700">المقاس:</span> {product.sizes[size]}</p>
                )}
                <p><span className="font-medium text-gray-700">الإجمالي الفرعي:</span> {product.price * quantity} ج.م</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}