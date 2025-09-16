import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST() {
  try {
    console.log("Starting create-admin request..."); // Debug
    const { db } = await connectToDatabase();
    const adminEmail = "admin@curelogics.org";
    const adminPassword = "LogicsCure@2025";

    console.log("Checking for existing admin:", adminEmail); // Debug
    const existingAdmin = await db.collection("admins").findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists:", adminEmail); // Debug
      return NextResponse.json(
        { success: false, message: "Admin user already exists: " + adminEmail },
        { status: 400 }
      );
    }

    console.log("Hashing password..."); // Debug
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    console.log("Inserting admin user..."); // Debug
    await db.collection("admins").insertOne({
      email: adminEmail,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("Admin created successfully:", adminEmail); // Debug
    return NextResponse.json({
      success: true,
      message: "Admin user created successfully: " + adminEmail,
    });
  } catch (error) {
    console.error("Error creating admin user:", error); // Debug
    return NextResponse.json(
      { success: false, message: "Failed to create admin user", error: error.message },
      { status: 500 }
    );
  }
}