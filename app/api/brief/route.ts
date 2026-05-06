import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const briefSchema = z.object({
  projectTypes: z.array(z.string()).min(1),
  budget: z.string(),
  deadline: z.string(),
  projectName: z.string().min(2),
  description: z.string().min(50),
  targetAudience: z.string().min(10),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(9),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = briefSchema.parse(body);

    const fullName = `${data.firstName} ${data.lastName}`;
    const company = data.company ? ` (${data.company})` : "";

    // Email à l'équipe Zephyr
    await resend.emails.send({
      from: "Zephyr Brief <noreply@zephyr.sn>",
      to: ["msourang@zephyr.sn"],
      subject: `Nouveau brief — ${data.projectName} | ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <h1 style="color: #818cf8; font-size: 24px; margin-bottom: 8px;">Nouveau brief reçu</h1>
          <p style="color: #94a3b8; margin-bottom: 32px;">Un prospect vient de remplir le formulaire de devis.</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8; width: 40%;">Client</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; font-weight: 600;">${fullName}${company}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;"><a href="mailto:${data.email}" style="color: #818cf8;">${data.email}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Téléphone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;">${data.phone}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Projet</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; font-weight: 600;">${data.projectName}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Types</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;">${data.projectTypes.join(", ")}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Budget</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;">${data.budget}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Délai</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;">${data.deadline}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b; color: #94a3b8;">Cible</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1e1b4b;">${data.targetAudience}</td></tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #111118; border-radius: 12px; border: 1px solid #1e1b4b;">
            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">Description du projet</p>
            <p style="white-space: pre-wrap;">${data.description}</p>
          </div>
        </div>
      `,
    });

    // Email de confirmation au prospect
    await resend.emails.send({
      from: "Zephyr <hello@zephyr.sn>",
      to: [data.email],
      subject: `Brief reçu — nous vous répondons sous 48h`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <h1 style="color: #818cf8;">Merci ${data.firstName} !</h1>
          <p style="color: #94a3b8; line-height: 1.6;">
            Nous avons bien reçu votre brief pour le projet <strong style="color: #e2e8f0;">${data.projectName}</strong>.
            Notre équipe l'analyse et vous contactera sous <strong style="color: #e2e8f0;">48 heures</strong>
            avec une proposition personnalisée.
          </p>
          <div style="margin-top: 24px; padding: 20px; background: #111118; border-radius: 12px; border-left: 3px solid #6366f1;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              En attendant, n'hésitez pas à explorer nos réalisations sur <a href="https://zephyr.sn/portfolio" style="color: #818cf8;">zephyr.sn/portfolio</a>
            </p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
            Zephyr · Dakar, Sénégal · <a href="mailto:msourang@zephyr.sn" style="color: #64748b;">msourang@zephyr.sn</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 });
    }
    console.error("Brief API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
