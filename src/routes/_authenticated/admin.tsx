import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Gestion des demandes de devis, messages de contact et candidatures reçues sur le site SHABA INDUSTRY.",
      },
      { property: "og:title", content: "Tableau de bord — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Suivi interne des demandes reçues via le site SHABA INDUSTRY.",
      },
    ],
  }),
  component: Admin,
});

type Tab = "quotes" | "messages" | "applications";

const TABS: { id: Tab; label: string; table: string }[] = [
  { id: "quotes", label: "Devis", table: "quote_requests" },
  { id: "messages", label: "Messages", table: "contact_messages" },
  { id: "applications", label: "Candidatures", table: "job_applications" },
];

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("quotes");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      setIsAdmin(Boolean(data));
    })();
  }, []);

  const table = TABS.find((t) => t.id === tab)!.table;

  const { data: rows = [], isFetching } = useQuery({
    queryKey: ["admin", table],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as "quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Record<string, unknown>[];
    },
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const markHandled = async (id: string) => {
    const { error } = await supabase
      .from(table as "quote_requests")
      .update({ status: "traité" })
      .eq("id", id);
    if (error) {
      toast.error("Mise à jour impossible.");
      return;
    }
    toast.success("Demande marquée comme traitée.");
    void queryClient.invalidateQueries({ queryKey: ["admin", table] });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-bold uppercase">Tableau de bord</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["admin", table] })}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
            </Button>
            <Button variant="secondary" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </div>

        {isAdmin === false && (
          <p className="mt-8 border-l-4 border-primary bg-muted p-5 text-sm">
            Votre compte n'a pas encore les droits administrateur. Demandez à un responsable
            d'activer votre accès.
          </p>
        )}

        {isAdmin && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tab === t.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              {isFetching && <p className="text-sm text-muted-foreground">Chargement…</p>}
              {!isFetching && rows.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune entrée pour le moment.</p>
              )}
              {rows.map((row) => (
                <article key={String(row["id"])} className="border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-lg font-semibold uppercase">
                      {String(row["name"])}
                    </h2>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {new Date(String(row["created_at"])).toLocaleString("fr-FR")} ·{" "}
                      {String(row["status"])}
                    </span>
                  </div>
                  <dl className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                    {["email", "phone", "company", "service", "subject", "position", "cv_url"]
                      .filter((k) => row[k])
                      .map((k) => (
                        <div key={k}>
                          <span className="uppercase text-xs tracking-wide">{k}</span> :{" "}
                          {String(row[k])}
                        </div>
                      ))}
                  </dl>
                  {row["message"] ? (
                    <p className="mt-3 whitespace-pre-line text-sm">{String(row["message"])}</p>
                  ) : null}
                  {row["status"] !== "traité" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4"
                      onClick={() => markHandled(String(row["id"]))}
                    >
                      Marquer comme traité
                    </Button>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
