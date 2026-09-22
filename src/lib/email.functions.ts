import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const attachmentSchema = z.object({
  filename: z.string().min(1).max(255),
  content: z.string().min(1),
  contentType: z.string().max(150),
});

const emailSchema = z.object({
  type: z.enum(["contact", "quote", "newsletter"]),

  name: z.string().min(2).max(100).optional(),

  email: z.string().email().max(255),

  phone: z.string().max(30).optional(),

  company: z.string().max(120).optional(),

  service: z.string().max(120).optional(),

  message: z.string().min(10).max(2000).optional(),

  attachments: z.array(attachmentSchema).max(5).optional(),
});

export const sendNotificationEmail = createServerFn({ method: "POST" })
  .validator(emailSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY n'est pas configurée.");
    }

    const resend = new Resend(apiKey);

    // =========================
    // NEWSLETTER
    // =========================

    if (data.type === "newsletter") {
      const { data: email, error } = await resend.emails.send({
        from: "SHABA INDUSTRY <info@shabaindustry.com>",
        to: ["newsletter@shabaindustry.com"],
        replyTo: data.email,
        subject: "Nouvelle inscription à la newsletter",
        html: `
          <h2>Nouvelle inscription à la newsletter</h2>

          <p>
            Une nouvelle personne vient de s'inscrire à la newsletter
            de SHABA INDUSTRY.
          </p>

          <p>
            <strong>Email :</strong> ${data.email}
          </p>
        `,
      });

      if (error) {
        console.error("Erreur Resend :", error);

        throw new Error(
          error.message || "Impossible d'envoyer l'e-mail.",
        );
      }

      return {
        success: true,
        id: email?.id,
      };
    }

    // =========================
    // CONTACT / DEVIS
    // =========================

    const recipient =
      data.type === "contact"
        ? "info@shabaindustry.com"
        : "sales@shabaindustry.com";

    const subject =
      data.type === "contact"
        ? `Nouveau message de contact — ${data.name}`
        : `Nouvelle demande de devis — ${data.name}`;

    const html = `
      <h2>${subject}</h2>

      <p>
        <strong>Nom :</strong> ${data.name ?? ""}
      </p>

      ${
        data.company
          ? `<p><strong>Société :</strong> ${data.company}</p>`
          : ""
      }

      <p>
        <strong>Email :</strong> ${data.email}
      </p>

      ${
        data.phone
          ? `<p><strong>Téléphone :</strong> ${data.phone}</p>`
          : ""
      }

      ${
        data.service
          ? `<p><strong>Service :</strong> ${data.service}</p>`
          : ""
      }

      <hr />

      <p><strong>Message :</strong></p>

      <p>
        ${data.message?.replace(/\n/g, "<br />") ?? ""}
      </p>

      ${
        data.type === "quote" && data.attachments?.length
          ? `
            <hr />

            <p>
              <strong>Pièces jointes :</strong>
              ${data.attachments.length} fichier(s)
            </p>

            <ul>
              ${data.attachments
                .map(
                  (file) =>
                    `<li>${file.filename}</li>`,
                )
                .join("")}
            </ul>
          `
          : ""
      }
    `;

    const attachments =
      data.type === "quote"
        ? (data.attachments ?? []).map((file) => ({
            filename: file.filename,
            content: file.content,
            contentType: file.contentType,
          }))
        : undefined;

    const { data: email, error } = await resend.emails.send({
      from: "SHABA INDUSTRY <info@shabaindustry.com>",
      to: [recipient],
      replyTo: data.email,
      subject,
      html,
      ...(attachments?.length
        ? { attachments }
        : {}),
    });

    if (error) {
      console.error("Erreur Resend :", error);

      throw new Error(
        error.message || "Impossible d'envoyer l'e-mail.",
      );
    }

    return {
      success: true,
      id: email?.id,
    };
  });