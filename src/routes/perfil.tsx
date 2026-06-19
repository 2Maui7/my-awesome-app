import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Globe, HelpCircle, LogOut, MapPin, Settings, Shield } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil · Sucre Sabores" },
      { name: "description", content: "Tu cuenta y preferencias en Sucre Sabores." },
    ],
  }),
  component: Perfil,
});

const items = [
  { icon: Bell, label: "Notificaciones" },
  { icon: Globe, label: "Idioma", value: "Español" },
  { icon: MapPin, label: "Ciudad", value: "Sucre" },
  { icon: Shield, label: "Privacidad" },
  { icon: HelpCircle, label: "Ayuda y soporte" },
  { icon: Settings, label: "Configuración" },
];

function Perfil() {
  return (
    <MobileShell>
      <header className="px-5 pt-8">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-hero font-display text-2xl font-bold text-primary-foreground shadow-soft">
            MA
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl font-semibold">Mauricio Acho</p>
            <p className="text-sm text-muted-foreground">turista@sucresabores.bo</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-3xl bg-card p-4 shadow-card">
          <Stat n="12" label="Visitados" />
          <Stat n="04" label="Favoritos" />
          <Stat n="08" label="Reseñas" />
        </div>
      </header>

      <section className="mt-6 px-5">
        <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
          {items.map(({ icon: Icon, label, value }) => (
            <li key={label}>
              <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-secondary">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-medium">{label}</span>
                {value && <span className="text-xs text-muted-foreground">{value}</span>}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>

        <Link
          to="/admin"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold shadow-card"
        >
          <Shield className="h-4 w-4" /> Acceso administrador
        </Link>

        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-medium text-destructive">
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Sucre Sabores · v1.0 · Hecho con ♥ en Chuquisaca
        </p>
      </section>
    </MobileShell>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl font-bold text-primary">{n}</p>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
