"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const cartTotalUSD = 45.00; // إجمالي السلة التجريبي (بالدولار)

  return (
    <div dir="rtl" className="min-h-screen bg-gray-900 text-white pt-28 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl border border-white/5 shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-center">إتمام عملية الدفع الآمن</h2>
        
        <div className="mb-6 flex justify-between items-center bg-slate-900 p-4 rounded-xl">
          <span>المبلغ الإجمالي:</span>
          <span className="text-xl font-black text-orange-500">${cartTotalUSD}</span>
        </div>

        {/* إعداد موفر خدمة بايبال */}
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "USD",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
            // استدعاء السيرفر لإنشاء الطلب
            createOrder={async () => {
              return await createPayPalOrder({ amount: cartTotalUSD });
            }}
            // استدعاء السيرفر لتأكيد الدفع بعد موافقة المستخدم داخل نافذة بايبال
            onApprove={async (data) => {
              const result = await capturePayPalOrder(data.orderID);
              if (result.success) {
                toast.success("تمت عملية الدفع بنجاح! شكراً لك.");
                router.push("/checkout/success"); // التوجيه لصفحة النجاح
              } else {
                toast.error("حدث خطأ أثناء تأكيد الدفع، يرجى التواصل مع الدعم.");
              }
            }}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              toast.error("تم إلغاء العملية أو حدث خطأ في الاتصال بـ PayPal.");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}