"use server";

import { prisma } from "@/lib/prisma";

// دالة للحصول على الـ Access Token من بايبال
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString("base64");

  const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data.access_token;
}

// 1. إنشاء طلب دفع داخل بايبال وحفظه في قاعدة البيانات
export interface CreateOrderProps {
  amount: number;
}

export async function createPayPalOrder({ amount }: CreateOrderProps) {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // بايبال لا يدعم الجنيه المصري حالياً، يفضل التحويل للدولار
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });

    const paypalOrder = await response.json();

    // حفظ الطلب في PostgreSQL بحالة معلقة
    await prisma.order.create({
      data: {
        totalAmount: amount,
        paypalOrderId: paypalOrder.id,
        status: "PENDING",
      },
    });

    return paypalOrder.id; // نرسل الـ ID للواجهة الأمامية ليفتح نافذة بايبال
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    throw new Error("فشل إنشاء طلب الدفع");
  }
}

// 2. تأكيد عملية الدفع وتحديث حالة الطلب إلى مكتمل
export async function capturePayPalOrder(orderId: string) {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status === "COMPLETED") {
      // تحديث حالة الطلب بنجاح في قاعدة البيانات
      await prisma.order.update({
        where: { paypalOrderId: orderId },
        data: { status: "COMPLETED" },
      });
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    return { success: false };
  }
}