import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const popular = searchParams.get("popular");

    if (popular === "true") {
      // Return top 3 blogs sorted by clickCount
      const blogs = await db.collection("blogs")
        .find()
        .sort({ clickCount: -1 }) // Sort by clickCount descending
        .limit(3)
        .toArray();
      return NextResponse.json({ success: true, data: blogs });
    }

    // Return all blogs
    const blogs = await db.collection("blogs").find().toArray();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
}