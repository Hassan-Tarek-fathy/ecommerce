import Hero from "@/components/main/Hero";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/main/product-card"; // تأكد من مسار مكوّن الـ Card لديك

// دالة لجلب المنتجات المميزة أو أول 8 منتجات من قاعدة البيانات مباشرة
async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true, // جلب المنتجات النشطة فقط
      },
      take: 8, // تحديد كمية المنتجات المعروضة في الصفحة الرئيسية
      orderBy: {
        createdAt: "desc", // عرض الأحدث أولاً
      },
      include: {
        category: true, // تضمين بيانات القسم إذا كان الـ Card يحتاجه
      },
    });
    return products;
  } catch (error) {
    console.error("فشل في جلب منتجات الصفحة الرئيسية:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  // تحويل البيانات لتتوافق مع الـ Props التي يتوقعها الـ ProductCard (مثل تكييف الحقول كـ image بدلاً من مصفوفة images)
  const formattedProducts = products.map((product) => ({
    id: product.id,
    title: product.name,
    price: product.price,
    oldPrice: product.discountPrice, // السعر القديم هو السعر قبل الخصم
    image: product.images[0] || "/placeholder.jpg", // أخذ أول صورة من مصفوفة الصور الحقيقية
    category: product.category.name,
    rating: product.rating,
  }));

  return (
    <>
      <Hero />

      {/* 2. قسم المنتجات المقترحة الحقيقية */}
      <section dir="rtl" className="bg-slate-950 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* عنوان القسم */}
          <div className="mb-10 flex flex-col items-start gap-2">
            <h2 className="text-3xl font-black bg-gradient-to-l from-orange-400 to-white bg-clip-text text-transparent">
              المنتجات الأكثر مبيعاً
            </h2>
            <p className="text-sm text-slate-400">
              تسوق أحدث المنتجات الحصرية المستخرجة حياً من متجرنا
            </p>
          </div>

          {/* شبكة العرض المستجيبة (Grid) أو إشعار في حال عدم وجود منتجات */}
          {formattedProducts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-slate-400 text-sm">لا توجد منتجات معروضة حالياً في قاعدة البيانات.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}