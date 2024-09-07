"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-5 ui-button-outline"
    >
        Back to checkout
    </button>
  );
}
