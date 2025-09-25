import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing required field: id" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete job", error: error.message },
      { status: 500 }
    );
  }
}