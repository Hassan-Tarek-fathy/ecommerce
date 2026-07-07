"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-slate-950 border-t border-white/10 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* العمود الأول: الشعار والمعلومات */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-lg">
              <Image src="/images/logo.png" alt="logo" fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-black bg-linear-to-l from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent">
              اشتري مني
            </h2>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            وجهتك الأولى والأفضل للتسوق الإلكتروني الذكي. نجمع لك جودة المنتجات العالمية مع خدمة عملاء ممتازة وخيارات دفع مرنة.
          </p>
          {/* وسائل التواصل الاجتماعي */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white transition text-slate-300"><FaFacebookF size={18} /></a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white transition text-slate-300"><FaInstagram size={18} /></a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white transition text-slate-300"><FaTwitter size={18} /></a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white transition text-slate-300"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg border-r-4 border-orange-500 pr-3">روابط مهمة</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400 transition">الرئيسية</Link></li>
            <li><Link href="/products" className="hover:text-orange-400 transition">جميع المنتجات</Link></li>
            <li><Link href="/offers" className="hover:text-orange-400 transition">أحدث العروض والخصومات</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-400 transition">سياسة الخصوصية والشروط</Link></li>
          </ul>
        </div>

        {/* العمود الثالث: الأقسام */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg border-r-4 border-orange-500 pr-3">أقسام المتجر</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories/electronics" className="hover:text-orange-400 transition">الإلكترونيات والأجهزة</Link></li>
            <li><Link href="/categories/fashion" className="hover:text-orange-400 transition">الأزياء والملابس</Link></li>
            <li><Link href="/categories/home" className="hover:text-orange-400 transition">المنزل والمطبخ</Link></li>
            <li><Link href="/categories/beauty" className="hover:text-orange-400 transition">العناية والجمال</Link></li>
          </ul>
        </div>

        {/* العمود الرابع: معلومات الاتصال */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg border-r-4 border-orange-500 pr-3">تواصل معنا</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><MapPin size={18} className="text-orange-400 shrink-0" /><span>القاهرة، جمهورية مصر العربية</span></li>
            <li className="flex items-center gap-3" dir="ltr"><Phone size={18} className="text-orange-400 shrink-0" /><span className="text-slate-400 hover:text-orange-400 transition">+20 123 456 7890</span></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-orange-400 shrink-0" /><span>support@eshtrymeny.com</span></li>
          </ul>
        </div>

      </div>

      {/* الحقوق والنهاية */}
      <div className="container mx-auto px-4 lg:px-8 mt-12 pt-6 border-t border-white/5 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} اشتري مني. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4">
          <Image src="https://raw.githubusercontent.com/a-b-r-o-r/payment-logos/master/assets/visa.svg" alt="Visa" width={35} height={20} className="opacity-60 hover:opacity-100 transition" />
          <Image src="https://raw.githubusercontent.com/a-b-r-o-r/payment-logos/master/assets/mastercard.svg" alt="Mastercard" width={35} height={20} className="opacity-60 hover:opacity-100 transition" />
        </div>
      </div>
    </footer>
  );
}