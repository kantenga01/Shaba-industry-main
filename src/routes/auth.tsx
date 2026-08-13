import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Espace administration — SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Connexion réservée à l'équipe SHABA INDUSTRY pour consulter les demandes de devis, messages et candidatures.",
      },
      { property: "og:title", content: "Espace administration — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Connexion sécurisée à l'espace de gestion SHABA INDUSTRY.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifiez votre boîte mail pour confirmer.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Administration"
        title="Espace équipe"
        description="Connexion réservée au personnel SHABA INDUSTRY."
      />
      <section className="py-16 md:py-20">
        <div className="container-page max-w-md">
          <form onSubmit={onSubmit} className="grid gap-5 border border-border p-6 md:p-8">
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
              <Input name="email" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Mot de passe
              </Label>
              <Input
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
            <Button type="submit" disabled={loading} size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              {mode === "signin" ? "Se connecter" : "Créer le compte"}
            </Button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs uppercase tracking-wide text-muted-foreground hover:text-primary"
            >
              {mode === "signin" ? "Créer un compte équipe" : "J'ai déjà un compte"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
