import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const assistantSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(30),
  language: z.enum(["fr", "en"]),
});

const SYSTEM_PROMPT_FR = `Tu es l'assistant virtuel du site web de SHABA INDUSTRY, une entreprise multiservices basée à Lubumbashi, en RDC.

SHABA INDUSTRY intervient dans 6 pôles : vêtements de travail & EPI, fournitures minières et industrielles, logistique import/export & dédouanement, impression commerciale (Shaba Print), construction & maintenance industrielle (Shaba Construction), et technologies d'entreprise (IT).

Ton rôle :
- Répondre brièvement et clairement aux questions des visiteurs sur les services de l'entreprise.
- Orienter vers la page "Demander un devis" pour toute demande précise de prix ou de commande.
- Orienter vers la page Contact pour toute demande urgente ou complexe.
- Rester poli, professionnel, et concis (3-4 phrases maximum par réponse).
- Si tu ne connais pas la réponse à une question spécifique (prix exact, stock, délai précis), dis-le honnêtement et propose de contacter l'équipe commerciale.
- Ne jamais inventer de prix, de délais ou d'informations précises que tu ne connais pas.`;

const SYSTEM_PROMPT_EN = `You are the virtual assistant for the SHABA INDUSTRY website, a multiservice company based in Lubumbashi, DRC.

SHABA INDUSTRY operates in 6 divisions: workwear & PPE, mining and industrial supplies, import/export logistics & customs clearance, commercial printing (Shaba Print), construction & industrial maintenance (Shaba Construction), and business technology (IT).

Your role:
- Answer visitor questions about the company's services briefly and clearly.
- Point them to the "Request a Quote" page for any precise pricing or order request.
- Point them to the Contact page for urgent or complex requests.
- Stay polite, professional, and concise (3-4 sentences max per reply).
- If you don't know the answer to a specific question (exact price, stock, precise timeline), say so honestly and suggest contacting the sales team.
- Never invent prices, timelines, or precise information you don't actually know.`;

export const askAssistantServer = createServerFn({ method: "POST" })
  .validator(assistantSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY n'est pas configurée.");
    }

    const systemPrompt = data.language === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: systemPrompt,
        messages: data.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur API Anthropic :", errorText);

      throw new Error("Impossible de contacter l'assistant IA pour le moment.");
    }

    const json = (await response.json()) as {
      content?: { type: string; text?: string }[];
    };

    const reply =
      json.content
        ?.filter((block) => block.type === "text" && block.text)
        .map((block) => block.text)
        .join("\n")
        .trim() ?? "";

    return {
      reply:
        reply ||
        (data.language === "fr"
          ? "Désolé, je n'ai pas de réponse à vous proposer pour le moment."
          : "Sorry, I don't have a response for you right now."),
    };
  });