import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const author = formData.get("author");
    const image = formData.get("image");
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    // Validate token
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    // Validate fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Handle image upload
    let imageUrl = "";
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      imageUrl = uploadResponse.secure_url;
    }

    // Insert blog with clickCount
    const blog = {
      title,
      content,
      author,
      imageUrl,
      createdAt: new Date(),
      clickCount: 0, // Initialize clickCount
    };
    const result = await db.collection("blogs").insertOne(blog);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: { _id: result.insertedId, ...blog },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog", error: error.message },
      { status: 500 }
    );
  }
}