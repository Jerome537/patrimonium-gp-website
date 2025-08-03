# Patrimonium GP - Site Vitrine

Site vitrine professionnel pour Patrimonium GP, cabinet de conseil en gestion de patrimoine basé à Tahiti et en Nouvelle-Calédonie.

## 🚀 Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API (headless)
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Notion avec API activée
- Compte Resend (ou configuration SMTP)
- Compte GitHub
- Compte Vercel

## 🛠️ Installation et Configuration

### 1. Cloner le projet

```bash
git clone https://github.com/Jerome537/patrimonium-gp-website.git
cd patrimonium-gp-website
npm install
```

### 2. Configuration Notion

1. **Créer une intégration Notion**
   - Allez sur https://www.notion.so/my-integrations
   - Créez une nouvelle intégration "Patrimonium GP"
   - Copiez le token d'intégration

2. **Créer les bases de données**
   - Créez une page parent dans Notion
   - Exécutez le script de seed :
   ```bash
   # Modifiez d'abord PARENT_PAGE_ID dans scripts/seed-notion.js
   npm run seed
   ```
   - Le script créera automatiquement les 3 bases avec les bonnes propriétés

3. **Partager les bases avec l'intégration**
   - Sur chaque base créée, cliquez sur "..." → "Connexions"
   - Ajoutez votre intégration "Patrimonium GP"

### 3. Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
# Notion
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_ARTICLES_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_SERVICES_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_TEAM_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=contact@patrimonium.nc

# Site
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Patrimonium GP
```

### 4. Lancer le développement

```bash
npm run dev
```

Ouvrez http://localhost:3000

## 📦 Déploiement

### 1. Configuration GitHub

1. **Créer le repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create patrimonium-gp-website --public
   git push -u origin main
   ```

2. **Créer la branche de développement**
   ```bash
   git checkout -b dev
   git push -u origin dev
   ```

3. **Configurer les secrets GitHub**
   - Allez dans Settings → Secrets and variables → Actions
   - Ajoutez tous les secrets de `.env.local`

4. **Protéger la branche main**
   - Settings → Branches → Add rule
   - Branch name pattern: `main`
   - Cochez: Require pull request reviews, Require status checks

### 2. Connexion à Vercel

1. **Importer le projet**
   - Connectez-vous à https://vercel.com
   - "Add New..." → "Project"
   - Importez depuis GitHub
   - Sélectionnez `patrimonium-gp-website`

2. **Configurer les variables**
   - Dans Project Settings → Environment Variables
   - Ajoutez toutes les variables de `.env.local`
   - ⚠️ Changez `SITE_URL` et `NEXT_PUBLIC_SITE_URL` en `https://gp.patrimonium.nc`

3. **Configurer le domaine**
   - Settings → Domains
   - Add → `gp.patrimonium.nc`
   - Configurez les DNS chez votre registrar

### 3. Workflow de développement

1. **Feature branch**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/ma-feature
   ```

2. **Commit et push**
   ```bash
   git add .
   git commit -m "feat: description"
   git push origin feature/ma-feature
   ```

3. **Pull Request**
   - Créez une PR vers `dev`
   - La CI vérifie lint + build
   - Preview automatique sur Vercel

4. **Release**
   - PR de `dev` vers `main`
   - Déploiement automatique en production

## 📝 Gestion du contenu

### Publier un article

1. Dans Notion, créez une page dans la base "Articles"
2. Remplissez les propriétés (Title, Slug, Excerpt...)
3. Cochez "Published" ✅
4. L'article apparaît sur le site (ISR 60s)

### Modifier un service

1. Éditez la page dans la base "Services"
2. Le contenu est mis à jour automatiquement

### Ajouter un membre d'équipe

1. Créez une page dans la base "Équipe"
2. Uploadez une photo
3. Cochez "Visible" ✅

## 🧪 Tests et Qualité

### Tests locaux

```bash
# Lint
npm run lint

# TypeScript
npm run typecheck

# Build
npm run build
```

### Lighthouse

Objectif : Score ≥ 90 sur tous les critères

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun
```

## 📊 Analytics

### Vercel Analytics

Intégré automatiquement, dashboard dans Vercel.

### Google Analytics (optionnel)

Ajoutez `NEXT_PUBLIC_GA_ID` dans les variables d'environnement.

## 🔒 Sécurité

- Headers de sécurité configurés dans `next.config.mjs`
- Variables sensibles uniquement côté serveur
- Validation des formulaires avec Zod
- Protection CSRF automatique

## 📚 Documentation API

### Routes API

- `POST /api/contact` - Envoi du formulaire de contact

### Routes statiques

- `/robots.txt` - Fichier robots
- `/sitemap.xml` - Sitemap dynamique
- `/rss.xml` - Flux RSS du blog

## 🤝 Support

Pour toute question :
- Email : dev@patrimonium.nc
- Documentation Next.js : https://nextjs.org/docs
- Documentation Notion API : https://developers.notion.com

## 📄 Licence

© 2024 Patrimonium GP. Tous droits réservés.
