// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import { ObjectId } from "mongodb";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const title = formData.get("title");
//     const content = formData.get("content");
//     const author = formData.get("author");
//     const image = formData.get("image");
//     const token = request.headers.get("authorization")?.replace("Bearer ", "");

//     // Validate token
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
//     }

//     // Validate fields
//     if (!title || !content || !author) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Connect to database
//     const { db } = await connectToDatabase();

//     // Handle image upload
//     let imageUrl = "";
//     if (image) {
//       const buffer = Buffer.from(await image.arrayBuffer());
//       const uploadResponse = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "blogs" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(buffer);
//       });
//       imageUrl = uploadResponse.secure_url;
//     }

//     // Insert blog with clickCount
//     const blog = {
//       title,
//       content,
//       author,
//       imageUrl,
//       createdAt: new Date(),
//       clickCount: 0, // Initialize clickCount
//     };
//     const result = await db.collection("blogs").insertOne(blog);

//     return NextResponse.json({
//       success: true,
//       message: "Blog created successfully",
//       data: { _id: result.insertedId, ...blog },
//     });
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to create blog", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     const formData = await request.formData();
//     const id = formData.get("id");
//     const title = formData.get("title");
//     const content = formData.get("content");
//     const author = formData.get("author");
//     const image = formData.get("image");
//     const token = request.headers.get("authorization")?.replace("Bearer ", "");

//     // Validate token
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
//     }

//     // Validate fields
//     if (!id || !title || !content || !author) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Connect to database
//     const { db } = await connectToDatabase();

//     // Handle image upload
//     let imageUrl = "";
//     if (image) {
//       const buffer = Buffer.from(await image.arrayBuffer());
//       const uploadResponse = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "blogs" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(buffer);
//       });
//       imageUrl = uploadResponse.secure_url;
//     }

//     // Update blog
//     const updateFields = {
//       title,
//       content,
//       author,
//       ...(imageUrl && { imageUrl }),
//       updatedAt: new Date(),
//     };
//     await db.collection("blogs").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateFields }
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Blog updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to update blog", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request) {
//   try {
//     const { db } = await connectToDatabase();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const popular = searchParams.get("popular");

//     if (id) {
//       // Return a single blog and increment clickCount
//       const blog = await db.collection("blogs").findOneAndUpdate(
//         { _id: new ObjectId(id) },
//         { $inc: { clickCount: 1 } }, // Increment clickCount
//         { returnDocument: "after" } // Return updated document
//       );
//       if (!blog) {
//         return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
//       }
//       return NextResponse.json({ success: true, data: blog });
//     }

//     if (popular === "true") {
//       // Return top 3 blogs sorted by clickCount
//       const blogs = await db.collection("blogs")
//         .find()
//         .sort({ clickCount: -1 }) // Sort by clickCount descending
//         .limit(3)
//         .toArray();
//       return NextResponse.json({ success: true, data: blogs });
//     }

//     // Otherwise, return all blogs
//     const blogs = await db.collection("blogs").find().toArray();
//     return NextResponse.json({ success: true, data: blogs });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch blogs", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { id } = await request.json();
//     const token = request.headers.get("authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
//     }

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const { db } = await connectToDatabase();
//     await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });

//     return NextResponse.json({
//       success: true,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete blog", error: error.message },
//       { status: 500 }
//     );
//   }
// }

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