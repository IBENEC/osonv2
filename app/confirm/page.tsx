"use client";

import { useEffect, useState } from "react"

export default function ConfirmPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  // Ezt az url paraméterből olvashatod ki, pl ?token=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (!token) {
      setStatus("error")
      return
    }

    // Kliens oldali kérés az API-hoz az email megerősítéshez
    fetch(`/api/confirm?token=${encodeURIComponent(token)}`)
      .then(res => {
        if (res.ok) setStatus("success")
        else setStatus("error")
      })
      .catch(() => setStatus("error"))
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-300/5 rounded-full blur-2xl"></div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="relative z-10 w-full max-w-md mx-auto bg-[#1a1a1a] rounded-2xl p-10 shadow-lg text-center">
          <h1 className="text-4xl font-bold text-[#29c7b4] mb-6">OSON AI</h1>

          {status === "loading" && (
            <p className="text-gray-400 text-lg">Verifying your email, please wait...</p>
          )}

          {status === "success" && (
            <>
              <p className="text-gray-300 text-lg mb-6">
                Your email has been successfully confirmed! Thank you for joining us.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-[#29c7b4] text-white rounded-lg font-semibold hover:bg-[#21a896] transition"
              >
                Go to Homepage
              </a>
            </>
          )}

          {status === "error" && (
            <>
              <p className="text-red-500 text-lg mb-6">
                Sorry, we couldn't verify your email. The confirmation link might be invalid or expired.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition"
              >
                Return Home
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
