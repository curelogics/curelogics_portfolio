import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const job_type = formData.get("job_type");
    const job_status = formData.get("job_status");
    const skills = formData.get("skills") ? JSON.parse(formData.get("skills")) : [];
    const seats = parseInt(formData.get("seats"), 10);
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    if (!id || !title || !description || !job_type || !job_status || !skills || isNaN(seats)) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const updateFields = {
      title,
      description,
      job_type,
      job_status,
      skills,
      seats,
      updatedAt: new Date(),
    };
    await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update job", error: error.message },
      { status: 500 }
    );
  }
}