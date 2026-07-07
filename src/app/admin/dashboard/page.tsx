import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/app/admin/productForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProduct } from "@/lib/products";

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany(),
  ]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* نموذج إضافة المنتجات */}
        <div className="lg:col-span-1">
          <ProductForm categories={categories} />
        </div>

        {/* جدول المنتجات المضافة */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-white/10 overflow-hidden">
          <h2 className="text-xl font-bold mb-6">إدارة المنتجات المتوفرة ({products.length})</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-white/10">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-right text-slate-400">المنتج</TableHead>
                  <TableHead className="text-right text-slate-400">القسم</TableHead>
                  <TableHead className="text-right text-slate-400">السعر</TableHead>
                  <TableHead className="text-right text-slate-400">المخزون</TableHead>
                  <TableHead className="text-center text-slate-400">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium text-white max-w-[150px] truncate">{product.name}</TableCell>
                    <TableCell><span className="text-xs bg-white/5 px-2 py-1 rounded-md">{product.category.name}</span></TableCell>
                    <TableCell className="text-orange-400 font-bold">{product.price} ج.م</TableCell>
                    <TableCell>{product.stock} قطع</TableCell>
                    <TableCell className="text-center">
                      <form action={async () => { "use server"; await deleteProduct(product.id); }}>
                        <button type="submit" className="text-xs text-red-400 hover:text-red-500 font-bold bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                          حذف
                        </button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
}