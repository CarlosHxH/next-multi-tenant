"use client";

import { Toaster } from "sonner";

export function SonnerProvider() {
  return (
    <Toaster 
      position="top-center" 
      richColors 
      closeButton={false}
      theme="light"
      toastOptions={{
        duration: 2500,
        style: {
          fontSize: "0.9rem",
          padding: "12px 16px",
        },
      }}
    />
  );
}
