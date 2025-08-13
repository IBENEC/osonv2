import { NextResponse } from "next/server"
import mysql, { RowDataPacket } from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "mysql8.srkhost.eu",
  user: process.env.DB_USER || "u80988_sSTWSbKDoQ",
  password: process.env.DB_PASSWORD || "lg!iyKzsB2.NjmqnKmLe9xGc",
  database: process.env.DB_NAME || "s80988_asd",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

interface CountRow extends RowDataPacket {
  count: number
}

export async function GET() {
  try {
    let connection
    try {
      connection = await mysql.createConnection(dbConfig)
      await connection.ping()
    } catch (dbError: any) {
      console.error("Database connection error:", dbError)
      return NextResponse.json({ count: "N/A" })
    }

    try {
      const [rows] = await connection.execute<CountRow[]>("SELECT COUNT(*) as count FROM registrations")

      const count = rows.length > 0 ? rows[0].count : 0

      return NextResponse.json({ count })
    } finally {
      if (connection) {
        await connection.end()
      }
    }
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ count: "N/A" })
  }
}
