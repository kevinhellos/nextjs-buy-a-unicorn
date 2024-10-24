import { productData } from "@/productData";

export default function TestModeBar() {
  return (
    <div className="bg-yellow-200 text-sm py-2">
      <p className="text-center font-normal">
        {productData?.textModeMessage ? productData?.textModeMessage : "This product is currently in test mode. All purchases will be voided."}
      </p>
    </div>
  );
}
