import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Shield, FileCheck, TrendingUp } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#13141a] via-[#0d0e12] to-[#0a0b0e]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b8925c] rounded-full blur-[128px] opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d1aa73] rounded-full blur-[128px] opacity-15" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 bg-[#16171d] border-[#27282f] text-[#d1aa73]">
              Formation Professionnelle B2B
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-playfair)] leading-tight">
              Comprendre les métaux.
              <br />
              <span className="brass-gradient">Décider avec méthode.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#d1d5db] max-w-2xl mx-auto leading-relaxed">
              Formation complète pour les professionnels du trading de métaux : 
              stratégies, conformité et excellence opérationnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/cours">
                <Button size="lg" className="btn-brass text-lg px-8">
                  Découvrir les formations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/inscription">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 border-[#3f404e] hover:bg-[#16171d] hover:border-[#d1aa73] hover:text-[#d1aa73]"
                >
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0d0e12]">
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
                icon: TrendingUp,
                title: "Approche méthodique",
                description: "Stratégies éprouvées pour le trading des métaux",
              },
              {
                icon: FileCheck,
                title: "Certification",
                description: "Validez vos compétences avec nos parcours certifiés",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-[#16171d] border border-[#27282f] flex items-center justify-center">
                    <Icon className="h-7 w-7 text-[#d1aa73]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">{feature.title}</h3>
                  <p className="text-sm text-[#8a8b94] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] mb-4 text-[#f3f4f6]">
              Parcours spécialisés en{" "}
              <span className="brass-gradient">trading des métaux</span>
            </h2>
            <p className="text-lg text-[#d1d5db] max-w-2xl mx-auto">
              Du fondamental à l&apos;expertise opérationnelle, 
              maîtrisez chaque aspect du trading professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allCourses.map((course) => (
              <Card 
                key={course.id} 
                className="card-premium group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-[#16171d] border-[#27282f] text-[#d1aa73]"
                    >
                      {course.category}
                    </Badge>
                    <span className="text-sm text-[#8a8b94]">
                      {course.lessonCount} leçons
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#d1aa73] transition-colors text-[#f3f4f6]">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-base text-[#d1d5db] leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/cours/${course.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#3f404e] hover:bg-[#16171d] hover:border-[#d1aa73] hover:text-[#d1aa73] group-hover:border-[#b8925c]"
                    >
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

      {/* CTA Section */}
      <section className="py-24 bg-[#0d0e12]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] text-[#f3f4f6]">
              Prêt à développer votre expertise ?
            </h2>
            <p className="text-lg text-[#d1d5db] leading-relaxed">
              Rejoignez les professionnels qui font confiance à MetalTrade Academy
              pour leur formation continue en trading de métaux.
            </p>
            <Link href="/inscription">
              <Button size="lg" className="btn-brass text-lg px-8">
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
