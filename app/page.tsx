import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Shield, Users, Award } from "lucide-react";
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

export default async function HomePage() {
  const allCourses = await getCourses();

  return (
    <div className="flex flex-col">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Formation Professionnelle B2B
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] brass-gradient">
              Maîtrisez le trading des métaux
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Formation complète pour les professionnels : marchés, stratégies et
              conformité dans le trading des métaux précieux et industriels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/cours">
                <Button size="lg" className="btn-brass text-lg">
                  Découvrir les formations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/inscription">
                <Button size="lg" variant="outline">Créer un compte</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Contenu expert",
                description: "Formations conçues par des professionnels du secteur",
              },
              {
                icon: Shield,
                title: "Conformité",
                description: "KYC/AML et processus documentaires complets",
              },
              {
                icon: Users,
                title: "B2B Focus",
                description: "Adapté aux trading desks et acteurs professionnels",
              },
              {
                icon: Award,
                title: "Certification",
                description: "Validez vos compétences avec nos parcours certifiés",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[var(--font-playfair)] mb-4">
              Nos formations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Parcours complets du fondamental à l&apos;expertise opérationnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allCourses.map((course) => (
              <Card key={course.id} className="card-premium hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
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
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-[var(--font-playfair)]">
              Prêt à développer votre expertise ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Rejoignez les professionnels qui font confiance à MetalTrade Academy
              pour leur formation continue.
            </p>
            <Link href="/inscription">
              <Button size="lg" className="btn-brass text-lg">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
