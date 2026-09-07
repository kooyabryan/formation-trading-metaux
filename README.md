# MetalTrade Academy - Formation Trading des Métaux

Plateforme professionnelle de formation au trading des métaux pour clients B2B français. Application Next.js moderne avec authentification, gestion de cours vidéo et espace documentaire.

**Repository Origin:** `kooya222/tmp-baa8768e0ec949e4`  
**Origin URL:** `https://origin.cursor.com/git/kooya222/tmp-baa8768e0ec949e4`

> **Note:** To rename this repository to something more descriptive (e.g., `metal-trading-academy` or `formation-trading-metaux`), visit the Origin dashboard and use the repository settings.

## 🎯 Fonctionnalités

- ✅ Landing page premium avec design industriel luxe (charcoal/brass)
- ✅ Catalogue de formations avec 3 cours complets
- ✅ Lecteur de leçons avec vidéo + supports PDF
- ✅ Authentification email/mot de passe (Better Auth)
- ✅ Espace documents avec upload sécurisé (Vercel Blob)
- ✅ Design responsive (mobile + desktop)
- ✅ Interface 100% en français
- ✅ Disclaimer légal conforme

## 🛠️ Stack technique

- **Framework** : Next.js 16 (App Router) + TypeScript
- **Styling** : Tailwind CSS 4 + shadcn/ui
- **Base de données** : PostgreSQL (Neon) + Drizzle ORM
- **Authentification** : Better Auth
- **Stockage** : Vercel Blob
- **Déploiement** : Vercel

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Neon (base de données PostgreSQL gratuite)
- Compte Vercel (optionnel pour Blob et déploiement)

## 🚀 Installation locale

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Base de données Neon (obligatoire)
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"

# Better Auth (obligatoire)
BETTER_AUTH_SECRET="générez_une_chaîne_aléatoire_de_32_caractères"
BETTER_AUTH_URL="http://localhost:3456"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3456"

# Vercel Blob (optionnel en développement)
BLOB_READ_WRITE_TOKEN="votre_token_vercel_blob"
```

**Comment obtenir ces variables :**

#### Database URL (Neon)
1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet PostgreSQL
3. Copiez la connection string depuis le dashboard
4. Ajoutez `?sslmode=require` à la fin de l'URL

#### Better Auth Secret
Générez une chaîne aléatoire de 32+ caractères :
```bash
openssl rand -base64 32
```

#### Vercel Blob Token (optionnel)
1. Installez le CLI Vercel : `npm i -g vercel`
2. Liez votre projet : `vercel link`
3. Créez un Blob store depuis le dashboard Vercel
4. Copiez le token depuis les settings du store

**Note** : Sans Blob token, l'upload de documents fonctionne en mode développement (métadonnées enregistrées sans fichier réel).

### 3. Initialiser la base de données

```bash
# Pousser le schéma vers Neon
npm run db:push

# Seed les cours de démonstration
npm run seed
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Accédez à l'application sur [http://localhost:3456](http://localhost:3456)

## 📚 Données de seed

Trois cours sont automatiquement créés avec 12 leçons au total :

1. **Introduction aux métaux** (4 leçons) - Fondamentaux du secteur
2. **Trading des métaux précieux** (4 leçons) - Or, argent, stratégies
3. **Processus & compliance** (4 leçons) - KYC/AML, flux documentaires

Les vidéos utilisent des URLs placeholder publiques (Google Cloud Storage samples). **Remplacez-les par vos propres contenus** en éditant la table `lessons` ou le fichier `scripts/seed.ts`.

## 🎥 Remplacer les médias placeholder

### Vidéos de cours

Les URLs vidéo sont dans la base de données. Pour les mettre à jour :

1. Uploadez vos vidéos sur un CDN (Vercel Blob, Cloudflare R2, S3, etc.)
2. Mettez à jour la table `lessons` avec les nouvelles URLs :

```sql
UPDATE lessons 
SET video_url = 'https://your-cdn.com/video.mp4' 
WHERE slug = 'types-de-metaux';
```

Ou modifiez le fichier `scripts/seed.ts` et re-seed :

```bash
npm run seed
```

### Documents PDF

Ajoutez les URLs de vos supports PDF dans le champ `pdf_url` de la table `lessons`.

## 🚀 Déploiement sur Vercel

### Méthode recommandée : Origin ↔ Vercel

Cette application est hébergée sur Origin et peut être déployée directement sur Vercel.

#### Option 1: Connexion Origin → Vercel (Recommandé)

1. **Connecter Origin à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Sélectionnez "Import from Git Provider"
   - Choisissez "Origin" comme provider (si disponible)
   - Ou importez via l'URL : `https://origin.cursor.com/git/kooya222/tmp-baa8768e0ec949e4`

2. **Configuration du projet**
   - Framework Preset: **Next.js** (détecté automatiquement)
   - Root Directory: `./` (racine)
   - Build Command: `npm run build` (par défaut)
   - Output Directory: `.next` (par défaut)

