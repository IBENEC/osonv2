import { RegistrationForm } from "@/components/registration-form"

export default function HomePage() {
  return (
    <div className="login-background overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="card-wrapper">
            <RegistrationForm />
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-8 text-center">
        <RegistrationCounter />
      </div>
    </div>
  )
}

async function RegistrationCounter() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9305/"}/api/stats`,
      { cache: "no-store" }
    )
    const data = await response.json()

    return (
      <p className="text-white text-sm">
        {data.count === "N/A" ? "Number of registrations: N/A" : `${data.count} people have registered`}
      </p>
    )
  } catch (error) {
    return <p className="text-white text-sm">Number of registrations: N/A</p>
  }
}
