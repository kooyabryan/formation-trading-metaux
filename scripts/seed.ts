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

const quizzesData = [
  {
    courseSlug: "introduction-aux-metaux",
    title: "Quiz : Introduction aux métaux",
    questions: JSON.stringify([{question:"Quelle bourse est la référence mondiale pour les métaux industriels ?",options:["COMEX","London Metal Exchange (LME)","Shanghai Futures Exchange","CME Group"],correctAnswer:1,explanation:"Le LME est la bourse de référence pour les métaux industriels."},{question:"Quel métal est surnommé Doctor Copper ?",options:["Aluminium","Zinc","Cuivre","Nickel"],correctAnswer:2,explanation:"Le cuivre reflète la santé économique mondiale."},{question:"Quelle catégorie comprend l'or et l'argent ?",options:["Métaux de base","Métaux précieux","Métaux ferreux","Métaux stratégiques"],correctAnswer:1,explanation:"Les métaux précieux incluent or, argent, platine."},{question:"Quel pays domine les terres rares ?",options:["USA","Australie","Chine","Brésil"],correctAnswer:2,explanation:"La Chine domine à 90%."},{question:"L'offre secondaire provient de :",options:["Mines","Recyclage","Stocks","Importations"],correctAnswer:1,explanation:"Le recyclage est l'offre secondaire."}])
  },
  {
    courseSlug: "trading-metaux-precieux",
    title: "Quiz : Trading des métaux précieux",
    questions: JSON.stringify([{question:"Driver principal de l'or ?",options:["Pétrole","Taux réels","Production","Bijouterie"],correctAnswer:1,explanation:"Les taux réels sont le driver numéro un."},{question:"Fixings LBMA par jour ?",options:["Un","Deux","Trois","Continu"],correctAnswer:1,explanation:"Deux fixings quotidiens."},{question:"Contrat COMEX Gold (onces) ?",options:["50","100","500","1000"],correctAnswer:1,explanation:"100 onces troy par contrat."},{question:"Ratio or/argent historique ?",options:["5","15","50","100"],correctAnswer:1,explanation:"Historiquement autour de 15."},{question:"Risque recommandé par trade ?",options:["5-10%","10-20%","1-2%","25%"],correctAnswer:2,explanation:"Maximum 1-2% du capital par position."}])
  },
  {
    courseSlug: "processus-compliance",
    title: "Quiz : Processus & Compliance",
    questions: JSON.stringify([{question:"KYC signifie ?",options:["Keep Your Cash","Know Your Customer","Key Check","Keep Compliance"],correctAnswer:1,explanation:"Know Your Customer = Connaissance du Client."},{question:"Conservation documents ?",options:["1 an","2-3 ans","5-10 ans","Indéfiniment"],correctAnswer:2,explanation:"5-10 ans selon les régulateurs."},{question:"Fonction préventive des fraudes ?",options:["Ségrégation","Limitation","Audit","Reporting"],correctAnswer:0,explanation:"La ségrégation des fonctions prévient les fraudes."},{question:"Standard lingots or ?",options:["ISO 9001","LBMA Good Delivery","MiFID II","Dodd-Frank"],correctAnswer:1,explanation:"LBMA Good Delivery garantit la qualité."},{question:"Transaction suspecte ?",options:["Ignorer","Plus de garanties","Signaler aux autorités","Refuser"],correctAnswer:2,explanation:"Obligation de signaler via déclaration."}])
  }
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

  // === Course 1: 4 more lessons ===
  {
    courseSlug: "introduction-aux-metaux",
    slug: "acteurs-chaine-valeur",
    title: "Les acteurs de la chaîne de valeur",
    description: "Producteurs, transformateurs, négociants et utilisateurs : comprendre l'écosystème complet.",
    body: `# Les acteurs de la chaîne de valeur

La chaîne de valeur des métaux implique de nombreux acteurs, chacun jouant un rôle spécifique. Comprendre leurs interactions est essentiel pour anticiper les dynamiques de marché.

## Producteurs miniers
Les sociétés minières extraient les métaux de la terre. Giants comme BHP, Rio Tinto, Glencore dominent le secteur. Leur production influence directement l'offre mondiale.

## Transformateurs et raffineurs
Entre la mine et le produit final, les transformateurs raffinent et façonnent les métaux. Ces acteurs intermédiaires assurent la qualité et les spécifications requises.

## Négociants et traders
Les trading houses (Glencore, Trafigura, Mercuria) assurent la liquidité des marchés. Ils connectent producteurs et consommateurs, gèrent la logistique et prennent des risques de marché.`,
    objectives: `- Identifier les principaux acteurs de chaque segment
- Comprendre leurs rôles et interactions
- Reconnaître les rapports de force dans la chaîne
- Appréhender les stratégies de chaque catégorie d'acteur`,
    keyTakeaways: `- La chaîne va de la mine au produit fini
- Les producteurs miniers contrôlent l'offre primaire
- Les traders assurent liquidité et gestion des risques
- Les transformateurs ajoutent de la valeur
- Les consommateurs finaux déterminent la demande`,
    videoScript: `Dans cette leçon, nous explorons l'écosystème complet de la chaîne de valeur des métaux. Au début de la chaîne se trouvent les producteurs miniers comme BHP, Rio Tinto ou Vale qui extraient les métaux du sol. Leurs décisions influencent directement l'offre mondiale. Quand une mine majeure annonce des problèmes, le marché réagit immédiatement.

Ensuite viennent les transformateurs et raffineurs. Le métal brut extrait doit être raffiné, purifié, transformé pour atteindre les spécifications requises par les utilisateurs finaux.

Au cœur de la chaîne se trouvent les négociants et trading houses : Glencore, Trafigura, Mercuria. Ces acteurs moins connus du grand public dominent le commerce mondial. Ils assurent la liquidité en permettant aux producteurs de vendre à l'avance leur production et aux consommateurs de sécuriser leurs approvisionnements.

Enfin, les consommateurs industriels : constructeurs automobiles, fabricants électroniques, entreprises de construction. Leur demande agrégée détermine les prix à long terme. Comprendre ces acteurs et leurs interactions vous donne les clés pour anticiper les mouvements de marché.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    order: 4,
    duration: 600,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "offre-demande-equilibre",
    title: "Offre, demande et équilibre des marchés",
    description: "Analyse des fondamentaux : production, consommation, stocks et formation des prix.",
    body: `# Offre, demande et équilibre des marchés

L'équilibre entre offre et demande détermine les prix des métaux. Analyser ces fondamentaux permet d'anticiper les tendances.

## L'offre de métaux
L'offre primaire provient de la production minière. L'offre secondaire vient du recyclage. Les stocks stratégiques et commerciaux constituent un tampon important.

## La demande de métaux
La demande industrielle domine pour la plupart des métaux. La demande d'investissement joue un rôle majeur pour les métaux précieux. Les tendances technologiques créent de nouvelles dynamiques.

## Équilibre et prix
Quand l'offre excède la demande, les prix baissent et les stocks s'accumulent. Quand la demande dépasse l'offre, les prix montent et les stocks diminuent.`,
    objectives: `- Analyser les composantes de l'offre
- Comprendre les moteurs de la demande
- Identifier les indicateurs clés d'équilibre
- Anticiper l'impact sur les prix`,
    keyTakeaways: `- Offre = production minière + recyclage + variation stocks
- Demande = consommation industrielle + investissement
- Les stocks sont un indicateur crucial
- Les prix reflètent l'équilibre anticipé futur
- Les tendances structurelles modifient les équilibres`,
    videoScript: `L'offre et la demande : le cœur de l'analyse fondamentale. L'offre provient de trois sources. La production minière représente la majorité. Le recyclage peut atteindre trente pour cent pour l'aluminium. Les variations de stocks LME ou réserves chinoises influencent l'offre disponible.

Du côté demande, l'industrie domine. Pour le cuivre, construction et électricité représentent soixante-dix pour cent. Mais de nouvelles tendances émergent. Les véhicules électriques utilisent quatre fois plus de cuivre qu'un véhicule thermique. Les panneaux solaires nécessitent de l'argent.

Pour les métaux précieux, la demande d'investissement est cruciale. Quand l'incertitude augmente, les investisseurs achètent de l'or. L'équilibre entre offre et demande détermine les prix. Mais attention, ce n'est pas l'équilibre actuel qui compte, c'est l'équilibre anticipé futur. Les marchés sont prospectifs.

Surveillez les bilans offre-demande publiés, l'évolution des stocks LME, les guidances des miners et les prévisions industrielles.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    order: 5,
    duration: 660,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "facteurs-macroeconomiques",
    title: "Facteurs macroéconomiques et corrélations",
    description: "Dollar, taux d'intérêt, inflation et leur impact sur les prix des métaux.",
    body: `# Facteurs macroéconomiques et corrélations

Les métaux sont profondément influencés par les grandes variables macroéconomiques mondiales.

## Le dollar américain
Une appréciation du dollar rend les métaux plus chers en autres devises. Une dépréciation a l'effet inverse.

## Les taux d'intérêt
Des taux bas stimulent la croissance et la demande. Pour les métaux précieux, des taux réels négatifs augmentent leur attractivité.

## L'inflation
Les métaux servent historiquement de couverture contre l'inflation. Quand l'inflation accélère, les investisseurs se tournent vers les actifs tangibles.`,
    objectives: `- Comprendre l'impact du dollar
- Analyser l'effet des taux d'intérêt
- Reconnaître les dynamiques inflationnistes
- Identifier les corrélations clés`,
    keyTakeaways: `- Dollar et métaux évoluent en sens inverse
- Les taux réels influencent fortement l'or
- L'inflation favorise traditionnellement les métaux
- La croissance drive les métaux industriels
- Les corrélations varient selon les cycles`,
    videoScript: `Les facteurs macroéconomiques sont cruciaux. Premier facteur : le dollar américain. Tous les métaux sont cotés en dollars. Quand le dollar s'apprécie, les métaux deviennent plus chers pour les acheteurs internationaux. Cette corrélation négative est persistante.

Deuxième facteur : les taux d'intérêt, surtout les taux réels. Pour l'or qui ne verse pas de dividende, les taux réels sont cruciaux. Quand ils sont négatifs, détenir de l'or devient attractif. En deux mille vingt avec des taux réels profondément négatifs, l'or a atteint des sommets historiques.

Troisième facteur : l'inflation. Les métaux sont vus comme protection contre l'inflation. Dans les années soixante-dix, l'or est passé de trente-cinq à huit cent cinquante dollars.

Quatrième facteur : la croissance économique mondiale. Le cuivre, Doctor Copper, diagnostique la santé économique. Quand la croissance accélère, la demande de métaux industriels explose. Comprendre ces facteurs vous permet de replacer votre analyse dans un contexte global.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    order: 6,
    duration: 720,
  },
  {
    courseSlug: "introduction-aux-metaux",
    slug: "geopolitique-metaux-strategiques",
    title: "Géopolitique et métaux stratégiques",
    description: "Enjeux géopolitiques, dépendances d'approvisionnement et métaux critiques.",
    body: `# Géopolitique et métaux stratégiques

Certains métaux sont des enjeux géopolitiques majeurs en raison de leur importance critique et concentration géographique.

## Concentration de production
Le cobalt vient à soixante-dix pour cent de RD Congo. Les terres rares sont dominées par la Chine. Cette concentration crée des vulnérabilités.

## Métaux critiques
Les technologies modernes dépendent de métaux spécifiques : lithium et cobalt pour les batteries, terres rares pour les aimants, gallium pour les semi-conducteurs.

## Sécurité d'approvisionnement
Les pays occidentaux développent des stratégies de sécurisation : mines domestiques, accords, stocks stratégiques, recyclage.`,
    objectives: `- Identifier les métaux stratégiques
- Comprendre les enjeux géopolitiques
- Reconnaître les risques d'approvisionnement
- Appréhender les stratégies de sécurisation`,
    keyTakeaways: `- Certains métaux sont concentrés géographiquement
- Cette concentration crée des risques géopolitiques
- Les technologies vertes accroissent la criticité
- Les États développent des stratégies de sécurisation
- Le recyclage devient stratégique`,
    videoScript: `Bienvenue dans cette dernière leçon sur la géopolitique des métaux stratégiques. Certains métaux sont qualifiés de stratégiques parce qu'ils sont essentiels pour des technologies clés et leur production est concentrée géographiquement.

Le cobalt, crucial pour les batteries, provient à soixante-dix pour cent de RD Congo, pays instable politiquement. Les terres rares sont dominées par la Chine à quatre-vingt-dix pour cent. En deux mille dix, lors d'un différend avec le Japon, la Chine a menacé de restreindre ses exportations. Les prix ont explosé.

Le lithium, métal de la transition énergétique, est concentré dans le triangle d'Amérique du Sud mais le raffinage est dominé par la Chine.

Face à ces risques, les stratégies se multiplient. L'UE a adopté un Critical Raw Materials Act. Les États-Unis relancent la production domestique. Le recyclage devient crucial mais émerge à peine pour les métaux de batteries.

Pour le trader, ces enjeux créent des opportunités. Les tensions génèrent de la volatilité. Les politiques gouvernementales influencent les marchés. Nous terminons ce premier module. Vous avez les fondamentaux pour aborder les modules suivants !`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    order: 7,
    duration: 780,
  },
  // === Course 2: Trading des métaux précieux (7 lessons) ===
  {
    courseSlug: "trading-metaux-precieux",
    slug: "fondamentaux-or-argent",
    title: "Fondamentaux de l'or et de l'argent",
    description: "Propriétés uniques, histoire monétaire et drivers de demande.",
    body: `# Fondamentaux de l'or et de l'argent

L'or et l'argent occupent une place unique : métaux précieux et actifs monétaires.

## L'or : valeur refuge universelle
L'or est reconnu depuis des millénaires comme réserve de valeur. Les banques centrales détiennent plus de trente-cinq mille tonnes. Cette confiance institutionnelle reflète un consensus mondial.

## L'argent : métal hybride
L'argent possède une double nature. Plus de cinquante pour cent de la demande est industrielle : photovoltaïque, électronique, applications médicales.

## Drivers de demande
La demande d'or provient de la bijouterie, de l'investissement et des banques centrales. L'argent combine bijouterie, investissement et usages industriels.`,
    objectives: `- Comprendre les propriétés uniques de l'or et l'argent
- Identifier les sources de demande
- Analyser le rôle monétaire historique
- Distinguer les dynamiques de prix`,
    keyTakeaways: `- L'or est la valeur refuge universelle
- L'argent combine usage monétaire et industriel
- Les banques centrales sont des acteurs majeurs
- L'investissement fluctue avec l'incertitude
- Le ratio or/argent reflète les dynamiques relatives`,
    videoScript: `Bienvenue dans ce module sur le trading des métaux précieux. L'or occupe une place unique depuis six mille ans. Trois raisons : la rareté, la beauté inaltérable, et la divisibilité.

Les banques centrales détiennent collectivement plus de trente-cinq mille tonnes. Cette confiance institutionnelle n'est pas anodine. La demande se répartit en bijouterie, investissement et achats des banques centrales.

L'argent possède une personnalité différente. Historiquement monnaie, il est devenu métal industriel. Plus de cinquante pour cent de la demande vient de l'industrie. L'électronique utilise l'argent pour sa conductivité. Le photovoltaïque nécessite de l'argent pour les cellules solaires.

Le ratio or-argent est surveillé par tous les traders. Historiquement autour de quinze, il fluctue aujourd'hui entre soixante et quatre-vingts. En mars deux mille vingt, il a atteint cent vingt-cinq créant une opportunité spectaculaire. Comprendre ces fondamentaux vous permet de replacer les mouvements quotidiens dans un contexte structurel.`,
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EemOYigx3OYuM7mzTKY7b9X1vB/hf_20260908_084738_9f044aea-c5ab-40e0-b145-d9f8160410a2.mp4",
    order: 1,
    duration: 180,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "cotations-contrats-marches",
    title: "Cotations, contrats et marchés de référence",
    description: "Comprendre le fixing LBMA, les contrats COMEX et les mécanismes de cotation.",
    body: `# Cotations, contrats et marchés de référence

Les prix de référence mondiaux proviennent de processus standardisés et de contrats négociés sur des bourses spécialisées.

## Le fixing LBMA
Le London Bullion Market Association organise deux fixings quotidiens pour l'or et l'argent. Ces prix servent de référence mondiale pour les transactions physiques.

## Contrats COMEX
Les contrats futures COMEX Gold et Silver dominent le trading électronique. Un contrat or représente cent onces, un contrat argent cinq mille onces.

## Spreads et primes
La différence entre prix spot et futures, les primes de livraison physique et les spreads bid-ask sont des indicateurs de tension sur les marchés.`,
    objectives: `- Comprendre le fixing LBMA
- Maîtriser les spécifications des contrats COMEX
- Analyser les spreads et primes
- Identifier les opportunités d'arbitrage`,
    keyTakeaways: `- Le fixing LBMA est la référence physique
- Les contrats COMEX dominent le trading futures
- Les spreads indiquent les tensions de marché
- Les primes physiques reflètent la demande réelle
- L'arbitrage entre marchés crée des opportunités`,
    videoScript: `Les cotations des métaux précieux suivent des mécanismes standardisés. Le fixing LBMA, à Londres, établit les prix de référence deux fois par jour. Un processus électronique où les participants soumettent leurs ordres jusqu'à équilibre entre offre et demande.

Le COMEX domine le trading électronique. Le contrat Gold représente cent onces troy, soit environ trois kilos. Livraison possible à New York dans des coffres agréés. Les volumes quotidiens atteignent des millions d'onces, principalement du trading papier.

Les spreads entre spot et futures révèlent beaucoup. Un contango normal reflète les coûts de stockage. Un backwardation indique une pénurie physique. En mars deux mille vingt, le spread or COMEX-London a explosé à cent dollars l'once. Les traders arbitrageurs ont affrété des avions pour livrer de l'or à New York.

Les primes physiques sont cruciales. Quand la demande de pièces ou lingots explose, les primes montent. En Inde pendant les festivals, les primes sur l'or peuvent atteindre dix pour cent. Ces signaux guident les stratégies de trading sophistiquées.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    order: 2,
    duration: 660,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "strategies-court-terme",
    title: "Stratégies de trading à court terme",
    description: "Techniques de day trading et swing trading sur l'or et l'argent.",
    body: `# Stratégies de trading à court terme

Le trading à court terme exploite la volatilité intraday et les mouvements de quelques jours.

## Day trading
Ouverture et fermeture des positions dans la même journée. Focus sur les niveaux techniques, les annonces économiques et les volumes.

## Swing trading
Positions tenues quelques jours à quelques semaines. Exploitation des tendances courtes et des retournements.

## Gestion du risque
Stops serrés, sizing adapté, diversification des positions. Le risk management prime sur la recherche de performance.`,
    objectives: `- Maîtriser les techniques de day trading
- Développer des stratégies de swing trading
- Gérer le risque efficacement
- Identifier les meilleurs moments pour trader`,
    keyTakeaways: `- Le day trading requiert discipline et rapidité
- Le swing trading exploite les tendances courtes
- La gestion du risque est primordiale
- Les horaires de liquidité sont cruciaux
- Les stops protègent le capital`,
    videoScript: `Le trading à court terme demande discipline et méthode. Le day trading ouvre et ferme les positions dans la journée. Avantage : pas de risque overnight. Inconvénient : stress et nécessité de surveillance continue.

Les horaires sont cruciaux. L'or est le plus liquide entre treize heures et seize heures UTC quand Londres et New York se chevauchent. Les annonces économiques américaines à treize heures trente créent de la volatilité exploitable.

Le swing trading tient les positions quelques jours. On exploite les vagues de tendance. Un exemple pédagogique : l'or forme un double bottom à mille huit cents dollars. Signal haussier. Entrée à mille huit cent dix, stop à mille sept cent quatre-vingt-dix, cible mille huit cent soixante. Ratio risque-récompense de un pour deux point cinq.

La gestion du risque prime toujours. Ne jamais risquer plus de un à deux pour cent du capital par position. Utiliser des stops garantis quand possible. Diversifier entre or et argent. Un trader discipliné avec cinquante pour cent de trades gagnants mais un bon ratio risk-reward sera profitable.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    order: 3,
    duration: 600,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "hedging-gestion-risque",
    title: "Hedging et gestion du risque",
    description: "Techniques de couverture pour les professionnels et les producteurs.",
    body: `# Hedging et gestion du risque

Le hedging protège contre les variations de prix défavorables tout en permettant de bénéficier partiellement des mouvements favorables.

## Hedging pour producteurs
Un producteur d'or peut vendre des futures pour fixer le prix de sa production future. Protection contre une baisse mais renonciation aux hausses.

## Hedging pour transformateurs
Les transformateurs achètent des futures pour sécuriser leurs approvisionnements. Stabilisation des coûts et planification facilitée.

## Stratégies complexes
Options, collars, spreads permettent des couvertures plus sophistiquées avec profils asymétriques.`,
    objectives: `- Comprendre les principes du hedging
- Maîtriser les techniques de couverture
- Utiliser les options et les spreads
- Optimiser le profil risque-rendement`,
    keyTakeaways: `- Le hedging protège contre les mouvements défavorables
- Les producteurs vendent des futures
- Les transformateurs achètent des futures
- Les options offrent des profils asymétriques
- Le basis risk doit être géré`,
    videoScript: `Le hedging est essentiel pour les professionnels exposés aux métaux précieux. Un producteur d'or extrait à mille dollars l'once. Le marché cote mille neuf cents. Il peut vendre des futures à mille neuf cents, verrouillant une marge de neuf cents dollars.

Si l'or monte à deux mille, il rate l'opportunité mais il est protégé. Si l'or chute à mille six cents, il est couvert. Le hedging transforme l'incertitude en prévisibilité.

Les transformateurs font l'inverse. Une bijouterie sait qu'elle aura besoin de dix kilos d'or dans trois mois. Elle achète des futures maintenant pour se protéger d'une hausse.

Les options offrent plus de flexibilité. Acheter un put protège contre une baisse tout en conservant le bénéfice d'une hausse. Coût : la prime de l'option. Un collar combine vente d'un call et achat d'un put. Stratégie à coût réduit mais plafonnant le gain.

Le basis risk existe toujours. Si vous hedgez de l'or physique à Paris avec des futures COMEX New York, le spread peut varier. Une couverture à quatre-vingt-dix-huit pour cent vaut mieux que zéro pour cent.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    order: 4,
    duration: 720,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "analyse-technique",
    title: "Analyse technique appliquée aux métaux précieux",
    description: "Indicateurs, patterns et niveaux clés pour le trading de l'or et l'argent.",
    body: `# Analyse technique appliquée

L'analyse technique identifie les niveaux de support-résistance et les configurations graphiques pour timing des entrées-sorties.

## Indicateurs classiques
Moyennes mobiles, RSI, MACD, Bollinger Bands s'appliquent efficacement aux métaux précieux. Les tendances sont souvent persistantes.

## Patterns graphiques
Triangles, drapeaux, têtes-épaules apparaissent régulièrement. L'or respecte bien les niveaux techniques en raison de la forte participation algorithmique.

## Niveaux psychologiques
Les nombres ronds (mille huit cents, mille neuf cents, deux mille dollars) créent des zones de support-résistance importantes.`,
    objectives: `- Maîtriser les indicateurs techniques
- Identifier les patterns graphiques
- Utiliser les niveaux de support-résistance
- Optimiser le timing des entrées-sorties`,
    keyTakeaways: `- L'analyse technique fonctionne sur les métaux précieux
- Les moyennes mobiles identifient les tendances
- Les patterns graphiques sont fiables
- Les niveaux psychologiques sont importants
- Combiner technique et fondamental est optimal`,
    videoScript: `L'analyse technique est très efficace sur les métaux précieux. La forte participation des algorithmes rend les niveaux techniques auto-réalisateurs.

Les moyennes mobiles identifient les tendances. Une MM cinquante au-dessus de la MM deux cents signale une tendance haussière. L'or a cassé sa MM deux cents en novembre deux mille vingt-deux, déclenchant une vague de ventes algorithmiques.

Le RSI détecte les sur-achats et sur-ventes. RSI au-dessus de soixante-dix suggère un potentiel repli. Attention, en tendance forte, le RSI peut rester élevé longtemps.

Les patterns graphiques apparaissent régulièrement. Un triangle ascendant sur l'or indique une probable cassure haussière. Une tête-épaules est un pattern de retournement fiable.

Les niveaux psychologiques sont cruciaux. Deux mille dollars pour l'or, trente dollars pour l'argent. Ces nombres ronds concentrent les ordres stops et limites. Une cassure franche de deux mille déclenche une avalanche d'achats automatiques.

L'idéal combine technique et fondamental. Le fondamental donne la direction long terme, le technique optimise le timing. Ne jamais trader contre la tendance fondamentale majeure.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    order: 5,
    duration: 660,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "drivers-fondamentaux",
    title: "Drivers fondamentaux et catalyseurs de prix",
    description: "Taux réels, inflation, géopolitique et leur impact sur l'or et l'argent.",
    body: `# Drivers fondamentaux

Les métaux précieux répondent à des drivers spécifiques différents des métaux industriels.

## Taux d'intérêt réels
C'est le driver numéro un pour l'or. Taux réels = taux nominaux moins inflation. Quand ils sont négatifs, l'or monte.

## Inflation et dévaluation monétaire
L'or protège contre la perte de pouvoir d'achat. Les périodes d'inflation élevée favorisent systématiquement l'or.

## Incertitude géopolitique
Les crises internationales poussent les investisseurs vers les valeurs refuges. L'or bénéficie des tensions mondiales.`,
    objectives: `- Comprendre les taux réels
- Analyser l'impact de l'inflation
- Identifier les catalyseurs géopolitiques
- Anticiper les mouvements majeurs`,
    keyTakeaways: `- Les taux réels sont le driver principal de l'or
- L'inflation favorise les métaux précieux
- Les crises géopolitiques créent des rallyes
- La politique des banques centrales est cruciale
- Le dollar influence inversement l'or`,
    videoScript: `Les drivers fondamentaux des métaux précieux sont spécifiques. Le driver numéro un est le taux d'intérêt réel. Calculez : taux des bons du Trésor américain à dix ans moins inflation anticipée. Si c'est négatif, l'or devient très attractif.

En deux mille vingt, les taux réels ont plongé à moins deux pour cent. L'or a atteint deux mille cent dollars. En deux mille vingt-deux, la Fed a relevé agressivement. Les taux réels sont devenus positifs. L'or a corrigé de vingt pour cent.

L'inflation est le deuxième driver. Les années soixante-dix ont vu l'or passer de trente-cinq à huit cent cinquante dollars durant la grande inflation. Aujourd'hui, avec l'impression monétaire massive post-Covid, les craintes inflationnistes soutiennent l'or.

Les crises géopolitiques créent des rallyes refuge. Brexit, tensions commerciales, conflits militaires : chaque crise pousse les investisseurs vers l'or. Ces rallyes sont parfois temporaires mais peuvent marquer des points d'inflexion.

Les décisions des banques centrales sont scrutées. Quand elles accumulent de l'or (Chine, Russie), c'est un signal haussier. Quand elles vendent (années quatre-vingt-dix), c'est baissier. Suivre ces flux institutionnels donne un avantage informationnel.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    order: 6,
    duration: 720,
  },
  {
    courseSlug: "trading-metaux-precieux",
    slug: "psychologie-sentiment",
    title: "Psychologie du marché et sentiment",
    description: "Comprendre le sentiment, les phases de marché et les biais comportementaux.",
    body: `# Psychologie et sentiment

Les marchés de métaux précieux sont particulièrement sensibles aux émotions et au sentiment collectif.

## Indicateurs de sentiment
Le ratio put-call, les positions des spéculateurs, les flux ETF révèlent le sentiment dominant.

## Phases de marché
Accumulation, tendance, distribution, correction. Identifier la phase permet d'adapter la stratégie.

## Biais comportementaux
Biais de confirmation, effet de foule, peur de rater une opportunité : connaître ces biais protège de leurs pièges.`,
    objectives: `- Mesurer le sentiment de marché
- Identifier les phases de cycle
- Reconnaître les biais comportementaux
- Adapter sa psychologie au trading`,
    keyTakeaways: `- Le sentiment est mesurable via des indicateurs
- Les extrêmes de sentiment créent des opportunités
- Les biais comportementaux piègent les traders
- La patience est une vertu
- La discipline bat l'émotion`,
    videoScript: `La psychologie et le sentiment sont cruciaux sur les métaux précieux. Ces marchés attirent les investisseurs anxieux cherchant protection. Cette dimension émotionnelle crée des opportunités.

Les indicateurs de sentiment révèlent les extrêmes. Quand les positions spéculatives sur l'or atteignent des records, c'est souvent un signal contrarian. Trop d'optimisme précède les corrections. Trop de pessimisme précède les rallyes.

Les flux ETF or sont transparents et publiés quotidiennement. Quand les ETF accumulent massivement pendant des semaines, la demande d'investissement est forte. Quand ils dégoorgent, la pression vendeuse domine.

Les phases de marché se succèdent. L'accumulation est discrète, les prix stagnent. Puis la tendance s'installe, c'est le moment de suivre. La distribution voit les volumes augmenter sans que les prix progressent. Enfin la correction liquide les excès.

Les biais comportementaux piègent même les professionnels. Le biais de confirmation nous fait chercher les informations validant notre position. L'effet de foule nous pousse à acheter quand tout le monde achète. La peur de rater nous fait entrer au pire moment.

Développez une discipline de fer. Définissez votre plan avant d'entrer. Respectez vos stops. Prenez vos profits selon votre plan, pas votre émotion. Les meilleurs traders sont souvent les plus ennuyeux car ils appliquent mécaniquement leur méthode.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    order: 7,
    duration: 780,
  },
  // === Course 3: Processus & compliance (6 lessons) ===
  {
    courseSlug: "processus-compliance",
    slug: "introduction-kyc-aml",
    title: "Introduction au KYC et à l'AML",
    description: "Obligations de connaissance client et lutte contre le blanchiment.",
    body: `# Introduction au KYC et à l'AML

Le KYC et l'AML sont des piliers de la conformité dans le trading de métaux.

## Principes du KYC
Identifier et vérifier l'identité de toute contrepartie. Documents d'identité, preuves d'adresse, bénéficiaires effectifs requis.

## Lutte contre le blanchiment
Empêcher l'utilisation des marchés pour blanchir des fonds illicites. Surveillance des transactions suspectes obligatoire.

## Conséquences
Les violations entraînent des amendes lourdes, interdictions d'opérer et dommages réputationnels majeurs.`,
    objectives: `- Comprendre les obligations KYC/AML
- Identifier les documents requis
- Reconnaître les signaux d'alerte
- Appréhender les conséquences légales`,
    keyTakeaways: `- KYC et AML sont des obligations légales strictes
- L'identification des contreparties est obligatoire
- Les transactions suspectes doivent être signalées
- La non-conformité entraîne des sanctions sévères
- La diligence protège l'entreprise et les marchés`,
    videoScript: `Le KYC, Know Your Customer, et l'AML, Anti-Money Laundering, sont cruciaux. Les marchés de métaux peuvent être utilisés pour des activités illicites : blanchiment, financement du terrorisme, évasion fiscale.

Les régulateurs imposent des obligations strictes. Avant de faire affaire, identifier et vérifier la contrepartie. Documents officiels, preuves d'adresse, bénéficiaires effectifs pour les sociétés.

Un exemple pédagogique. Une société reçoit une demande d'achat de cent tonnes d'or. Proposition attractive mais lors du KYC, signaux d'alerte : adresse dans un paradis fiscal, bénéficiaires opaques, incohérences. La société refuse. Trois mois plus tard, cette contrepartie est identifiée dans un scandale de blanchiment. Le KYC rigoureux a protégé la société.

L'AML surveille en continu les transactions pour détecter des schémas suspects. Achats répétés sans justification économique. Virements complexes. Transactions juste en dessous des seuils. Ces patterns alertent.

Une transaction suspecte doit être signalée aux autorités. Cette déclaration est confidentielle. La non-conformité coûte cher. Des banques ont payé des milliards d'amendes. La conformité n'est pas optionnelle, c'est une nécessité existentielle.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    order: 1,
    duration: 600,
  },
  {
    courseSlug: "processus-compliance",
    slug: "flux-documentaires",
    title: "Gestion des flux documentaires",
    description: "Organisation, archivage et traçabilité des documents de trading.",
    body: `# Gestion des flux documentaires

Les flux documentaires assurent la traçabilité et la conformité de chaque transaction.

## Documents essentiels
Contrats, confirmations, factures, preuves de livraison, certificats d'origine. Chaque transaction génère une piste documentaire complète.

## Archivage et conservation
Les régulateurs imposent des durées de conservation. Cinq à dix ans selon les juridictions. Les systèmes doivent être sécurisés et auditables.

## Traçabilité et blockchain
Les technologies émergentes comme la blockchain permettent une traçabilité inaltérable. Adoption progressive dans le secteur.`,
    objectives: `- Maîtriser les documents essentiels
- Organiser l'archivage conforme
- Assurer la traçabilité
- Utiliser les outils modernes`,
    keyTakeaways: `- Chaque transaction nécessite une documentation complète
- L'archivage doit respecter les exigences légales
- La traçabilité protège contre les litiges
- Les systèmes numériques facilitent la gestion
- La blockchain apporte de nouvelles solutions`,
    videoScript: `La gestion documentaire est le squelette du trading conforme. Chaque transaction génère des documents. Le contrat initial fixe les termes. La confirmation écrite valide l'accord. La facture documente la facturation. Le proof of delivery atteste la livraison. Le certificat d'origine prouve la provenance légale.

Ces documents doivent être conservés cinq à dix ans selon les juridictions. En cas d'audit ou de litige, vous devez produire la piste complète. Un système d'archivage défaillant expose à des sanctions.

L'organisation est cruciale. Classement par transaction, par contrepartie, par date. Indexation permettant une recherche rapide. Sauvegardes redondantes pour éviter les pertes.

Les outils numériques modernes facilitent la gestion. Systèmes de GED, gestion électronique des documents. OCR pour extraire les données. Workflows automatisés pour validation multi-niveaux.

La blockchain émerge comme solution de traçabilité. Un métal peut être suivi de la mine au consommateur final. Chaque étape enregistrée de manière inaltérable. Plusieurs consortiums développent ces solutions. L'adoption reste progressive mais la direction est claire.

La qualité documentaire reflète le professionnalisme. Des documents complets et organisés rassurent les contreparties, facilitent les audits et protègent juridiquement.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    order: 2,
    duration: 660,
  },
  {
    courseSlug: "processus-compliance",
    slug: "procedures-trading-desk",
    title: "Procédures du trading desk",
    description: "Workflow quotidien, contrôles et best practices opérationnelles.",
    body: `# Procédures du trading desk

Un trading desk efficace fonctionne selon des procédures rigoureuses et des contrôles systématiques.

## Workflow quotidien
Ouverture des marchés, revue des positions, analyse du marché, exécution des ordres, réconciliation, reporting de fin de journée.

## Ségrégation des fonctions
Le front office trade, le middle office contrôle, le back office règle. Cette séparation prévient les fraudes.

## Contrôles et limites
Limites de position, limites de pertes, contrôles pré-trade et post-trade. Les systèmes bloquent automatiquement les dépassements.`,
    objectives: `- Comprendre le workflow quotidien
- Maîtriser la ségrégation des fonctions
- Implémenter les contrôles
- Optimiser les procédures`,
    keyTakeaways: `- Le workflow est structuré et répétitif
- La ségrégation prévient les fraudes
- Les limites protègent le capital
- Les contrôles sont automatisés
- La discipline opérationnelle est essentielle`,
    videoScript: `Un trading desk professionnel fonctionne comme une machine bien huilée. Le workflow quotidien commence avant l'ouverture des marchés. Revue des positions overnight. Analyse des nouvelles économiques et géopolitiques. Identification des opportunités du jour.

À l'ouverture, exécution des ordres planifiés. Surveillance continue des positions. Ajustements tactiques selon les mouvements. Avant la fermeture, bilan des positions. Réconciliation avec les confirmations reçues. Reporting pour le management.

La ségrégation des fonctions est cruciale. Le front office fait les trades. Le middle office, indépendant, contrôle la conformité des opérations et valorise les positions. Le back office gère le règlement-livraison. Cette séparation prévient les fraudes comme l'affaire Kerviel.

Les limites protègent. Limite de position par métal, par trader, par desk. Limite de perte quotidienne : stop-loss automatique si atteinte. Limite de concentration par contrepartie. Les systèmes modernes bloquent automatiquement tout dépassement.

Les contrôles pré-trade vérifient la limite disponible avant validation. Les contrôles post-trade comparent l'exécution au prix de marché. Tout écart significatif déclenche une alerte.

La discipline opérationnelle distingue les desks professionnels des amateurs. Respect scrupuleux des procédures. Documentation systématique. Escalade immédiate des anomalies. Cette rigueur protège l'entreprise et optimise la performance.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    order: 3,
    duration: 720,
  },
  {
    courseSlug: "processus-compliance",
    slug: "gestion-risques-operationnels",
    title: "Gestion des risques opérationnels",
    description: "Identifier, mesurer et mitiger les risques opérationnels du trading.",
    body: `# Gestion des risques opérationnels

Les risques opérationnels peuvent détruire une entreprise aussi sûrement que les risques de marché.

## Types de risques
Risque de fraude, risque de système, risque de processus, risque humain, risque de cybersécurité.

## Identification et évaluation
Cartographie des risques, évaluation de la probabilité et de l'impact, priorisation des risques critiques.

## Mitigation et contrôles
Plans de continuité, redondance des systèmes, formation du personnel, assurances, audit interne continu.`,
    objectives: `- Identifier les risques opérationnels
- Évaluer probabilité et impact
- Mettre en place des mitigations
- Monitorer en continu`,
    keyTakeaways: `- Les risques opérationnels sont multiples
- La fraude est un risque majeur
- Les systèmes doivent être résilients
- La formation réduit l'erreur humaine
- L'audit continu détecte les faiblesses`,
    videoScript: `Les risques opérationnels sont moins visibles que les risques de marché mais tout aussi dangereux. Une panne système pendant une période volatile. Une erreur humaine sur un zéro. Une fraude interne. Ces événements ont coulé des entreprises centenaires.

Les types de risques sont variés. Risque de fraude : un trader dissimule ses pertes. Risque de système : le logiciel de trading plante. Risque de processus : une confirmation manquante crée un litige. Risque humain : une erreur de saisie. Risque cyber : un ransomware paralyse les opérations.

L'identification commence par une cartographie. Lister tous les processus. Pour chacun, identifier les points de défaillance. Évaluer la probabilité et l'impact. Un risque haute probabilité haute impact est prioritaire.

La mitigation utilise plusieurs leviers. La redondance : deux systèmes indépendants pour éviter le point unique de défaillance. La formation : un personnel bien formé fait moins d'erreurs. Les contrôles : validation à quatre yeux pour les opérations critiques. L'assurance : transfert de certains risques aux assureurs. L'audit : détection précoce des faiblesses.

Un plan de continuité d'activité est essentiel. Si le bureau principal est inaccessible, comment continuer ? Site de secours, accès distant, procédures dégradées. Ces plans doivent être testés régulièrement.

La culture du risque doit être promue. Chacun responsable. Signalement sans peur des incidents. Apprentissage de chaque erreur. Les meilleures organisations transforment les incidents en opportunités d'amélioration.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    order: 4,
    duration: 780,
  },
  {
    courseSlug: "processus-compliance",
    slug: "audit-controles-internes",
    title: "Audit interne et contrôles",
    description: "Préparer et gérer les audits, renforcer les contrôles internes.",
    body: `# Audit interne et contrôles

L'audit interne vérifie l'efficacité des processus et l'application des procédures.

## Audit interne
Fonction indépendante qui évalue les risques, teste les contrôles, identifie les lacunes et recommande des améliorations.

## Préparation aux audits externes
Les régulateurs et commissaires aux comptes conduisent des audits. Une préparation rigoureuse facilite le processus.

## Amélioration continue
L'audit n'est pas une contrainte mais une opportunité d'amélioration. Les recommandations doivent être implémentées rapidement.`,
    objectives: `- Comprendre le rôle de l'audit interne
- Préparer les audits externes
- Répondre aux recommandations
- Améliorer continuellement`,
    keyTakeaways: `- L'audit interne est une fonction clé
- Les audits externes sont obligatoires
- La préparation facilite le processus
- Les recommandations doivent être suivies
- L'amélioration continue renforce la résilience`,
    videoScript: `L'audit interne est souvent perçu comme une contrainte mais c'est un allié précieux. Une fonction indépendante qui évalue objectivement les risques et contrôles.

L'auditeur interne teste les processus. Les procédures écrites sont-elles appliquées ? Les contrôles fonctionnent-ils ? Les limites sont-elles respectées ? Il identifie les écarts entre le prescrit et le réel.

Un exemple pédagogique. L'audit révèle que la validation à quatre yeux des ordres n'est pas systématique. Recommandation : rendre le contrôle obligatoire dans le système. Implémentation : le logiciel bloque désormais tout ordre non validé. Résultat : zéro écart au prochain audit.

Les audits externes sont obligatoires. Les régulateurs vérifient la conformité réglementaire. Les commissaires aux comptes certifient les états financiers. Ces audits peuvent être stressants.

La préparation est cruciale. Documenter tous les processus. Archiver méthodiquement. Former les équipes sur ce qui sera demandé. Faire un pré-audit interne pour identifier les faiblesses. Corriger avant l'audit officiel.

Durant l'audit, la collaboration est payante. Répondre rapidement aux demandes. Fournir les documents complets. Expliquer clairement les processus. Les auditeurs apprécient la transparence.

Les recommandations doivent être prises au sérieux. Chaque recommandation signale une faiblesse réelle. Élaborer un plan d'action avec dates et responsables. Suivre l'implémentation. Au prochain audit, démontrer les progrès.

L'amélioration continue fait la différence. Les organisations matures voient l'audit comme un outil d'excellence opérationnelle, pas une menace.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    order: 5,
    duration: 720,
  },
  {
    courseSlug: "processus-compliance",
    slug: "reglementation-internationale",
    title: "Réglementation internationale",
    description: "LBMA, MiFID II, Dodd-Frank et cadres réglementaires mondiaux.",
    body: `# Réglementation internationale

Le trading de métaux est encadré par des réglementations nationales et internationales.

## LBMA Good Delivery
Standard de qualité pour l'or et l'argent. Seuls les raffineurs accrédités peuvent produire des lingots Good Delivery.

## MiFID II
Réglementation européenne imposant transparence, reporting et protection des investisseurs sur les marchés financiers.

## Dodd-Frank
Loi américaine régulant les produits dérivés, imposant le reporting et la compensation centralisée pour certains contrats.`,
    objectives: `- Comprendre le LBMA Good Delivery
- Maîtriser les exigences MiFID II
- Appréhender Dodd-Frank
- Naviguer les cadres réglem

entaires`,
    keyTakeaways: `- Les réglementations assurent l'intégrité des marchés
- LBMA garantit la qualité des métaux précieux
- MiFID II impose transparence et protection
- Dodd-Frank régule les dérivés
- La conformité est multi-juridictionnelle`,
    videoScript: `Le trading de métaux opère dans un cadre réglementaire complexe et multi-juridictionnel. Comprendre ces règles est essentiel.

Le LBMA, London Bullion Market Association, établit les standards de qualité. Un lingot Good Delivery or pèse quatre cents onces troy avec une pureté minimale de neuf cent quatre-vingt-quinze millièmes. Seuls les raffineurs accrédités par la LBMA peuvent produire ces lingots. Cette accréditation garantit la qualité et la traçabilité.

MiFID II, Markets in Financial Instruments Directive, régule les marchés financiers européens. Transparence pré et post-trade obligatoire. Reporting des transactions aux régulateurs. Protection renforcée des investisseurs particuliers. Best execution : démontrer qu'on a obtenu le meilleur prix. Ces obligations ont transformé les opérations des desks européens.

Dodd-Frank, loi américaine post-crise financière, régule les produits dérivés. Les contrats de gré à gré doivent être reportés aux trade repositories. Certains swap doivent être compensés via des chambres de compensation centrales. Les  trading houses doivent s'enregistrer comme swap dealers.

D'autres réglementations s'ajoutent. EMIR en Europe pour les dérivés. Le Patriot Act américain pour l'AML. Les sanctions internationales contre certains pays ou entités. Un trader professionnel doit naviguer cette jungle réglementaire.

La conformité multi-juridictionnelle est complexe. Une transaction Londres-New York implique régulation britannique et américaine. Une vente en Asie ajoute les règles locales. Les grandes trading houses ont des équipes compliance de dizaines de personnes.

Le conseil : investir dans la conformité. Le coût est élevé mais le coût de la non-conformité est catastrophique. Nous terminons ce module. Vous avez maintenant les fondamentaux de la conformité dans le trading de métaux !`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    order: 6,
    duration: 840,
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

  if (process.env.PDFS_ONLY === "1") {
    console.log("Generating PDF workbooks without database access...");
    for (const course of coursesData) {
      const courseLessons = lessonsData.filter(l => l.courseSlug === course.slug);
      const pdfPath = generatePDF(course, courseLessons);
      console.log(`✓ Generated PDF: ${pdfPath}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  }

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


  // Prepare quizzes with course IDs
  const quizzesWithCourseIds = quizzesData.map((quiz) => {
    const course = insertedCourses.find((c) => c.slug === quiz.courseSlug);
    if (!course) {
      throw new Error(`Course not found for slug: ${quiz.courseSlug}`);
    }
    const { courseSlug, ...quizData } = quiz;
    return {
      ...quizData,
      courseId: course.id,
    };
  });

  // Insert quizzes
  console.log("Inserting quizzes...");
  const insertedQuizzes = await db.insert(quizzes).values(quizzesWithCourseIds).returning();
  console.log(`✓ Inserted ${insertedQuizzes.length} quizzes`);
  // Generate PDFs
  console.log("Generating PDF workbooks...");
  for (const course of insertedCourses) {
    const courseLessons = lessonsData.filter(l => l.courseSlug === course.slug);
    const courseData = coursesData.find(c => c.slug === course.slug)!;
    const filepath = path.join(coursesDir, `${course.slug}-cahier-etude.pdf`);
    if (fs.existsSync(filepath)) {
      console.log(`✓ PDF already exists: /cours/${path.basename(filepath)}`);
      continue;
    }
    const pdfPath = generatePDF(courseData, courseLessons);
    console.log(`✓ Generated PDF: ${pdfPath}`);
  }

  console.log("✅ Seeding complete!");
  console.log("\n📊 Summary:");
  console.log(`- ${insertedCourses.length} courses created`);
  console.log(`- ${insertedLessons.length} lessons created`);
  console.log(`- ${insertedQuizzes.length} quizzes created (5 MCQ each)`);
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
