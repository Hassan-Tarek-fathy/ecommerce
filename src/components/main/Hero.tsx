"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 py-20 lg:py-32 text-white">
      {/* الخلفية المضيئة الدائرية (Ambient Light Effect) */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* الجانب الأيمن: النصوص والعروض */}
        <div className="space-y-8 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
            <Sparkles size={16} />
            خصومات الصيف الكبرى وصلت حتى 50%
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-none">
            اكتشف تجربة تسوق <br />
            <span className="bg-gradient-to-l from-orange-400 via-amber-300 to-white bg-clip-text text-transparent">
              فريدة من نوعها
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            مرحباً بك في متجر"اشتري مني"! نوفر لك أحدث المنتجات العالمية من الأزياء، الإلكترونيات، ومستلزمات المنزل بأعلى جودة وأفضل الأسعار مع توصيل سريع حتى باب بيتك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 font-bold text-white shadow-xl hover:scale-105 transition duration-300 gap-2 text-base">
              <ShoppingBag size={20} />
              تسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur px-8 transition duration-300 gap-2 text-base">
              عرض العروض الحصرية
              <ArrowLeft size={18} />
            </Button>
          </div>

          {/* ميزات سريعة (Trust Badges) */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-slate-400 text-sm">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Truck size={18} className="text-orange-400" />
              <span>شحن سريع وآمن</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck size={18} className="text-orange-400" />
              <span>دفع إلكتروني موثوق</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 hidden sm:flex">
              <Sparkles size={18} className="text-orange-400" />
              <span>ضمان جودة 100%</span>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: الصورة الدعائية الفخمة */}
        <div className="relative flex justify-center items-center">
          <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-3xl bg-gradient-to-tr from-orange-500/20 to-indigo-500/20 p-6 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden group">
            {/* هنا حط صورة تعبيرية لمنتج بطل أو بنر هيرو للمتجر */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
              <Image
                src="/hero.png" // تأكد من إضافة الصورة في فولدر public لاحقاً أو استبدالها برابط
                alt="Banner"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}