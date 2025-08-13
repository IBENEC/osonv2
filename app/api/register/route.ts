import { type NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

// MySQL config
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "oson_dev",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
};

// SMTP Transport with Resend
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Regisztráció POST handler
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    const [existing] = await connection.execute(
      "SELECT id FROM registrations WHERE email = ?",
      [email]
    );
    if ((existing as any[]).length > 0) {
      await connection.end();
      return NextResponse.json({ error: "This email address is already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const confirmationToken = crypto.randomBytes(32).toString("hex");
    // FIX: fix domain https://oson.dev
    const confirmUrl = `https://oson.dev/confirm?token=${confirmationToken}`;

    await connection.execute(
      `INSERT INTO registrations (email, password_hash, confirmation_token, confirmed, created_at)
       VALUES (?, ?, ?, 0, NOW())`,
      [email, hashedPassword, confirmationToken]
    );

    await connection.end();

    // Email küldés
    const mailOptions = {
      from: "noreply@oson.dev",
      to: email,
      subject: "Email Confirmation – OSON AI",
      html: `
        <div style="background-color: #0f0f0f; color: #e5e5e5; font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; padding: 48px 24px; text-align: center;">
          <div style="max-width: 480px; margin: auto; background-color: #1a1a1a; padding: 40px 32px; border-radius: 16px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
            <h1 style="color: #29c7b4; font-size: 32px; margin-bottom: 16px;">OSON AI</h1>
            <p style="font-size: 16px; color: #d4d4d4; line-height: 1.6;">
              Thank you for registering!<br>
              Please confirm your email by clicking the button below:
            </p>
            <a href="${confirmUrl}" style="
              display: inline-block;
              margin-top: 28px;
              padding: 14px 32px;
              background-color: #29c7b4;
              color: white;
              text-decoration: none;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 600;
              transition: background-color 0.3s ease;
            " target="_blank" rel="noopener noreferrer">
              Confirm Email Address
            </a>
            <p style="font-size: 13px; color: #888888; margin-top: 36px; line-height: 1.6;">
              If you did not register at <strong>oson.dev</strong>, please disregard this message.
            </p>
            <p style="font-size: 12px; color: #444444; margin-top: 32px;">
              &copy; ${new Date().getFullYear()} OSON AI. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err: any) {
      console.error("Email sending error:", err);
      return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Registration successful! Please check your email to confirm." }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
  }
}

// Email megerősítés GET handler
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
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
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
