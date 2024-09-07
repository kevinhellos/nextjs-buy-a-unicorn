"use client";

import { CircleCheck, Info, ShoppingBag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [customerName, setCustomerName] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  function getPaymentDetails() {

    // If sessionId exists
    if (sessionId) {
      try {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/session`, {
          method: "POST",
          body: JSON.stringify({
            session_id: sessionId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((paymentData) => {
            // setPaymentId(paymentData?.session.payment_intent?.id);
            // if (paymentId) {
            if (paymentData.error) {
              if (paymentData.error.includes("No such checkout.session:")) {
                setErrorMessage("Page URL is invalid");
              } 
              else {
                setErrorMessage("Something went wrong. Please contact admin");
              }
            }
            // If no error
            else {
              setCustomerName(paymentData?.session?.customer_details?.name);
              setPaymentIntentId(paymentData?.session.payment_intent?.id);
            }
          });
      } 
      catch (error: any) {
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
    <div className="ui-product-card text-center min-h-96">
      <CircleCheck className="mt-1 text-green-600 mx-auto" size={30} />
      <h1 className="text-xl font-medium text-black mt-3">Payment completed</h1>

      {errorMessage ? <p className="text-sm text-red-600 mt-5">{errorMessage} </p> : 
      (
        <>
          {customerName ? (
            <>
              <p className="text-sm text-black mt-5 mb-10">
                Thank you {customerName}, your purchase is all set !
              </p>

              <div className="bg-blue-100/75 text-sm text-left px-3 py-2 rounded-md flex">
                <Info size={25} className="me-2"/>
                The link below will give you access to the product. Please keep it safe.
              </div>

              <button
                type="button"
                className="mt-5 ui-button"
                onClick={() => {
                  router.push(`/product/${paymentIntentId}`);
                }}
              >
                View product
              </button>
            </>
          ) : (
            <div className="skeleton h-52 rounded-md mt-5 mx-auto"></div>
          )}
        </>
      )}
    </div>
  );
}
