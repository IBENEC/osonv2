"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export function RegistrationStats() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/stats")
        const data = await response.json()
        setCount(data.count)
        setError(false)
      } catch (error) {
        console.error("Failed to fetch registration count:", error)
        setError(true)
      }
    }

    fetchCount()
  }, [])

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-gray-700/50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-3">
          <Users className="h-6 w-6 text-gray-300" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{error ? "N/A" : count !== null ? count : "..."}</div>
            <div className="text-sm text-gray-400">registered users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
