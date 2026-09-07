import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { db } from "../lib/db";
import { courses, lessons, quizzes } from "../lib/db/schema";

// Ensure public/cours directory exists
const coursesDir = path.join(process.cwd(), "public", "cours");
if (!fs.existsSync(coursesDir)) {
  fs.mkdirSync(coursesDir, { recursive: true });
}

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
  // ===== COURS 1: Introduction aux métaux (7 leçons) =====
  {
    courseSlug: "introduction-aux-metaux",
    slug: "fondamentaux-marches-metaux",
    title: "Les fondamentaux des marchés de métaux",
    description: "Comprendre les bases du fonctionnement des marchés mondiaux de métaux et leur importance économique.",
    body: `# Les fondamentaux des marchés de métaux

Les marchés des métaux jouent un rôle crucial dans l'économie mondiale. Ils servent de baromètre pour l'activité industrielle et constituent des actifs stratégiques pour les investisseurs institutionnels et les entreprises.

## Importance économique

Les métaux représentent des matières premières essentielles pour l'industrie moderne. Du cuivre utilisé dans les infrastructures électriques à l'aluminium dans l'aéronautique, en passant par l'or comme réserve de valeur, chaque métal possède des caractéristiques uniques qui influencent son prix et sa demande.

## Structure des marchés

Les marchés de métaux fonctionnent selon des mécanismes de découverte de prix impliquant producteurs, transformateurs, négociants et utilisateurs finaux. Les bourses spécialisées comme le London Metal Exchange (LME), le COMEX ou le Shanghai Futures Exchange (SHFE) centralisent les transactions et assurent la transparence.

## Facteurs de prix

Les prix des métaux sont influencés par l'offre (production minière, recyclage), la demande (consommation industrielle, investissement), les stocks disponibles et les facteurs macroéconomiques globaux. Comprendre ces dynamiques est essentiel pour tout professionnel du secteur.`,
    objectives: `- Identifier les principaux marchés de métaux mondiaux
- Comprendre les mécanismes de formation des prix
- Reconnaître les facteurs d'offre et de demande
- Appréhender le rôle économique des métaux`,
    keyTakeaways: `- Les métaux sont des actifs stratégiques mondiaux
- Les bourses spécialisées assurent la transparence des prix
- L'offre et la demande déterminent les prix de marché
- Les facteurs macroéconomiques influencent tous les métaux
- Chaque métal possède des caractéristiques spécifiques`,
    videoScript: `Bonjour et bienvenue dans ce premier module sur les fondamentaux des marchés de métaux. Je suis ravi de vous accompagner dans cette formation professionnelle.

Aujourd'hui, nous allons explorer ensemble pourquoi les marchés des métaux sont si importants dans l'économie mondiale et comment ils fonctionnent au quotidien.

Commençons par une question simple : pourquoi les métaux sont-ils si importants ? La réponse est partout autour de nous. Regardez votre téléphone, votre ordinateur, les câbles électriques, les voitures, les avions. Tous ces objets contiennent des métaux essentiels. Le cuivre pour l'électricité, l'aluminium pour sa légèreté, l'or comme réserve de valeur depuis des millénaires.

Les marchés de métaux ne sont pas simplement des lieux d'échange. Ce sont des écosystèmes complexes où se rencontrent producteurs miniers, transformateurs industriels, négociants professionnels et utilisateurs finaux. Chacun joue un rôle crucial dans la chaîne de valeur.

Parlons maintenant des grandes bourses spécialisées. Le London Metal Exchange, fondé en 1877, reste la référence mondiale pour les métaux industriels. Le COMEX à New York domine le trading des métaux précieux. Et depuis vingt ans, la Chine est devenue incontournable avec le Shanghai Futures Exchange.

Ces bourses assurent trois fonctions essentielles : la découverte des prix à travers l'équilibre entre offre et demande, la gestion des risques grâce aux contrats à terme et futures, et la garantie de livraison physique si nécessaire.

Comment se forment les prix ? C'est une danse complexe entre plusieurs facteurs. Du côté de l'offre, nous avons la production minière mondiale, le recyclage croissant, et les stocks stratégiques. Du côté de la demande, la consommation industrielle représente souvent plus de quatre-vingts pour cent du total, complétée par la demande d'investissement.

Mais ce n'est pas tout. Les facteurs macroéconomiques jouent un rôle majeur. La croissance économique mondiale, les taux de change, notamment le dollar américain, les taux d'intérêt, et même les tensions géopolitiques peuvent faire bouger les marchés.

Prenons un exemple pédagogique concret. Imaginons que la Chine annonce un grand plan d'infrastructure. La demande anticipée de cuivre et d'acier augmentera immédiatement les prix, avant même que les travaux ne commencent. C'est ce qu'on appelle l'effet d'anticipation.

Un autre aspect crucial : chaque métal a sa propre personnalité. L'or est perçu comme une valeur refuge en période d'incertitude. Le cuivre est surnommé « Doctor Copper » car il diagnostique la santé économique mondiale. Le lithium connaît une demande explosive avec les véhicules électriques.

En résumé, les marchés de métaux sont des systèmes dynamiques où se croisent facteurs physiques, financiers et psychologiques. Maîtriser ces fondamentaux est la première étape pour devenir un professionnel accompli du trading de métaux.

Dans la prochaine leçon, nous approfondirons la classification des métaux et leurs utilisations spécifiques. À très bientôt !`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    order: 1,
    duration: 840,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "classification-metaux",
    title: "Classification et propriétés des métaux",
    description: "Découvrez les différentes catégories de métaux : précieux, de base, ferreux et stratégiques.",
    body: `# Classification et propriétés des métaux

La classification des métaux est essentielle pour comprendre leurs usages industriels, leurs marchés et leurs dynamiques de prix. Chaque catégorie possède des caractéristiques physiques et économiques distinctes.

## Métaux précieux

Les métaux précieux (or, argent, platine, palladium) se caractérisent par leur rareté, leur résistance à la corrosion et leur valeur élevée. L'or sert de réserve de valeur et d'actif financier. L'argent combine usage industriel et monétaire. Le platine et le palladium sont cruciaux pour les catalyseurs automobiles.

## Métaux de base

Les métaux de base (cuivre, aluminium, zinc, nickel, plomb, étain) constituent le socle de l'industrie moderne. Le cuivre est indispensable aux infrastructures électriques. L'aluminium domine l'aéronautique et l'emballage. Le zinc protège l'acier de la corrosion.

## Métaux stratégiques

Certains métaux sont qualifiés de stratégiques en raison de leur importance critique pour les technologies avancées : terres rares, lithium, cobalt. Leur concentration géographique et leur demande croissante en font des enjeux géopolitiques majeurs.`,
    objectives: `- Distinguer les principales catégories de métaux
- Comprendre les propriétés physiques et chimiques
- Identifier les usages industriels spécifiques
- Reconnaître les enjeux stratégiques de chaque catégorie`,
    keyTakeaways: `- Quatre grandes catégories : précieux, base, ferreux, stratégiques
- Chaque métal possède des propriétés uniques
- Les usages déterminent les marchés et la demande
- Certains métaux sont devenus stratégiques pour les technologies
- La classification guide les stratégies de trading`,
    videoScript: `Bienvenue dans cette deuxième leçon consacrée à la classification des métaux. Comprendre comment classifier les métaux est fondamental pour naviguer efficacement dans ce secteur.

Imaginez un instant que vous entrez dans un grand magasin. Les produits sont organisés par rayons : alimentaire, électronique, vêtements. Les métaux fonctionnent de la même manière. Cette organisation n'est pas arbitraire, elle reflète des propriétés physiques, des usages et des marchés distincts.

Commençons par la catégorie la plus connue : les métaux précieux. Pourquoi les appelle-t-on précieux ? D'abord pour leur rareté. L'or extrait depuis le début de l'humanité tiendrait dans un cube de vingt et un mètres de côté. Ensuite pour leur beauté et leur résistance à la corrosion. L'or ne ternit jamais, ce qui explique son usage millénaire.

L'or, bien sûr, est le roi. Valeur refuge, réserve monétaire des banques centrales, bijouterie de luxe. Mais attention, l'or a aussi des usages industriels, notamment en électronique pour sa conductivité. L'argent est le petit frère polyvalent : métal précieux par tradition, mais aussi métal industriel massif. Plus de cinquante pour cent de la demande d'argent vient de l'industrie, notamment photovoltaïque et électronique.

Le platine et le palladium forment le duo des catalyseurs automobiles. Ces métaux permettent de réduire les émissions polluantes des véhicules. Leur prix peut être volatile car la demande dépend étroitement de l'industrie automobile mondiale.

Passons maintenant aux métaux de base, aussi appelés métaux communs ou industriels. Ne vous laissez pas tromper par le terme « commun ». Ces métaux sont le sang de l'économie moderne. Le cuivre, surnommé Doctor Copper, est présent partout : câbles électriques, tuyauterie, circuits imprimés. Sa consommation croît avec l'électrification et les énergies renouvelables.

L'aluminium est le métal de la légèreté. Trois fois plus léger que l'acier, résistant à la corrosion, recyclable à l'infini. L'aviation moderne serait impossible sans lui. Les cannettes de boisson que vous recyclez seront de nouvelles cannettes dans deux mois, un exemple parfait d'économie circulaire.

Le zinc joue un rôle discret mais vital : la galvanisation. Recouvrir l'acier de zinc le protège de la rouille. Regardez les garde-corps, les pylônes électriques, les toitures métalliques. Le zinc est là, invisible mais indispensable.

Arrivons maintenant aux métaux stratégiques. Ce terme est apparu récemment pour désigner des métaux cruciaux pour les technologies avancées. Le lithium pour les batteries. Le cobalt pour leur stabilité. Les terres rares pour les aimants permanents des éoliennes et véhicules électriques.

Pourquoi stratégiques ? Parce que leur concentration géographique crée des dépendances. La République Démocratique du Congo produit soixante-dix pour cent du cobalt mondial. La Chine domine le raffinage des terres rares. Ces situations créent des risques d'approvisionnement et des enjeux géopolitiques.

Un exemple pédagogique pour illustrer l'importance de cette classification. Un trader spécialisé en métaux précieux ne suivra pas les mêmes indicateurs qu'un trader de métaux industriels. Le premier surveillera l'inflation, les taux réels, la demande de valeurs refuges. Le second analysera la production industrielle, la croissance chinoise, les projets d'infrastructure.

Comprendre cette classification vous permet aussi d'anticiper les corrélations. Les métaux précieux évoluent souvent ensemble en réaction aux mêmes facteurs macro. Les métaux de base suivent le cycle économique avec des nuances propres à chacun.

En conclusion, la classification des métaux n'est pas un simple exercice académique. C'est un outil professionnel qui structure votre compréhension des marchés, guide vos analyses et affine vos stratégies de trading.

Dans la prochaine leçon, nous étudierons les principales bourses et places de marché mondiales. À bientôt !`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    order: 2,
    duration: 900,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "bourses-mondiales",
    title: "Les bourses et places de marché mondiales",
    description: "Explorez le LME, COMEX, SHFE et les autres plateformes majeures du trading de métaux.",
    body: `# Les bourses et places de marché mondiales

Les bourses spécialisées constituent l'infrastructure centrale du trading de métaux. Elles assurent la transparence, la liquidité et la sécurité des transactions à l'échelle mondiale.

## London Metal Exchange (LME)

Fondé en 1877, le LME est la bourse de référence pour les métaux industriels. Il propose des contrats sur le cuivre, l'aluminium, le zinc, le nickel, le plomb et l'étain. Le LME se distingue par son système unique de "ring trading" et ses contrats avec livraison physique possible dans des entrepôts certifiés mondialement.

## COMEX (New York)

Partie du CME Group, le COMEX domine le trading des métaux précieux, principalement l'or et l'argent. Les contrats COMEX servent de référence mondiale pour les prix. Les volumes quotidiens atteignent des milliards de dollars, reflétant l'importance de cette place.

## Shanghai Futures Exchange (SHFE)

Le SHFE est devenu incontournable avec la montée en puissance de l'économie chinoise. Il propose des contrats sur cuivre, aluminium, zinc, plomb, nickel, étain, or et argent, avec une influence croissante sur les prix mondiaux.`,
    objectives: `- Identifier les principales bourses de métaux
- Comprendre les spécificités de chaque place
- Maîtriser les horaires et fuseaux horaires
- Reconnaître l'importance géographique des marchés`,
    keyTakeaways: `- Le LME domine les métaux industriels depuis 1877
- Le COMEX est la référence pour les métaux précieux
- Le SHFE reflète la puissance chinoise sur les marchés
- Chaque bourse a ses propres spécifications de contrats
- Les fuseaux horaires créent des fenêtres de trading globales`,
    videoScript: `Bonjour et bienvenue dans cette troisième leçon sur les bourses et places de marché mondiales. Aujourd'hui, nous allons voyager à travers les principales places financières qui font battre le cœur du trading de métaux vingt-quatre heures sur vingt-quatre.

Commençons notre voyage à Londres, berceau historique du trading de métaux. Le London Metal Exchange, ou LME, a été fondé en 1877. Imaginez : cent quarante-sept ans d'histoire, de traditions et d'évolution continue. Le LME n'est pas simplement une bourse, c'est une institution.

Ce qui rend le LME unique, c'est son "ring trading". Dans une salle circulaire, des traders assis dans des fauteuils en cuir rouge crient leurs ordres pendant des sessions de cinq minutes pour chaque métal. Ce spectacle, vestige d'une époque révolue, coexiste avec des plateformes électroniques ultramodernes. Cette dualité symbolise l'équilibre entre tradition et innovation.

Le LME propose des contrats sur six métaux de base : cuivre, aluminium, zinc, nickel, plomb et étain. Chaque contrat peut aboutir à une livraison physique dans l'un des centaines d'entrepôts certifiés LME à travers le monde. De Singapour à Rotterdam, de la Corée du Sud à la Malaisie, ce réseau mondial assure la liquidité et la confiance.

Un aspect fascinant du LME : ses contrats avec échéances quotidiennes jusqu'à trois mois, puis mensuelles jusqu'à cent vingt-trois mois. Cette flexibilité unique permet une couverture précise des risques pour les industriels.

Traversons maintenant l'Atlantique direction New York et le COMEX. Le COMEX, partie du CME Group, est le temple des métaux précieux. Ici, l'or et l'argent sont rois. Les contrats COMEX Gold et Silver servent de référence mondiale. Quand un journal annonce « le prix de l'or », il parle presque toujours du contrat COMEX le plus actif.

Les volumes sur le COMEX sont impressionnants. Des millions d'onces d'or changent de mains chaque jour, principalement sous forme de contrats papier. La livraison physique reste possible mais minoritaire. Le COMEX est avant tout un marché financier où hedgers et spéculateurs se rencontrent.

Une particularité américaine : le CFTC, Commodity Futures Trading Commission, régule strictement ces marchés. Les rapports hebdomadaires du CFTC sur les positions des traders sont scrutés par tous les professionnels. Ils révèlent qui accumule, qui réduit, qui spécule.

Cap maintenant vers l'Est, direction Shanghai. Le Shanghai Futures Exchange représente la montée en puissance fulgurante de la Chine sur les marchés mondiaux. En vingt ans, le SHFE est devenu incontournable. La Chine consomme environ cinquante pour cent du cuivre mondial, quarante pour cent de l'aluminium. Le SHFE reflète cette réalité.

Le SHFE propose des contrats en yuan, ce qui ajoute une dimension de change pour les traders internationaux. Les prix sur le SHFE peuvent diverger des prix LME en raison de facteurs locaux chinois : politiques intérieures, stocks d'État, contrôles d'importation. Ces écarts créent des opportunités d'arbitrage pour les traders sophistiqués.

Mais le monde ne s'arrête pas à ces trois géants. Le Multi Commodity Exchange of India gagne en importance. Le Tokyo Commodity Exchange a ses spécificités. Même le Dubai Gold and Commodities Exchange développe son influence régionale.

Cette géographie mondiale crée un marché continu. Quand Londres ferme, New York prend le relais. Quand New York dort, Shanghai s'éveille. Ce cycle perpétuel permet aux professionnels de réagir en temps réel aux événements mondiaux.

Un exemple pédagogique concret. Imaginons qu'une mine majeure de cuivre annonce un problème de production pendant les heures asiatiques. Le prix monte immédiatement sur le SHFE. Les traders à Londres, qui arrivent quelques heures plus tard, verront cette hausse et ajusteront leurs positions sur le LME. Quand New York ouvrira, le mouvement sera déjà intégré. C'est cette interconnexion qui rend les marchés efficaces.

Comprendre ces bourses, leurs spécificités, leurs horaires, leurs particularités contractuelles est essentiel. Un trader professionnel doit savoir quel contrat utiliser selon ses besoins : couverture physique, spéculation, arbitrage. Il doit comprendre comment les prix s'influencent mutuellement entre places.

Dans la prochaine leçon, nous étudierons les acteurs clés des marchés de métaux : producteurs, transformateurs, négociants et consommateurs finaux. À très bientôt !`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    order: 3,
    duration: 960,
  },
];

