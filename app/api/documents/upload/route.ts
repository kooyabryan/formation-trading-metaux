import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = typeof session.user.id === 'string' ? parseInt(session.user.id) : session.user.id;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      // Fallback: save metadata only without actual file upload
      const mockUrl = `/uploads/${Date.now()}-${file.name}`;
      
      await db.insert(documents).values({
        userId,
        filename: file.name,
        fileUrl: mockUrl,
        fileSize: file.size,
        fileType: file.type,
        description: description || null,
      });

      return NextResponse.json({
        message: "Document enregistré (mode développement sans Blob)",
        url: mockUrl,
      });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    // Save to database
    await db.insert(documents).values({
      userId,
      filename: file.name,
      fileUrl: blob.url,
      fileSize: file.size,
      fileType: file.type,
      description: description || null,
    });

    return NextResponse.json({
      message: "Document téléversé avec succès",
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléversement" },
      { status: 500 }
    );
  }
}
