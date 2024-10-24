"use client";

import TestModeBar from "@/components/TestModeBar";
import { productData } from "@/productData";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function page() {

  const [buyButtonLoading, setBuyButtonLoading] = useState<boolean>(false);

  function buyNow() {
    setBuyButtonLoading(true);
    
    try {

      // Create a Stripe checkout session
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => res.json())
      .then(data => {
        setBuyButtonLoading(false);
        window.location.href = data.url;
      });
    }
    catch (error: any) {
      setBuyButtonLoading(false);
      console.error(error.message);
    }
  }

  return (
    <>

      {productData.isTestMode && <TestModeBar/>}

      <div className="ui-product-card">
        <ShoppingBag className="mt-1" strokeWidth={1.35} size={45}/>

        <h1 className="ui-product-name">Buy a {productData.name}</h1>
        <h2 className="ui-price">${productData.price}</h2>
        <p className="ui-product-description">{productData.description}</p>

        {/* This renders all of the labels defined in the "labels" variable */}
        <div className="ui-labels-group">
          {productData.labels.map((label, index) => (
            <span key={index} className="ui-label">
              {label.text}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 ui-button"
          onClick={buyNow}
          disabled={buyButtonLoading}
        >
          {buyButtonLoading ? "Loading..." : "Buy now"}
        </button>
        
      </div>
    </>
  )
}
