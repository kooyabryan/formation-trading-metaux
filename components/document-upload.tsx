"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";

interface DocumentUploadProps {
  userId: number;
}

export function DocumentUpload({ userId }: DocumentUploadProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Le fichier ne doit pas dépasser 10 Mo.");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Échec du téléversement");
      }

      setFile(null);
      setDescription("");
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="file-upload">Fichier</Label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        />
        {file && (
          <p className="text-sm text-muted-foreground">
            Sélectionné : {file.name} ({(file.size / 1024).toFixed(0)} Ko)
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optionnel)</Label>
        <Textarea
          id="description"
          placeholder="Décrivez brièvement ce document..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={!file || uploading}
        className="btn-brass w-full sm:w-auto"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Téléversement...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Déposer le document
          </>
        )}
      </Button>
    </form>
  );
}
