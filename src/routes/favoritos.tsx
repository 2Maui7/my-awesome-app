import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { EstablecimientoCard } from "@/components/EstablecimientoCard";
import { establecimientos } from "@/data/establecimientos";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos · Sucre Sabores" },
      { name: "description", content: "Tus restaurantes y cafés guardados en Sucre." },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const favs = establecimientos.slice(0, 2);
  return (
    <MobileShell>
      <header className="px-5 pt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Guardados</p>
        <h1 className="mt-1 font-display text-3xl font-bold">Tus favoritos</h1>
        <p className="mt-2 text-sm text-muted-foreground">Lugares que marcaste para volver.</p>
      </header>

      {favs.length === 0 ? (
        <div className="mx-5 mt-10 rounded-3xl border border-dashed border-border p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-4 font-display text-lg">Aún no guardas lugares</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
            Explorar restaurantes
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 px-5">
          {favs.map((e) => (
            <EstablecimientoCard key={e.id} e={e} />
          ))}
        </div>
      )}
    </MobileShell>
  );
}
