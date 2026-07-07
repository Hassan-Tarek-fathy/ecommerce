"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// تعديل اسم الـ Import ليتوافق مع الـ Store الخاص بك وتجنب مشاكل التسمية
import { useCart } from "@/lib/UseCart"; 
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  ChevronDown,
  X,
  Home,
  Package,
  Percent,
  Grid3X3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // جلب العناصر الحقيقية من السلة الخاصة بك
  const cartItems = useCart((state) => state.items);

  // لحل مشكلة التزامن بين الكلاينت والسيرفر (Hydration)
  // تعيين الحالة مبدئياً اعتماداً على تواجد الـ window لتجنب استدعاء setState داخل الـ useEffect
  const [mounted, setMounted] = useState(() => typeof window !== "undefined");

  // حساب عدد المنتجات الفعلي داخل السلة بدلاً من الرقم الثابت 3
  const cartItemsCount = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
      <header
        dir="rtl"
        className="sticky top-0 z-50 border-b border-white/10 bg-linear-to-l from-slate-950 via-indigo-950 to-slate-900 backdrop-blur-2xl shadow-2xl"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">

          {/* ================= Logo ================= */}

          <div className="flex items-center gap-10">

            <Link
              href="/"
              className="group flex items-center gap-4"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-orange-400/30 transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="leading-tight">

                <h1 className="text-3xl font-black bg-linear-to-l from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent">
                  اشتري مني
                </h1>

                <p className="text-xs text-slate-300">
                  كل ما تحتاجه في مكان واحد
                </p>

              </div>
            </Link>

            {/* ================= Desktop Menu ================= */}

            <nav className="hidden lg:flex items-center gap-2">

              <Link href="/" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-lg">
                <Home size={18} />
                الرئيسية
              </Link>

              <Link href="/products" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-lg">
                <Package size={18} />
                المنتجات
              </Link>

              <DropdownMenu>

                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all hover:bg-orange-500 outline-none">
                  <Grid3X3 size={18} />
                  الأقسام
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-60 rounded-2xl border-0 bg-white shadow-2xl">
                  <DropdownMenuItem>
                    <Link href="/products?category=electronics" className="w-full h-full block">
                      الإلكترونيات
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/products?category=fashion" className="w-full h-full block">
                      الأزياء
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/products?category=home" className="w-full h-full block">
                      المنزل
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/products?category=beauty" className="w-full h-full block">
                      العناية والجمال
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>

              <Link href="/offers" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-lg">
                <Percent size={18} />
                العروض
              </Link>

            </nav>

          </div>
          {/* ================= Search ================= */}

          <div className="hidden lg:flex flex-1 max-w-2xl px-8">
            <div className="relative w-full group">

              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-orange-400" />

              <Input type="search" placeholder="ابحث عن آلاف المنتجات..." className="h-14 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl pr-14 pl-32 text-white placeholder:text-slate-300 shadow-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40" />

              <Button className="absolute left-1 top-1 h-12 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-8 font-bold shadow-lg hover:scale-105 transition">
                بحث
              </Button>

            </div>
          </div>

          {/* ================= Right Actions ================= */}

          <div className="flex items-center gap-3">

            {/* Mobile Search */}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 rounded-2xl bg-white/10 text-white hover:bg-orange-500"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              className="hidden sm:flex relative h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-white backdrop-blur transition-all duration-300 hover:bg-pink-500 hover:scale-110"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* User */}

            <DropdownMenu>

              <DropdownMenuTrigger className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-white transition hover:bg-orange-500 hover:scale-110 outline-none">
                <User className="h-5 w-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full h-full block">
                    حسابي
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/orders" className="w-full h-full block">
                    طلباتي
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full h-full block">
                    المفضلة
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-500 cursor-pointer">
                  تسجيل الخروج
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r from-orange-500 to-amber-400 text-white shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartItemsCount > 0 && (
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black ring-4 ring-slate-950 shadow-md">
                  {cartItemsCount}
                </span>
              )}

            </Link>

            {/* Mobile Menu */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              className="lg:hidden h-12 w-12 rounded-2xl bg-white/10 text-white hover:bg-orange-500"
            >
              <Menu className="h-6 w-6" />
            </Button>

          </div>

        </div>

      </header>
      {/* ================= Mobile Drawer ================= */}

      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-300 ${open ? "visible bg-black/50 opacity-100" : "invisible opacity-0"}`}
        onClick={() => setOpen(false)}
      >
        <div
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[320px] bg-linear-to-b from-slate-950 via-indigo-950 to-slate-900 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 p-5">

            <div className="flex items-center gap-3">

              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white">

                <Image
                  src="/images/logo.png"
                  alt="logo"
                  fill
                  className="object-cover"
                />

              </div>

              <div>

                <h2 className="font-black text-white text-lg">
                  اشتري مني
                </h2>

                <p className="text-xs text-slate-300">
                  متجر إلكتروني
                </p>

              </div>

            </div>

            <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-red-500 transition">
              <X size={20} />
            </button>

          </div>

          {/* Search */}

          <div className="p-5">

            <div className="relative">

              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />

              <Input placeholder="ابحث..." className="h-12 rounded-full border-white/10 bg-white/10 pr-12 text-white placeholder:text-slate-400" />

            </div>

          </div>

          {/* Links */}

          <nav className="space-y-2 px-5">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-white hover:bg-orange-500 transition"
            >
              <Home size={20} />
              الرئيسية
            </Link>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-white hover:bg-orange-500 transition"
            >
              <Package size={20} />
              المنتجات
            </Link>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-white hover:bg-orange-500 transition"
            >
              <Grid3X3 size={20} />
              الأقسام
            </Link>

            <Link
              href="/offers"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-white hover:bg-orange-500 transition"
            >
              <Percent size={20} />
              العروض
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-white hover:bg-pink-500 transition"
            >
              <Heart size={20} />
              المفضلة
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-white hover:bg-orange-500 transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} />
                السلة
              </div>

              {cartItemsCount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

          </nav>

        </div>
      </div>
    </>
  );
}