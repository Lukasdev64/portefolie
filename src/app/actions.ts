'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMessage(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  console.log('\n================================================')
  console.log('📨 NOUVEAU MESSAGE REÇU DU PORTFOLIO')
  console.log('================================================')
  console.log(`👤 Nom     : ${name}`)
  console.log(`📧 Email   : ${email}`)
  console.log(`📝 Sujet   : ${subject}`)
  console.log(`💬 Message : ${message}`)
  console.log('================================================\n')

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'lukas.andries.pro@gmail.com',
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      text: `
Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
      `,
    })

    return { 
      success: true, 
      message: "Message envoyé avec succès ! Je vous répondrai très vite." 
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
    }
  }
}
