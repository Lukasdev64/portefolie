"use client"

import { motion } from "framer-motion"
import { Code2, Database, Layout, Server, Terminal, Wrench } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["NestJS", "Node.js", "AdonisJS", "PHP", "REST API"],
  },
  {
    category: "Base de données",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "TypeORM"],
  },
  {
    category: "Outils & DevOps",
    icon: Wrench,
    items: ["Git", "Docker", "VS Code", "npm/yarn", "Vercel"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Compétences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un ensemble complet d'outils et de technologies que je maîtrise pour donner vie à vos projets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:bg-primary/80 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
