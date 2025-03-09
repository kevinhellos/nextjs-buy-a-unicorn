"use client";

import { CircleX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getPaymentDetails() {

    // Ensure sessionId exists
    if (sessionId) {

      // Post the sessionId to receive paymentData object
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/session`, {
          method: "POST",
          body: JSON.stringify({
            session_id: sessionId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })

        const paymentData = await response.json();

        // If paymentData contains error:
        if (paymentData?.error) {

          // Handle errors
          if (paymentData.error.includes("No such checkout.session:")) {
            setErrorMessage("Page URL is invalid");
          } 
          
          setIsLoading(false);
          setErrorMessage("Something went wrong. Please contact admin");
        }

        // If paymentData contains paymentIntentId (this indicates a valid checkout session)
        if (paymentData?.session?.payment_intent?.id) {
          // Navigate to the product/paymentIntentId
          // In the /product/paymentIntentId, the paymentIntentId is once checked again.
          
          // Remove the pi_ from the paymentData?.session.payment_intent?.id
          router.push(`/product/${paymentData?.session.payment_intent?.id.replace("pi_", "")}`);
        }
        
      } 
      catch (error: any) {
        setIsLoading(false);
        console.error(error);
      }
    }

    // If sessionId is invalid
    else {
      setErrorMessage("Session id is invalid !");
    }

  }

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
      <div className="ui-product-card text-center">

        {isLoading && (
          <>
            <span className="loading loading-spinner loading-lg mx-auto"></span>
            <h1 className="text-xl font-medium text-black mt-3">Loading</h1>
            <p className="text-sm text-black mt-5 mb-10">Please wait...</p>
          </>
        )}

        {errorMessage && (
          <>
            <CircleX className="mt-1 text-red-600 mx-auto" strokeWidth={1.35} size={45} />
            <h1 className="text-xl font-medium text-black mt-3">An error occured</h1>
            <p className="text-sm text-black mt-5 mb-10">{errorMessage}</p>
          </>
        )}
      </div>
  );
}
