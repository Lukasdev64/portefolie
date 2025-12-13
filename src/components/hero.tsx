"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { TextReveal } from "@/components/text-reveal"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-medium text-primary mb-4">
              Bonjour, je suis Lukas Andries
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <TextReveal text="Développeur Web" className="justify-center" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 block mt-2">
                <TextReveal text="Fullstack" className="justify-center" delay={0.5} />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Je crée des expériences numériques modernes, performantes et créatives.
              Spécialisé en React, NestJS et architectures modernes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Me contacter <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#projects"
              className="px-8 py-3 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
            >
              Voir mes projets
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-6 text-muted-foreground"
          >
            <a
              href="https://github.com/Lukasdev64"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/andries-lukas-396387303/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:lukas.andries.pro@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
