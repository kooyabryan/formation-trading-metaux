import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { DocumentUpload } from "@/components/document-upload";
import { DocumentList } from "@/components/document-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

async function getUserDocuments(userId: number) {
  return await db.query.documents.findMany({
    where: eq(documents.userId, userId),
    orderBy: [desc(documents.createdAt)],
  });
}

export default async function DocumentsPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/connexion");
  }

  const userId = typeof session.user.id === 'string' ? parseInt(session.user.id) : session.user.id;
  const userDocs = await getUserDocuments(userId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <FileText className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Espace documents
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-[var(--font-playfair)] mb-4">
            Gestion documentaire
          </h1>
          <p className="text-lg text-muted-foreground">
            Déposez vos processus, procédures et documents de conformité dans
            votre espace sécurisé.
          </p>
        </div>

        <Card className="card-premium mb-8">
          <CardHeader>
            <CardTitle>Déposer un document</CardTitle>
            <CardDescription>
              Formats acceptés : PDF, DOCX, XLSX, PNG, JPG (max 10 Mo)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUpload userId={userId} />
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Mes documents</CardTitle>
            <CardDescription>
              {userDocs.length > 0
                ? `${userDocs.length} document${userDocs.length > 1 ? "s" : ""} archivé${userDocs.length > 1 ? "s" : ""}`
                : "Aucun document pour le moment"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentList documents={userDocs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
