import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "oson_dev",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
};

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1404499229023404224/AwEXtKmDqNMAgfth2zW6Aq7Whiv2nxiYTMSZjyr-2_-LL29y6KxwhWvkbSxI-DrAhpPo";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Token hiányzik" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Lekérdezzük a tokenhez tartozó usert
    const [rows] = await connection.execute(
      "SELECT id, email, confirmed FROM registrations WHERE confirmation_token = ?",
      [token]
    );

    if ((rows as any[]).length === 0) {
      await connection.end();
      return NextResponse.json({ error: "Érvénytelen vagy lejárt token" }, { status: 400 });
    }

    const user = (rows as any)[0];

    if (user.confirmed === 1) {
      await connection.end();
      return NextResponse.json({ message: "Az email már megerősítésre került" }, { status: 200 });
    }

    // Frissítjük a megerősítés státuszát
    await connection.execute(
      "UPDATE registrations SET confirmed = 1, confirmed_at = NOW() WHERE id = ?",
      [user.id]
    );

    await connection.end();

    // Discord webhook értesítés csak megerősítéskor
    if (DISCORD_WEBHOOK_URL) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📢 Új hitelesített felhasználó: ${user.email}`,
        }),
      });
    }

    return NextResponse.json({ message: "Email sikeresen megerősítve!" }, { status: 200 });

  } catch (error) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: "Szerver hiba történt" }, { status: 500 });
  }
}
