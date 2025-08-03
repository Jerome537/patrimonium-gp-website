#!/usr/bin/env node

/**
 * Script pour créer les bases de données Notion et les peupler avec des données d'exemple
 * Usage: npm run seed
 */

const { Client } = require('@notionhq/client')
require('dotenv').config({ path: '.env.local' })

// Configuration de la page parent où créer les bases
const PARENT_PAGE_ID = '24452e2233a08051a4cfd956dd251895'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Exemples de données
const articlesData = [
  {
    title: 'Optimisation fiscale en Polynésie française : les nouveautés 2024',
    slug: 'optimisation-fiscale-polynesie-2024',
    excerpt: 'Découvrez les dernières mesures fiscales et comment en tirer parti pour votre patrimoine.',
    published: true,
    publishedAt: new Date('2024-01-15'),
    tags: ['Fiscalité', 'Polynésie', 'Actualités'],
    author: 'Jean Dupont',
  },
  {
    title: 'Préparer sa retraite : les meilleures stratégies d\'investissement',
    slug: 'preparer-retraite-strategies-investissement',
    excerpt: 'Guide complet pour construire un patrimoine solide en vue de votre retraite.',
    published: true,
    publishedAt: new Date('2024-01-10'),
    tags: ['Retraite', 'Investissement', 'Conseils'],
    author: 'Marie Martin',
  },
  {
    title: 'Transmission de patrimoine : anticiper pour protéger ses proches',
    slug: 'transmission-patrimoine-anticiper',
    excerpt: 'Les clés pour une transmission optimisée de votre patrimoine à vos héritiers.',
    published: true,
    publishedAt: new Date('2024-01-05'),
    tags: ['Succession', 'Transmission', 'Famille'],
    author: 'Jean Dupont',
  },
]

const servicesData = [
  {
    title: 'Gestion de patrimoine',
    summary: 'Une approche globale et personnalisée pour optimiser votre patrimoine.',
    order: 1,
    keywords: ['patrimoine', 'gestion', 'conseil', 'optimisation'],
    visible: true,
  },
  {
    title: 'Optimisation fiscale',
    summary: 'Réduisez légalement votre charge fiscale grâce à nos stratégies sur mesure.',
    order: 2,
    keywords: ['fiscalité', 'impôts', 'optimisation', 'défiscalisation'],
    visible: true,
  },
  {
    title: 'Préparation retraite',
    summary: 'Construisez dès aujourd\'hui le patrimoine qui financera votre retraite.',
    order: 3,
    keywords: ['retraite', 'épargne', 'prévoyance', 'revenus complémentaires'],
    visible: true,
  },
  {
    title: 'Transmission de patrimoine',
    summary: 'Anticipez et optimisez la transmission de vos biens à vos héritiers.',
    order: 4,
    keywords: ['succession', 'donation', 'transmission', 'héritage'],
    visible: true,
  },
  {
    title: 'Investissement immobilier',
    summary: 'Développez votre patrimoine immobilier avec notre expertise locale.',
    order: 5,
    keywords: ['immobilier', 'investissement', 'location', 'défiscalisation'],
    visible: true,
  },
  {
    title: 'Protection du conjoint',
    summary: 'Sécurisez l\'avenir de votre conjoint avec des solutions adaptées.',
    order: 6,
    keywords: ['protection', 'conjoint', 'prévoyance', 'assurance'],
    visible: true,
  },
]

const teamData = [
  {
    name: 'Jean Dupont',
    role: 'Fondateur & Directeur',
    bio: 'Expert en gestion de patrimoine avec plus de 20 ans d\'expérience.',
    email: 'jean.dupont@patrimonium.nc',
    phone: '+689 40 XX XX XX',
    linkedin: 'https://linkedin.com/in/jeandupont',
    order: 1,
    visible: true,
  },
  {
    name: 'Marie Martin',
    role: 'Conseillère patrimoniale senior',
    bio: 'Spécialiste en optimisation fiscale et transmission de patrimoine.',
    email: 'marie.martin@patrimonium.nc',
    phone: '+689 40 XX XX XX',
    linkedin: 'https://linkedin.com/in/mariemartin',
    order: 2,
    visible: true,
  },
  {
    name: 'Pierre Tahiti',
    role: 'Conseiller en investissements',
    bio: 'Expert des marchés financiers locaux et internationaux.',
    email: 'pierre.tahiti@patrimonium.nc',
    phone: '+687 XX XX XX',
    linkedin: 'https://linkedin.com/in/pierretahiti',
    order: 3,
    visible: true,
  },
]

async function createDatabase(parentPageId, title, properties) {
  try {
    const response = await notion.databases.create({
      parent: { page_id: parentPageId },
      title: [
        {
          type: 'text',
          text: {
            content: title,
          },
        },
      ],
      properties,
    })
    
    console.log(`✅ Base de données "${title}" créée avec l'ID: ${response.id}`)
    return response.id
  } catch (error) {
    console.error(`❌ Erreur lors de la création de la base "${title}":`, error)
    throw error
  }
}

