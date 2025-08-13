"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle } from "lucide-react"

export function RegistrationForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registration successful! Please verify your email address."
        })
        setEmail("")
        setPassword("")
      } else {
        setMessage({ type: "error", text: data.error || "An error occurred during registration." })
      }
    } catch {
      setMessage({ type: "error", text: "A network error occurred." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="pre-reg-title text-center mb-8">Oson AI</h2>
      <p className="pre-reg-text text-center">Register in advance for our service and be among the first to try it!</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

        {/* Email field */}
        <div className="input-wrapper">
          <div className="input-field">
            <label htmlFor="email" className="input-label">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-0 py-0 input-placeholder bg-transparent text-card-foreground focus:ring-0 focus:outline-none border-none h-full w-full"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="input-wrapper">
          <div className="input-field">
            <label htmlFor="password" className="input-label">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-0 py-0 input-placeholder bg-transparent text-card-foreground focus:ring-0 focus:outline-none border-none h-full w-full"
            />
          </div>
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg border ${
              message.type === "success"
                ? "bg-green-500/20 text-green-300 border-green-500/30"
                : "bg-red-500/20 text-red-300 border-red-500/30"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <div className="button-wrapper mt-2">
          <Button
            type="submit"
            className="button-custom"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  )
}
