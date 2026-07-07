
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  discountPrice: z.coerce.number().optional().nullable(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  images: z.array(z.string()),
  colors: z.array(z.string()),
  sizes: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}
export async function createProduct(data: unknown) {
  const validated = ProductSchema.parse(data);
  const slug = validated.name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

  await prisma.product.create({
    data: { ...validated, slug },
  });

  revalidatePath("/products");
  revalidatePath("/admin/dashboard");
}
export async function updateProduct(id: string, data: unknown) {
  const validated = ProductSchema.parse(data);
  await prisma.product.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/products");
  revalidatePath("/admin/dashboard");
}
export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/admin/dashboard");
}