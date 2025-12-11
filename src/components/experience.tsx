"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    company: "Stagey",
    role: "Développeur Web Fullstack",
    period: "2024 - Présent",
    description: "Participation au développement de la plateforme de recherche de stages pour étudiants. Implémentation de fonctionnalités de recherche, gestion de profils et outils de création de CV.",
    tags: ["React", "Next.js", "Tailwind CSS", "Fullstack"],
  },
  {
    company: "Mission Freelance",
    role: "Développeur Scrapping & Data",
    period: "2024",
    description: "Développement d'une solution d'agrégation d'offres de logement étudiant. Création de bots de scraping performants pour récupérer et normaliser les données de multiples plateformes.",
    tags: ["Python", "Puppeteer", "Node.js", "Data"],
  },
  {
    company: "FoccusEdge",
    role: "Développeur Web Fullstack",
    period: "2021 - 2025",
    description: "Développement d'applications web complètes, de la conception à la mise en production. Utilisation de React pour le frontend et NestJS/Adonis pour le backend.",
    tags: ["React", "NestJS", "Adonis", "Fullstack"],
  },
  // Add more experiences if available
]

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expérience Professionnelle</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel et les projets sur lesquels j'ai travaillé.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0 border-l-2 border-border/50"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              
              <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm bg-background px-3 py-1 rounded-full border border-border w-fit">
                    <Briefcase className="h-3 w-3 mr-2" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