async function seedArticles(databaseId) {
  for (const article of articlesData) {
    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: article.title,
                },
              },
            ],
          },
          Slug: {
            rich_text: [
              {
                text: {
                  content: article.slug,
                },
              },
            ],
          },
          Excerpt: {
            rich_text: [
              {
                text: {
                  content: article.excerpt,
                },
              },
            ],
          },
          Published: {
            checkbox: article.published,
          },
          PublishedAt: {
            date: {
              start: article.publishedAt.toISOString(),
            },
          },
          Tags: {
            multi_select: article.tags.map(tag => ({ name: tag })),
          },
          Author: {
            rich_text: [
              {
                text: {
                  content: article.author,
                },
              },
            ],
          },
        },
      })
      console.log(`✅ Article "${article.title}" créé`)
    } catch (error) {
      console.error(`❌ Erreur lors de la création de l'article "${article.title}":`, error)
    }
  }
}

async function seedServices(databaseId) {
  for (const service of servicesData) {
    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: service.title,
                },
              },
            ],
          },
          Summary: {
            rich_text: [
              {
                text: {
                  content: service.summary,
                },
              },
            ],
          },
          Order: {
            number: service.order,
          },
          Keywords: {
            multi_select: service.keywords.map(keyword => ({ name: keyword })),
          },
          Visible: {
            checkbox: service.visible,
          },
        },
      })
      console.log(`✅ Service "${service.title}" créé`)
    } catch (error) {
      console.error(`❌ Erreur lors de la création du service "${service.title}":`, error)
    }
  }
}

async function seedTeam(databaseId) {
  for (const member of teamData) {
    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: member.name,
                },
              },
            ],
          },
          Role: {
            rich_text: [
              {
                text: {
                  content: member.role,
                },
              },
            ],
          },
          Bio: {
            rich_text: [
              {
                text: {
                  content: member.bio,
                },
              },
            ],
          },
          Email: {
            email: member.email,
          },
          Phone: {
            phone_number: member.phone,
          },
          LinkedIn: {
            url: member.linkedin,
          },
          Order: {
            number: member.order,
          },
          Visible: {
            checkbox: member.visible,
          },
        },
      })
      console.log(`✅ Membre d'équipe "${member.name}" créé`)
    } catch (error) {
      console.error(`❌ Erreur lors de la création du membre "${member.name}":`, error)
    }
  }
}

async function main() {
  console.log('🚀 Début du seeding Notion...\n')

  if (!process.env.NOTION_TOKEN) {
    console.error('❌ NOTION_TOKEN non défini dans les variables d\'environnement')
    process.exit(1)
  }

  console.log('📝 Instructions pour utiliser ce script :\n')
  console.log('1. Créez d\'abord les 3 bases de données manuellement dans Notion :')
  console.log('   - Base "Articles" avec les propriétés : Title, Slug, Excerpt, Cover, Published, PublishedAt, Tags, Author')
  console.log('   - Base "Services" avec les propriétés : Title, Summary, Icon, Order, Keywords, Visible')
  console.log('   - Base "Équipe" avec les propriétés : Name, Role, Bio, Photo, Email, Phone, LinkedIn, Order, Visible')
  console.log('\n2. Récupérez les IDs de chaque base :')
  console.log('   - Ouvrez la base dans Notion')
  console.log('   - Copiez l\'URL (ex: https://notion.so/xxxxx?v=yyyy)')
  console.log('   - L\'ID est la partie avant le ? (xxxxx)')
  console.log('\n3. Ajoutez ces IDs dans votre fichier .env.local :')
  console.log('   NOTION_DB_ARTICLES_ID=xxxxx')
  console.log('   NOTION_DB_SERVICES_ID=xxxxx')
  console.log('   NOTION_DB_TEAM_ID=xxxxx')
  console.log('\n4. Relancez ce script pour peupler les bases avec des données d\'exemple')

  // Si les IDs sont définis, on peuple les bases
  if (process.env.NOTION_DB_ARTICLES_ID && process.env.NOTION_DB_SERVICES_ID && process.env.NOTION_DB_TEAM_ID) {
    console.log('\n✅ IDs des bases détectés, peuplement en cours...\n')
    
    console.log('📄 Ajout des articles...')
    await seedArticles(process.env.NOTION_DB_ARTICLES_ID)
    
    console.log('\n🔧 Ajout des services...')
    await seedServices(process.env.NOTION_DB_SERVICES_ID)
    
    console.log('\n👤 Ajout des membres de l\'équipe...')
    await seedTeam(process.env.NOTION_DB_TEAM_ID)

    console.log('\n✨ Seeding terminé avec succès !')
    console.log('\n📋 Prochaines étapes :')
    console.log('1. Ajoutez du contenu aux pages Notion créées (body des articles et services)')
    console.log('2. Ajoutez des images de couverture aux articles et photos aux membres')
    console.log('3. Partagez les bases avec votre intégration Notion')
    console.log('4. Lancez npm run dev pour voir votre site !')
  } else {
    console.log('\n⚠️  Les IDs des bases ne sont pas encore configurés.')
    console.log('Suivez les instructions ci-dessus puis relancez le script.')
  }
}

// Run the script
main().catch(console.error)