// Function to generate PDF workbook
function generatePDF(course: typeof coursesData[0], courseLessons: typeof lessonsData): string {
  const filename = `${course.slug}-cahier-etude.pdf`;
  const filepath = path.join(coursesDir, filename);
  
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  doc.pipe(fs.createWriteStream(filepath));
  
  // Title page
  doc.fontSize(24).font("Helvetica-Bold").text(course.title, { align: "center" });
  doc.moveDown();
  doc.fontSize(16).font("Helvetica").text("Cahier d'étude", { align: "center" });
  doc.moveDown(2);
  doc.fontSize(12).text(course.description, { align: "justify" });
  doc.moveDown(3);
  
  // Disclaimer
  doc.fontSize(10).font("Helvetica-Oblique")
    .text("Avertissement : Ce document est fourni à des fins éducatives uniquement. Il ne constitue en aucun cas un conseil en investissement, une recommandation d'achat ou de vente, ni une incitation au trading. Consultez toujours un conseiller financier agréé.", 
    { align: "justify" });
  
  doc.addPage();
  
  // Table of contents
  doc.fontSize(18).font("Helvetica-Bold").text("Table des matières", { underline: true });
  doc.moveDown();
  doc.fontSize(12).font("Helvetica");
  
  courseLessons.forEach((lesson, index) => {
    doc.text(`${index + 1}. ${lesson.title}`);
    doc.moveDown(0.5);
  });
  
  // Lessons
  courseLessons.forEach((lesson, index) => {
    doc.addPage();
    doc.fontSize(16).font("Helvetica-Bold").text(`Leçon ${index + 1}: ${lesson.title}`);
    doc.moveDown();
    
    doc.fontSize(12).font("Helvetica").text(lesson.description || "", { align: "justify" });
    doc.moveDown();
    
    if (lesson.objectives) {
      doc.fontSize(14).font("Helvetica-Bold").text("Objectifs d'apprentissage");
      doc.moveDown(0.5);
      doc.fontSize(11).font("Helvetica").text(lesson.objectives, { align: "justify" });
      doc.moveDown();
    }
    
    if (lesson.keyTakeaways) {
      doc.fontSize(14).font("Helvetica-Bold").text("Points clés à retenir");
      doc.moveDown(0.5);
      doc.fontSize(11).font("Helvetica").text(lesson.keyTakeaways, { align: "justify" });
      doc.moveDown();
    }
    
    // Notes section
    doc.moveDown(2);
    doc.fontSize(14).font("Helvetica-Bold").text("Mes notes");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica").text("_".repeat(100));
    doc.moveDown(0.3);
    doc.text("_".repeat(100));
    doc.moveDown(0.3);
    doc.text("_".repeat(100));
  });
  
  doc.end();
  return `/cours/${filename}`;
}

async function seed() {
  console.log("🌱 Seeding database with comprehensive course content...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(quizzes);
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

  // Generate PDFs
  console.log("Generating PDF workbooks...");
  for (const course of insertedCourses) {
    const courseLessons = lessonsData.filter(l => l.courseSlug === course.slug);
    const courseData = coursesData.find(c => c.slug === course.slug)!;
    const pdfPath = generatePDF(courseData, courseLessons);
    console.log(`✓ Generated PDF: ${pdfPath}`);
  }

  console.log("✅ Seeding complete!");
  console.log("\n📊 Summary:");
  console.log(`- ${insertedCourses.length} courses created`);
  console.log(`- ${insertedLessons.length} lessons created`);
  console.log(`- ${insertedCourses.length} PDF workbooks generated in /public/cours/`);
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
