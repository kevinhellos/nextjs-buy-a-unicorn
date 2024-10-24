import BackButton from "@/components/BackButton";
import { CircleX } from "lucide-react";
import { notFound } from "next/navigation";
import Product from "./product";
import AlertBanner from "@/components/AlertBanner";

export default async function Page({ params } : { params: any }) {
  
  // Retrieve the paymentIntentId from the url
  const { paymentIntentId } = params;

  // E.g. of a paymentIntentId: 1QDK1rEdoQsFnsUq11I11r11
  // Append a pi_ to the start of paymentIntentId from the url
  function constructPaymentIntentId(_paymentIntentId: string) {
    return `pi_${_paymentIntentId}`;
  }

  // POST the paymentIntentId to get paymentIntent
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/id`, {
      method: "POST",
      body: JSON.stringify({ payment_id: constructPaymentIntentId(paymentIntentId) }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const paymentIntent = await response.json();
    const status = paymentIntent.paymentIntent?.status;

    // if paymentIntent is not found for whatever reasons
    if (!paymentIntent) {
      notFound();
    }

    if (status === "succeeded") {
      return (
        <>
          <AlertBanner/>
          <Product/>
        </>
      );
    }
    
    else {
      return (
        <div className="ui-product-card text-center">
          <CircleX className="mt-1 text-red-600 mx-auto" size={30} />
          <h1 className="text-xl font-medium text-black mt-3">Invalid URL</h1>
          <p className="text-sm text-black mt-5 mb-10">
            The URL of this page is not valid
          </p>
          <BackButton/>
        </div>
      );
    }

  } 
  catch (error: any) {
    console.error(error.message);
  }
}
