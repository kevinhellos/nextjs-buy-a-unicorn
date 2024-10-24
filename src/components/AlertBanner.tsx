"use client";

import { useEffect, useState } from "react";

export default function AlertBanner() {

  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(false);

  function getAlertBannerStatus() {
    const status = localStorage.getItem("alert_banner_status");
    if (status === null) {
      localStorage.setItem("alert_banner_status", "shown");
    }
    if (status === "shown") {
      setShowAlertBanner(true);
    }
    if (status === "dismissed") {
      setShowAlertBanner(false);
    }
  }

  useEffect(() => {
    getAlertBannerStatus();
  }, []);

  if (showAlertBanner) {
    return (
      <div className="bg-purple-100/85 text-black font-medium text-sm text-center py-2">
        <p className="text-center font-normal">
          This page url gives anyone access to your product.
        </p>
        <button 
          type="button"
          className="text-sm border border-black hover:opacity-85 active:opacity-65 text-black py-1 px-3 rounded-md bg-white w-fit mt-2.5"
          onClick={() => {
              localStorage.setItem("alert_banner_status", "dismissed");
              setShowAlertBanner(false);
          }}
          >
          Understand and close
        </button>
      </div>
    );
  }

}
