import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { askAssistant, type ChatMessage } from "@/lib/assistant";

export function AiAssistantButton() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t =
    language === "fr"
      ? {
          label: "Assistant IA",
          title: "Assistant SHABA",
          subtitle: "Posez-moi une question, je réponds en quelques secondes.",
          placeholder: "Écrivez votre message…",
          greeting:
            "Bonjour ! Je suis l'assistant SHABA INDUSTRY. Comment puis-je vous aider aujourd'hui ?",
          close: "Fermer l'assistant",
          send: "Envoyer",
          error: "Une erreur est survenue. Veuillez réessayer.",
        }
      : {
          label: "AI Assistant",
          title: "SHABA Assistant",
          subtitle: "Ask me anything, I'll reply in a few seconds.",
          placeholder: "Type your message…",
          greeting: "Hello! I'm the SHABA INDUSTRY assistant. How can I help you today?",
          close: "Close assistant",
          send: "Send",
          error: "Something went wrong. Please try again.",
        };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.greeting },
  ]);

  // Réinitialise le message d'accueil si la langue change avant tout échange.
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0]!.role === "assistant"
        ? [{ role: "assistant", content: t.greeting }]
        : prev,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const reply = await askAssistant(nextMessages, language);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Assistant error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: t.error }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Panneau de chat */}
      {open && (
        <div className="fixed bottom-40 right-6 z-50 flex h-[28rem] w-80 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-ink-foreground">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold uppercase">{t.title}</p>
                <p className="text-[11px] text-ink-muted">{t.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={t.close}
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 text-ink-foreground/80 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <span className="flex gap-1 rounded-md bg-muted px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              disabled={sending}
              className="h-9 flex-1 rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label={t.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Bouton flottant — positionné au-dessus du bouton WhatsApp (bottom-6) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.label}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </>
  );
}