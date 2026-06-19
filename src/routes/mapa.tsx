import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { establecimientos } from "@/data/establecimientos";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa · Sucre Sabores" },
      { name: "description", content: "Encuentra restaurantes cercanos en el casco colonial de Sucre." },
    ],
  }),
  component: Mapa,
});

function Mapa() {
  return (
    <MobileShell>
      <header className="px-5 pt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Mapa</p>
        <h1 className="mt-1 font-display text-3xl font-bold">Cerca de ti</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recorre el centro histórico y descubre sabores en cada esquina.
        </p>
      </header>

      <div className="mt-6 px-5">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary shadow-card">
          {/* Mapa estilizado (placeholder) */}
          <div className="absolute inset-0 bg-gradient-warm" />
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 400" fill="none">
            <path d="M0 80 L400 110" stroke="currentColor" strokeWidth="1" className="text-clay" />
            <path d="M0 180 L400 200" stroke="currentColor" strokeWidth="1" className="text-clay" />
            <path d="M0 280 L400 310" stroke="currentColor" strokeWidth="1" className="text-clay" />
            <path d="M90 0 L110 400" stroke="currentColor" strokeWidth="1" className="text-clay" />
            <path d="M210 0 L230 400" stroke="currentColor" strokeWidth="1" className="text-clay" />
            <path d="M310 0 L330 400" stroke="currentColor" strokeWidth="1" className="text-clay" />
          </svg>
          {establecimientos.slice(0, 5).map((e, i) => (
            <div
              key={e.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${20 + i * 16}%`, top: `${30 + (i % 3) * 22}%` }}
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-card shadow-soft">
            <Navigation className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      <section className="mt-6 px-5">
        <h2 className="font-display text-lg font-semibold">Lugares cercanos</h2>
        <div className="mt-3 space-y-3">
          {establecimientos.map((e) => (
            <Link
              key={e.id}
              to="/establecimiento/$id"
              params={{ id: e.id }}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card"
            >
              <img src={e.imagen} alt={e.nombre} loading="lazy" width={120} height={120} className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{e.nombre}</p>
                <p className="truncate text-xs text-muted-foreground">{e.direccion}</p>
              </div>
              <span className="text-xs font-semibold text-primary">{(0.3 + Math.random() * 1.4).toFixed(1)} km</span>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
