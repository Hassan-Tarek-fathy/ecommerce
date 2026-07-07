"use client";

import { useCart } from "@/lib/UseCart";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  // حساب إجمالي السلة
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = items.length > 0 ? 50 : 0; // مصاريف شحن تجريبية

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <ShoppingBag className="text-orange-500" />
          سلة المشتريات
        </h1>

        {items.length === 0 ? (
          /* حالة السلة فارغة */
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 max-w-2xl mx-auto space-y-6">
            <div className="p-4 bg-orange-500/10 text-orange-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-orange-500/25">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-bold">سلتك فارغة حالياً!</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              قم بالتجول في المتجر وأضف بعض المنتجات المميزة لتراها هنا وتكمل عملية الشراء.
            </p>
            <Link href="/products" className="inline-block">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold rounded-xl h-11 px-6">
                ابدأ التسوق الآن
              </Button>
            </Link>
          </div>
        ) : (
          /* شبكة عرض محتويات السلة */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* المنتجات المضافة */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-3xl backdrop-blur-md"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-white truncate">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">الكمية: {item.quantity}</p>
                    <p className="text-sm font-black text-orange-400 mt-1">{item.price} ج.م</p>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <Button 
                  variant="link" 
                  onClick={clearCart}
                  className="text-xs text-red-400 p-0 hover:text-red-500"
                >
                  تفريغ السلة بالكامل
                </Button>
                
                <Link href="/products" className="text-xs text-orange-400 hover:underline flex items-center gap-1">
                  إضافة المزيد من المنتجات <ArrowRight size={14} className="rotate-180" />
                </Link>
              </div>
            </div>

            {/* ملخص الطلب والفاتورة */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-lg font-bold border-b border-white/5 pb-3">ملخص الطلبية</h2>
              
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>إجمالي المنتجات:</span>
                  <span className="text-white font-medium">{totalPrice} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>مصاريف الشحن:</span>
                  <span className="text-white font-medium">{shippingFee} ج.م</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3 text-base font-black text-white">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-orange-400">{totalPrice + shippingFee} ج.م</span>
                </div>
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold rounded-xl shadow-lg gap-2 mt-2">
                <CreditCard size={18} />
                الانتقال للدفع والشحن
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}