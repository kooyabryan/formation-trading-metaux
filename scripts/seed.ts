import { db } from "../lib/db";
import { courses, lessons } from "../lib/db/schema";

const coursesData = [
  {
    slug: "introduction-aux-metaux",
    title: "Introduction aux métaux",
    description: "Découvrez les différents types de métaux, les marchés mondiaux et les principaux acteurs du secteur. Une introduction complète pour comprendre les fondamentaux du trading de métaux.",
    category: "Fondamentaux",
    order: 1,
  },
  {
    slug: "trading-metaux-precieux",
    title: "Trading des métaux précieux",
    description: "Apprenez les bases du trading des métaux précieux : or, argent, platine. Comprenez les cotations, les risques et les stratégies essentielles.",
    category: "Trading",
    order: 2,
  },
  {
    slug: "processus-compliance",
    title: "Processus & compliance",
    description: "Maîtrisez les flux documentaires, les procédures KYC/AML et les exigences de conformité pour les trading desks de métaux.",
    category: "Conformité",
    order: 3,
  },
];

const lessonsData = [
  // Course 1: Introduction aux métaux
  {
    courseSlug: "introduction-aux-metaux",
    slug: "types-de-metaux",
    title: "Les différents types de métaux",
    description: "Métaux ferreux, non-ferreux, précieux et industriels : classifications et caractéristiques.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    order: 1,
    duration: 780,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "marches-mondiaux",
    title: "Les marchés mondiaux des métaux",
    description: "LME, COMEX, SHFE : comprendre les principales bourses et leur fonctionnement.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    order: 2,
    duration: 900,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "acteurs-secteur",
    title: "Les acteurs du secteur",
    description: "Producteurs, traders, transformateurs et consommateurs : la chaîne de valeur complète.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    order: 3,
    duration: 720,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "flux-physiques-financiers",
    title: "Flux physiques et financiers",
    description: "Comment circulent les métaux et les capitaux dans l'économie mondiale.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    order: 4,
    duration: 840,
  },

  // Course 2: Trading des métaux précieux
  {
    courseSlug: "trading-metaux-precieux",
    slug: "bases-trading-or",
    title: "Les bases du trading de l'or",
    description: "Comprendre les cotations, le spot, les forwards et les contrats futures sur l'or.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    order: 1,
    duration: 960,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "argent-et-platine",
    title: "Argent, platine et palladium",
    description: "Spécificités et stratégies de trading pour ces métaux précieux industriels.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    order: 2,
    duration: 840,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "gestion-risques",
    title: "Gestion des risques",
    description: "Hedging, gestion de position et outils de couverture pour les métaux précieux.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    order: 3,
    duration: 1020,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "analyse-marche",
    title: "Analyse de marché",
    description: "Facteurs d'influence, analyse technique et fondamentale appliquée aux métaux précieux.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    order: 4,
    duration: 900,
  },

  // Course 3: Processus & compliance
  {
    courseSlug: "processus-compliance",
    slug: "kyc-aml-bases",
    title: "KYC/AML : les bases",
    description: "Comprendre les obligations de connaissance client et de lutte contre le blanchiment.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    order: 1,
    duration: 780,
  },
  {
    courseSlug: "processus-compliance",
    slug: "flux-documentaires",
    title: "Gestion des flux documentaires",
    description: "Organisation, archivage et traçabilité des documents de trading.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    order: 2,
    duration: 720,
  },
  {
    courseSlug: "processus-compliance",
    slug: "procedures-trading-desk",
    title: "Procédures du trading desk",
    description: "Workflow quotidien, contrôles et best practices opérationnelles.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    order: 3,
    duration: 840,
  },
  {
    courseSlug: "processus-compliance",
    slug: "audit-conformite",
    title: "Audit et conformité",
    description: "Préparer et gérer les audits internes et externes dans le trading de métaux.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    order: 4,
    duration: 900,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(lessons);
  await db.delete(courses);

  // Insert courses
  console.log("Inserting courses...");
  const insertedCourses = await db.insert(courses).values(coursesData).returning();
  console.log(`✓ Inserted ${insertedCourses.length} courses`);

  // Prepare lessons with course IDs
  const lessonsWithCourseIds = lessonsData.map((lesson) => {
    const course = insertedCourses.find((c) => c.slug === lesson.courseSlug);
    if (!course) {
      throw new Error(`Course not found for slug: ${lesson.courseSlug}`);
    }
    const { courseSlug, ...lessonData } = lesson;
    return {
      ...lessonData,
      courseId: course.id,
    };
  });

  // Insert lessons
  console.log("Inserting lessons...");
  const insertedLessons = await db.insert(lessons).values(lessonsWithCourseIds).returning();
  console.log(`✓ Inserted ${insertedLessons.length} lessons`);

  console.log("✅ Seeding complete!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
