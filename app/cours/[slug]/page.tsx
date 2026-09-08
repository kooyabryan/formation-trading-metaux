import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, FileText, Play } from "lucide-react";
import { db } from "@/lib/db";
import { courses, lessons } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getCourse(slug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, slug),
  });

  if (!course) return null;

  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
  });

  return { ...course, lessons: courseLessons };
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const totalDuration = course.lessons.reduce((acc, lesson) => acc + (lesson.duration || 0), 0);

  return (
    <div>
      {/* Course Header with Image */}
      {course.imageUrl && (
        <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
          <Image 
            src={course.imageUrl} 
            alt={course.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/70 to-[#0a0b0e]/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
              <div className="max-w-5xl mx-auto">
                <Badge variant="secondary" className="mb-4 bg-[#16171d]/80 backdrop-blur-sm border-[#b8925c]/30 text-[#d1aa73]">
                  {course.category}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] mb-4 text-[#f3f4f6]">
                  {course.title}
                </h1>
                <p className="text-lg sm:text-xl text-[#d1d5db] max-w-3xl">{course.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/cours"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
            >
              ← Retour aux formations
            </Link>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{course.lessons.length}</p>
                  <p className="text-sm text-muted-foreground">Leçons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{formatDuration(totalDuration)}</p>
                  <p className="text-sm text-muted-foreground">Durée totale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{course.lessons.length}</p>
                  <p className="text-sm text-muted-foreground">Supports PDF</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="text-2xl">Programme du cours</CardTitle>
            <CardDescription>
              Cliquez sur une leçon pour accéder au contenu vidéo et aux supports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div key={lesson.id}>
                  <Link
                    href={`/apprendre/${course.slug}/${lesson.slug}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      {lesson.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {lesson.duration && (
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(lesson.duration)}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                  {index < course.lessons.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

          <div className="mt-8 flex justify-center">
            <Link href={`/apprendre/${course.slug}/${course.lessons[0]?.slug}`}>
              <Button size="lg" className="btn-brass">
                Commencer le cours
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