3. **Variables d'environnement (CRITICAL)**

   Ajoutez ces variables dans les settings Vercel avant le premier déploiement :

   ```env
   # Database - OBLIGATOIRE
   DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
   
   # Better Auth - OBLIGATOIRE
   BETTER_AUTH_SECRET=your_production_secret_32_chars_minimum
   BETTER_AUTH_URL=https://your-app.vercel.app
   NEXT_PUBLIC_BETTER_AUTH_URL=https://your-app.vercel.app
   
   # Vercel Blob - OPTIONNEL (pour l'upload de documents)
   BLOB_READ_WRITE_TOKEN=vercel_blob_...
   ```

   **Important:** 
   - ⚠️ `BETTER_AUTH_SECRET` doit être différent du secret local
   - ⚠️ `BETTER_AUTH_URL` doit correspondre à votre domaine Vercel exact
   - ⚠️ Changez l'URL après attribution du domaine Vercel

#### Option 2: Via Vercel CLI

```bash
# Installer le CLI Vercel
npm i -g vercel

# Se connecter
vercel login

# Premier déploiement (mode interactif)
vercel

# Suivre les prompts:
# - Link to existing project? No
# - Project name: metal-trading-academy
# - Directory: ./
# - Override settings? No
```

Ensuite, configurez les variables d'environnement :

```bash
# Ajouter DATABASE_URL
vercel env add DATABASE_URL production

# Ajouter BETTER_AUTH_SECRET
vercel env add BETTER_AUTH_SECRET production

# Ajouter les URLs (après avoir obtenu le domaine Vercel)
vercel env add BETTER_AUTH_URL production
vercel env add NEXT_PUBLIC_BETTER_AUTH_URL production
```

### 4. Préparer la base de données Neon pour la production

**Après le premier déploiement Vercel**, seed la base de données :

#### Option A: Depuis votre machine locale

```bash
# Créer un fichier .env.production avec l'URL Neon de production
DATABASE_URL="postgresql://..." npm run seed
```

#### Option B: Via Vercel CLI

```bash
# Pull les env vars de production
vercel env pull .env.production

# Seed avec l'env de production
npm run seed
```

#### Option C: Depuis le dashboard Vercel

1. Allez dans votre projet Vercel
2. Settings → Functions → Command Execution (si disponible)
3. Ou utilisez un déploiement temporaire avec le seed dans le build

### 5. Vérifications post-déploiement

✅ **Checklist critique:**

- [ ] L'app se charge sur `https://your-app.vercel.app`
- [ ] La landing page affiche les 3 cours
- [ ] La création de compte fonctionne (`/inscription`)
- [ ] La connexion fonctionne (`/connexion`)
- [ ] Les leçons sont accessibles après login
- [ ] L'upload de documents fonctionne (si Blob configuré)
- [ ] Aucune erreur dans les Vercel Logs

### 6. Configuration du domaine personnalisé

Dans Vercel Dashboard → Settings → Domains :

1. Ajouter votre domaine (ex: `academy.votreentreprise.fr`)
2. Suivre les instructions DNS
3. **Mise à jour CRITIQUE** : Après configuration du domaine, mettez à jour les variables d'environnement :

```env
BETTER_AUTH_URL=https://academy.votreentreprise.fr
NEXT_PUBLIC_BETTER_AUTH_URL=https://academy.votreentreprise.fr
```

4. Redéployez pour appliquer les changements

### Troubleshooting Vercel

**Erreur: "Cannot connect to database"**
- Vérifiez que `DATABASE_URL` est bien configurée dans Vercel
- Assurez-vous que l'URL contient `?sslmode=require`
- Vérifiez que votre projet Neon autorise les connexions depuis Vercel

**Erreur: "Better Auth configuration error"**
- Vérifiez que `BETTER_AUTH_URL` correspond exactement à votre domaine
- Assurez-vous que `BETTER_AUTH_SECRET` est défini (32+ caractères)
- Les deux variables doivent être présentes : `BETTER_AUTH_URL` + `NEXT_PUBLIC_BETTER_AUTH_URL`

**Erreur: "Build failed"**
- Consultez les logs de build dans Vercel Dashboard
- Vérifiez que toutes les dépendances sont dans `package.json`
- Assurez-vous que Node.js version est compatible (18+)

**Problème: "Auth ne fonctionne pas après déploiement"**
- Vérifiez que les URLs dans Better Auth correspondent au domaine de production
- Testez en navigation privée (pour éviter les cookies locaux)
- Consultez les Function Logs dans Vercel pour les erreurs API

### Configuration Neon pour production

1. **Dans Neon Dashboard**
   - Créez une branche dédiée "production" (optionnel mais recommandé)
   - Notez la connection string de production
   - Activez "Pooling" si vous attendez beaucoup de trafic

2. **Sécurité Neon**
   - Utilisez des credentials différents pour dev/prod
   - Activez les "Protected Branches" si disponible
   - Configurez les backups automatiques

### Intégration Vercel Marketplace

Pour une intégration plus poussée :

1. **Neon Postgres** (via Marketplace)
   - Vercel Dashboard → Storage → Create Database
   - Choisir "Neon Postgres"
   - Les variables d'environnement seront auto-configurées

