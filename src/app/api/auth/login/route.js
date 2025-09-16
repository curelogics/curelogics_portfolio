import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Find admin
    const admin = await db.collection("admins").findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { success: false, message: "Failed to login", error: error.message },
      { status: 500 }
    );
  }
}