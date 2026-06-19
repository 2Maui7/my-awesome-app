import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { EstablecimientoCard } from "@/components/EstablecimientoCard";
import { categorias, establecimientos, type Categoria } from "@/data/establecimientos";
import heroImg from "@/assets/sucre-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sucre Sabores · Turismo Gastronómico" },
      { name: "description", content: "Descubre los mejores restaurantes, salteñerías y cafés de la ciudad blanca." },
      { property: "og:title", content: "Sucre Sabores" },
      { property: "og:description", content: "Plataforma de turismo gastronómico de Sucre, Bolivia." },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Categoria | "Todos">("Todos");

  const destacados = establecimientos.filter((e) => e.destacado);

  const filtrados = useMemo(() => {
    return establecimientos.filter((e) => {
      const matchQ =
        !q ||
        e.nombre.toLowerCase().includes(q.toLowerCase()) ||
        e.descripcion.toLowerCase().includes(q.toLowerCase());
      const matchCat = cat === "Todos" || e.categoria === cat;
      return matchQ && matchCat;
    });
  }, [q, cat]);

  return (
    <MobileShell>
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="relative aspect-[5/4] w-full">
          <img
            src={heroImg}
            alt="Vista panorámica de Sucre, Bolivia"
            width={1024}
            height={820}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-6">
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold tracking-wide">Sucre Sabores</span>
            </div>
            <Link
              to="/admin"
              className="rounded-full bg-background/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-background/30"
            >
              Admin
            </Link>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              La Ciudad Blanca
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-white">
              Descubre el sabor<br />de Sucre
            </h1>
            <p className="mt-3 max-w-xs text-sm text-white/85">
              Restaurantes, salteñerías y cafés que cuentan la historia gastronómica de Chuquisaca.
            </p>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="-mt-5 px-5">
        <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar restaurantes, platos…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </section>

      {/* Categorías */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-display text-lg font-semibold">Categorías</h2>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-2 hide-scrollbar">
          {(["Todos", ...categorias.map((c) => c.nombre)] as const).map((c) => {
            const active = cat === c;
            const icon = categorias.find((x) => x.nombre === c)?.icon;
            return (
              <button
                key={c}
                onClick={() => setCat(c as Categoria | "Todos")}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {icon && <span className="mr-1.5">{icon}</span>}
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Destacados */}
      {cat === "Todos" && !q && (
        <section className="mt-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-display text-lg font-semibold">Destacados</h2>
            <span className="text-xs font-medium text-primary">Esta semana</span>
          </div>
          <div className="mt-3 flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar">
            {destacados.map((e) => (
              <Link
                key={e.id}
                to="/establecimiento/$id"
                params={{ id: e.id }}
                className="relative h-56 w-64 shrink-0 overflow-hidden rounded-3xl shadow-card"
              >
                <img src={e.imagen} alt={e.nombre} loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{e.categoria}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold leading-tight">{e.nombre}</h3>
                  <p className="mt-1 line-clamp-1 text-xs opacity-85">{e.direccion}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lista */}
      <section className="mt-8 px-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-semibold">
            {cat === "Todos" ? "Todos los lugares" : cat}
          </h2>
          <span className="text-xs text-muted-foreground">{filtrados.length} resultados</span>
        </div>
        <div className="mt-4 grid gap-5">
          {filtrados.map((e) => (
            <EstablecimientoCard key={e.id} e={e} />
          ))}
          {filtrados.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No encontramos resultados para esta búsqueda.
            </div>
          )}
        </div>
      </section>
    </MobileShell>
  );
}
