import { NextResponse } from "next/server";
import { testConnection } from "@/lib/mongodb";

export async function GET() {
  try {
    await testConnection();
    return NextResponse.json({ success: true, message: "Database connection successful" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}