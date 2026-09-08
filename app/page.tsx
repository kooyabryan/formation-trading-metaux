import Link from "next/link";
import Image from "next/image";
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
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        <Image 
          src="/images/hero-desk.png" 
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0e]/95 via-[#0d0e12]/90 to-[#0a0b0e]/95" />
        <div className="absolute inset-0 opacity-20 md:opacity-30" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#b8925c] rounded-full blur-[96px] md:blur-[128px] opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#d1aa73] rounded-full blur-[96px] md:blur-[128px] opacity-15 animate-pulse-slow" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <Badge variant="secondary" className="bg-[#16171d] border-[#27282f] text-[#d1aa73] text-sm px-4 py-1.5 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d1aa73] rounded-full animate-pulse" />
              Formation Professionnelle B2B
            </Badge>
            <h1 className="font-[var(--font-playfair)] leading-[1.1] sm:leading-tight">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f3f4f6] mb-3 sm:mb-4">
                Comprendre les métaux.
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl brass-gradient font-semibold">
                Décider avec méthode.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#d1d5db] max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Formation complète pour les professionnels du trading de métaux : 
              stratégies, conformité et excellence opérationnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-4 sm:px-0">
              <Link href="/cours" className="w-full sm:w-auto">
                <Button size="lg" className="btn-brass text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-target">
                  Découvrir les formations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/inscription" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-6 sm:px-8 border-[#3f404e] hover:bg-[#16171d] hover:border-[#d1aa73] hover:text-[#d1aa73] w-full sm:w-auto text-base sm:text-lg min-h-[52px] sm:min-h-[56px] transition-all duration-300 touch-target"
                >
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Band Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <Image 
          src="/images/chart-abstract.png" 
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0e]/98 via-[#0d0e12]/95 to-[#0a0b0e]/98" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] text-[#f3f4f6]">
              Une approche méthodique du{" "}
              <span className="brass-gradient">trading professionnel</span>
            </h2>
            <p className="text-base sm:text-lg text-[#d1d5db] leading-relaxed px-4 sm:px-0">
              Des stratégies éprouvées, validées par des années d'expérience sur les marchés mondiaux de métaux.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-[#0d0e12]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                <div key={index} className="text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-[#16171d] border border-[#27282f] flex items-center justify-center">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#d1aa73]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#f3f4f6]">{feature.title}</h3>
                  <p className="text-sm text-[#8a8b94] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 sm:py-20 md:py-24 section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] mb-3 sm:mb-4 text-[#f3f4f6]">
              Parcours spécialisés en{" "}
              <span className="brass-gradient">trading des métaux</span>
            </h2>
            <p className="text-base sm:text-lg text-[#d1d5db] max-w-2xl mx-auto px-4 sm:px-0">
              Du fondamental à l&apos;expertise opérationnelle, 
              maîtrisez chaque aspect du trading professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {allCourses.map((course) => (
              <Link 
                key={course.id}
                href={`/cours/${course.slug}`}
                className="block group"
              >
                <Card className="card-premium group-hover:brass-glow h-full transition-all duration-300 group-active:scale-[0.98] overflow-hidden">
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
                  <CardHeader className="space-y-4 pb-4">
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
                    <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-[#d1aa73] transition-colors duration-300 text-[#f3f4f6]">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-[#d1d5db] leading-relaxed line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-[#d1aa73] font-medium text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300">
                      <span>Voir le programme</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <Image 
          src="/images/training-room.png" 
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0b0e]/92" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] text-[#f3f4f6] px-4 sm:px-0">
              Prêt à développer votre expertise ?
            </h2>
            <p className="text-base sm:text-lg text-[#d1d5db] leading-relaxed px-4 sm:px-0">
              Rejoignez les professionnels qui font confiance à Formation Trading des Métaux
              pour leur formation continue en trading de métaux.
            </p>
            <Link href="/inscription" className="inline-block">
              <Button size="lg" className="btn-brass text-base sm:text-lg px-6 sm:px-8 min-h-[52px] sm:min-h-[56px] touch-target">
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
