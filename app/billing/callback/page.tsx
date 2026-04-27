"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyVerifyPaymentQuery } from "@/store/features/billing/billingAPI";

export default function BillingCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [verifyPayment] = useLazyVerifyPaymentQuery();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const reference = params.get("reference") || params.get("trxref");
      if (!reference) {
        router.replace("/dashboard");
        return;
      }

      try {
        await verifyPayment({ reference }).unwrap();
      } catch {
        // Even when verification fails, we return users to dashboard
        // where current subscription/usage state can be refreshed.
      } finally {
        if (!cancelled) {
          router.replace("/dashboard");
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [params, router, verifyPayment]);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <p>Processing payment confirmation...</p>
    </main>
  );
}
