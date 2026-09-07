import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { courses, lessons } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getCourses() {
  const allCourses = await db.select().from(courses).orderBy(courses.order);
  
  const coursesWithLessonCount = await Promise.all(
    allCourses.map(async (course) => {
      const lessonCount = await db
        .select({ count: count() })
        .from(lessons)
        .where(eq(lessons.courseId, course.id));
      return {
        ...course,
        lessonCount: lessonCount[0]?.count || 0,
      };
    })
  );

  return coursesWithLessonCount;
}

export default async function CoursePage() {
  const allCourses = await getCourses();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 text-primary">
          <BookOpen className="h-6 w-6" />
          <span className="text-sm font-medium uppercase tracking-wider">Catalogue</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-[var(--font-playfair)] mb-4">
          Nos formations professionnelles
        </h1>
        <p className="text-lg text-muted-foreground">
          Parcours complets pour maîtriser le trading des métaux, de l&apos;introduction
          aux processus de conformité avancés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {allCourses.map((course) => (
          <Card key={course.id} className="card-premium hover:border-primary/50 transition-all duration-300 group flex flex-col">
            <CardHeader className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {course.lessonCount} leçons
                </span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              <CardDescription className="text-base">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/cours/${course.slug}`}>
                <Button variant="outline" className="w-full group-hover:border-primary/50">
                  Voir le programme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {allCourses.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Aucune formation disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  );
}
