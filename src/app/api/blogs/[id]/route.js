import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing blog ID" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const blog = await db.collection("blogs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { clickCount: 1 } },
      { returnDocument: "after" }
    );

    if (!blog) {
      console.log("Blog not found for ID:", id);
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog", error: error.message },
      { status: 500 }
    );
  }
}