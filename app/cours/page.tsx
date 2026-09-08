import Link from "next/link";
import Image from "next/image";
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 text-primary">
          <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] mb-3 sm:mb-4">
          Nos formations professionnelles
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
          Parcours complets pour maîtriser le trading des métaux, de l&apos;introduction
          aux processus de conformité avancés.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {allCourses.map((course) => (
          <Link 
            key={course.id}
            href={`/cours/${course.slug}`}
            className="block group"
          >
            <Card className="card-premium group-hover:brass-glow h-full transition-all duration-300 group-active:scale-[0.98] flex flex-col overflow-hidden">
              {course.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e]/90 via-[#0a0b0e]/40 to-transparent" />
                </div>
              )}
              <CardHeader className="flex-1 space-y-4 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <Badge 
                    variant="secondary"
                    className="bg-gradient-to-r from-[#b8925c]/10 to-[#d1aa73]/10 border-[#b8925c]/30 text-[#d1aa73] text-xs px-3 py-1 font-medium"
                  >
                    {course.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm text-[#8a8b94] bg-[#16171d] px-2.5 py-1 rounded-md border border-[#27282f]">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="font-medium">{course.lessonCount}</span>
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-primary font-medium text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300">
                  <span>Voir le programme</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allCourses.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-base sm:text-lg">
            Aucune formation disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  );
}