2. **Vercel Blob** (pour uploads)
   - Vercel Dashboard → Storage → Create Blob Store
   - Copiez le `BLOB_READ_WRITE_TOKEN`
   - Ajoutez-le dans les variables d'environnement

### 1. Push vers GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

### 2. Importer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement :

```env
DATABASE_URL=votre_url_neon
BETTER_AUTH_SECRET=votre_secret
BETTER_AUTH_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://votre-domaine.vercel.app
BLOB_READ_WRITE_TOKEN=votre_token_blob
```

5. Déployez !

### 3. Configurer Neon pour la production

Dans les settings de votre projet Neon, ajoutez le domaine Vercel aux allowed hosts.

### 4. Seed la base de production

Depuis votre terminal local avec les variables d'environnement de production :

```bash
DATABASE_URL="votre_url_prod" npm run seed
```

Ou depuis Vercel CLI :

```bash
vercel env pull .env.production
npm run seed
```

## 📁 Structure du projet

```
├── app/
│   ├── page.tsx                      # Landing page
│   ├── cours/
│   │   ├── page.tsx                  # Catalogue
│   │   └── [slug]/page.tsx           # Détail d'un cours
│   ├── apprendre/
│   │   └── [courseSlug]/[lessonSlug]/page.tsx  # Lecteur de leçon
│   ├── documents/page.tsx            # Upload de documents (auth requis)
│   ├── connexion/page.tsx            # Login
│   ├── inscription/page.tsx          # Signup
│   └── api/
│       ├── auth/[...all]/route.ts    # Better Auth endpoint
│       └── documents/upload/route.ts # Upload API
├── components/
│   ├── navigation.tsx                # Header avec auth
│   ├── footer.tsx                    # Footer avec disclaimer
│   ├── document-upload.tsx           # Composant d'upload
│   └── document-list.tsx             # Liste des documents
├── lib/
│   ├── db/
│   │   ├── index.ts                  # Client Drizzle
│   │   └── schema.ts                 # Schéma DB
│   ├── auth.ts                       # Config Better Auth (server)
│   └── auth-client.ts                # Client Better Auth (hooks)
└── scripts/
    └── seed.ts                        # Script de seed
```

## 🎨 Personnalisation du design

Le thème est défini dans `app/globals.css` :

- **Couleur principale** : Brass/Gold (`--primary`)
- **Background** : Charcoal foncé
- **Police titres** : Playfair Display
- **Police corps** : Inter

Classes utilitaires custom :
- `.brass-gradient` : Texte dégradé or
- `.card-premium` : Carte avec effet glassmorphism
- `.btn-brass` : Bouton gold avec hover

## 🔐 Sécurité

- ✅ Authentification sécurisée avec Better Auth
- ✅ Sessions HTTP-only cookies
- ✅ Protection CSRF intégrée
- ✅ Uploads validés (taille, type)
- ✅ Accès documents par userId

**Important** : En production, configurez :
- CORS policy stricte
- Rate limiting sur les endpoints d'upload
- Content Security Policy (CSP)

## 🧪 Tests et validation

### Build de production

```bash
npm run build
```

Le build doit passer sans erreurs. Si vous rencontrez des erreurs :
- Vérifiez que `DATABASE_URL` est configurée
- Assurez-vous que `BETTER_AUTH_SECRET` est définie
- Vérifiez les imports TypeScript

### Checklist de validation

- [ ] `npm run build` réussit
- [ ] Landing page s'affiche avec les 3 cours
- [ ] Inscription + connexion fonctionnent
- [ ] Lecteur de leçons affiche vidéo et navigation
- [ ] Upload de document fonctionne (avec ou sans Blob)
- [ ] Design responsive sur mobile
- [ ] Footer affiche le disclaimer légal

## 📝 Scripts disponibles

```bash
npm run dev          # Dev server (port 3456)
npm run build        # Build de production
npm run start        # Server de production
npm run lint         # ESLint
npm run db:generate  # Générer migrations Drizzle
npm run db:push      # Pousser schéma vers DB
npm run db:studio    # Interface Drizzle Studio
npm run seed         # Seed les cours de démo
```

## 🆘 Troubleshooting

### Erreur : "No database connection"

Vérifiez que `DATABASE_URL` est correctement configurée et que la DB Neon est accessible.

### Erreur : "Better Auth secret missing"

Ajoutez `BETTER_AUTH_SECRET` dans `.env.local`.

### Upload de documents ne fonctionne pas

Sans `BLOB_READ_WRITE_TOKEN`, l'upload enregistre seulement les métadonnées. Pour un upload réel :
1. Créez un Vercel Blob store
2. Copiez le token dans `.env.local`

### Les vidéos ne se chargent pas

Les URLs placeholder sont publiques mais peuvent être bloquées par votre firewall. Remplacez-les par vos propres vidéos.

## 📄 Licence et disclaimer

**Avertissement légal** : Le contenu de cette plateforme est strictement éducatif et ne constitue en aucun cas un conseil en investissement, une recommandation financière ou une incitation au trading. Le trading de métaux comporte des risques financiers importants. Consultez toujours un conseiller financier agréé avant toute décision d'investissement.

---

**Développé pour les professionnels B2B du secteur des métaux** 🏭✨
