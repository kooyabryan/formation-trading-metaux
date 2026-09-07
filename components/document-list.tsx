import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: number;
  filename: string;
  fileUrl: string;
  fileSize: number | null;
  fileType: string | null;
  description: string | null;
  createdAt: Date;
}

interface DocumentListProps {
  documents: Document[];
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">
          Aucun document n&apos;a encore été déposé.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
        >
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{doc.filename}</h3>
            {doc.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {doc.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{formatFileSize(doc.fileSize)}</span>
              <span>•</span>
              <span>
                {format(new Date(doc.createdAt), "d MMMM yyyy", { locale: fr })}
              </span>
            </div>
          </div>
          <a href={doc.fileUrl} download={doc.filename}>
            <Button variant="ghost" size="sm" className="shrink-0">
              <Download className="h-4 w-4" />
            </Button>
          </a>
        </div>
      ))}
    </div>
  );
}
