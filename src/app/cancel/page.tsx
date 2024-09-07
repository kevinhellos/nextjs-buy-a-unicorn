"use client";

import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div className="ui-product-card text-center">
      <CircleX className="mt-1 text-red-600 mx-auto" size={30} />
      <h1 className="text-xl font-medium text-black mt-3">Payment cancelled</h1>
      <p className="text-sm text-black mt-5 mb-10">
        Your purchase hasn't been completed
      </p>
      <button
        type="button"
        className="mt-5 ui-button-outline"
        onClick={() => router.push("/")}
      >
        Back
      </button>
    </div>
  );
}
