import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Download, FileText, Play } from "lucide-react";
import { db } from "@/lib/db";
import { courses, lessons } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getCourseWithLessons(courseSlug: string, lessonSlug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, courseSlug),
  });

  if (!course) return null;

  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
  });

  const currentLesson = courseLessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) return null;

  const currentIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
  const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  return {
    course,
    lessons: courseLessons,
    currentLesson,
    previousLesson,
    nextLesson,
  };
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/connexion");
  }

  const { courseSlug, lessonSlug } = await params;
  const data = await getCourseWithLessons(courseSlug, lessonSlug);

  if (!data) {
    notFound();
  }

  const { course, lessons: allLessons, currentLesson, previousLesson, nextLesson } = data;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/cours/${course.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au cours
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-premium overflow-hidden">
              <div className="aspect-video bg-black relative">
                {currentLesson.videoUrl ? (
                  <video
                    controls
                    className="w-full h-full"
                    poster={`https://placehold.co/1280x720/1a1a1a/d4af37?text=${encodeURIComponent(currentLesson.title)}`}
                  >
                    <source src={currentLesson.videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Vidéo à venir</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {course.category}
                    </Badge>
                    <CardTitle className="text-2xl">{currentLesson.title}</CardTitle>
                    {currentLesson.description && (
                      <CardDescription className="text-base mt-2">
                        {currentLesson.description}
                      </CardDescription>
                    )}
                  </div>
                  {currentLesson.duration && (
                    <Badge variant="outline" className="shrink-0">
                      {formatDuration(currentLesson.duration)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="description" className="flex-1">
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex-1">
                      Ressources
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground">
                        {currentLesson.description ||
                          "Cette leçon fait partie du programme de formation sur le trading des métaux. Le contenu vidéo et les supports PDF sont disponibles ci-dessus et dans l'onglet Ressources."}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="space-y-4">
                    <div className="space-y-3">
                      {currentLesson.pdfUrl ? (
                        <a
                          href={currentLesson.pdfUrl}
                          download
                          className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium">Support de cours (PDF)</p>
                            <p className="text-sm text-muted-foreground">
                              Télécharger le document complet
                            </p>
                          </div>
                          <Download className="h-5 w-5 text-muted-foreground" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border text-muted-foreground">
                          <FileText className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Support de cours (PDF)</p>
                            <p className="text-sm">À venir prochainement</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator className="my-6" />

                <div className="flex flex-col sm:flex-row gap-4">
                  {previousLesson ? (
                    <Link href={`/apprendre/${course.slug}/${previousLesson.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Leçon précédente
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextLesson ? (
                    <Link href={`/apprendre/${course.slug}/${nextLesson.slug}`} className="flex-1">
                      <Button className="btn-brass w-full">
                        Leçon suivante
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/cours/${course.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Terminer le cours
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="card-premium sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>Programme du cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {allLessons.map((lesson, index) => (
                    <Link
                      key={lesson.id}
                      href={`/apprendre/${course.slug}/${lesson.slug}`}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        lesson.id === currentLesson.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs shrink-0 ${
                          lesson.id === currentLesson.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{lesson.title}</p>
                        {lesson.duration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDuration(lesson.duration)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
