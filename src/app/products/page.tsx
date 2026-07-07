import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/main/product-card";
import { FiltersSidebar } from "@/app/products/Filtersidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search } from "lucide-react";

interface SearchProps {
  searchParams: Promise<{
    category?: string;
    min?: string;
    max?: string;
    color?: string;
    rating?: string;
    stock?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  // بناء الكائن الاستعلامي المخصص لـ Prisma
  const where: any = { active: true };

  if (params.category && params.category !== "all") {
    where.category = { slug: params.category };
  }

  if (params.min || params.max) {
    where.price = {
      gte: params.min ? parseFloat(params.min) : 0,
      lte: params.max ? parseFloat(params.max) : 100000,
    };
  }

  if (params.color) {
    where.colors = { hasSome: params.color.split(",") };
  }

  if (params.rating) {
    where.rating = { gte: parseFloat(params.rating) };
  }

  if (params.stock) {
    where.stock = params.stock === "in" ? { gt: 0 } : { equals: 0 };
  }

  if (params.search) {
    where.name = { contains: params.search, mode: "insensitive" };
  }

  // فرز البيانات
  let orderBy: any = { createdAt: "desc" };
  if (params.sort === "low-high") orderBy = { price: "asc" };
  if (params.sort === "high-low") orderBy = { price: "desc" };
  if (params.sort === "rated") orderBy = { rating: "desc" };

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip,
      take: limit,
      orderBy,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* شريط البحث العلوي وتصفية الترتيب */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
          <form method="GET" action="/products" className="relative w-full md:w-96">
            <Input
              name="search"
              defaultValue={params.search || ""}
              placeholder="ابحث عن منتج، علامة تجارية..."
              className="w-full pl-10 pr-4 h-11 bg-slate-900 border-white/10 rounded-2xl text-white placeholder-slate-500 focus-visible:ring-orange-500"
            />
            <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 shrink-0">ترتيب حسب:</span>
            <Select defaultValue={params.sort || "newest"}>
              <SelectTrigger className="w-44 bg-slate-900 border-white/10 rounded-xl">
                <SelectValue placeholder="الأحدث" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="low-high">السعر: من الأقل للأعلى</SelectItem>
                <SelectItem value="high-low">السعر: من الأعلى للأقل</SelectItem>
                <SelectItem value="rated">الأعلى تقييماً</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* شريط الفلاتر الجانبي للمكتب */}
          <div className="hidden lg:block">
            <FiltersSidebar />
          </div>

          {/* شبكة عرض المنتجات */}
          <div className="lg:col-span-3 space-y-12">
            {products.length === 0 ? (
              <div className="text-center py-20 text-slate-400 bg-white/5 rounded-3xl border border-dashed border-white/10">
                لم يتم العثور على أي منتجات تطابق خيارات التصفية الحالية.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      title: product.name,
                      price: product.price,
                      oldPrice: product.discountPrice ?? null,              
                       image: product.images[0] || "/placeholder.jpg",
                      category: product.category.name,
                      rating: product.rating,
                    }}
                  />
                ))}
              </div>
            )}

            {/* نظام التنقل الصفحي (Pagination) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/5">
                <Link
                  href={page > 1 ? `/products?page=${page - 1}` : "#"}
                  className={`px-4 h-10 flex items-center rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-orange-500 hover:text-white transition ${page === 1 ? "pointer-events-none opacity-40" : ""}`}
                >
                  السابق
                </Link>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}`}
                    className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm transition ${page === i + 1 ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold" : "bg-white/5 border border-white/10 hover:border-white/30"}`}
                  >
                    {i + 1}
                  </Link>
                ))}

                <Link
                  href={page < totalPages ? `/products?page=${page + 1}` : "#"}
                  className={`px-4 h-10 flex items-center rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-orange-500 hover:text-white transition ${page === totalPages ? "pointer-events-none opacity-40" : ""}`}
                >
                  التالي
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}