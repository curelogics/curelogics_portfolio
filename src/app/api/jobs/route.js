import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get("latest");

    if (latest === "true") {
      const jobs = await db
        .collection("jobs")
        .find()
        .sort({ createdAt: -1 }) // newest first
        .limit(4)
        .toArray();
      return NextResponse.json({ success: true, data: jobs });
    }

    // default: return all jobs
    const jobs = await db.collection("jobs").find().toArray();
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs", error: error.message },
      { status: 500 }
    );
  }
}
