import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react";
import { useState } from "react";
import { getEstablecimiento, establecimientos } from "@/data/establecimientos";

export const Route = createFileRoute("/establecimiento/$id")({
  loader: ({ params }) => {
    const e = getEstablecimiento(params.id);
    if (!e) throw notFound();
    return { establecimiento: e };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.establecimiento.nombre ?? "Establecimiento"} · Sucre Sabores` },
      { name: "description", content: loaderData?.establecimiento.descripcion ?? "" },
      { property: "og:title", content: loaderData?.establecimiento.nombre ?? "" },
      { property: "og:description", content: loaderData?.establecimiento.descripcion ?? "" },
      { property: "og:image", content: loaderData?.establecimiento.imagen ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-display text-3xl">No encontrado</p>
        <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
          Volver al inicio
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-display text-2xl">Algo salió mal</p>
        <button onClick={reset} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
          Reintentar
        </button>
      </div>
    </div>
  ),
  component: Detalle,
});

function Detalle() {
  const { establecimiento: e } = Route.useLoaderData();
  const [fav, setFav] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-12">
      {/* Imagen hero */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={e.imagen} alt={e.nombre} width={1024} height={768} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-6">
          <Link
            to="/"
            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur">
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setFav((f) => !f)}
              className="grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur"
            >
              <Heart className={`h-4 w-4 transition-colors ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="-mt-6 rounded-t-3xl bg-background px-6 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{e.categoria}</p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight">{e.nombre}</h1>
          </div>
          <span className="shrink-0 rounded-full bg-accent/20 px-3 py-1 text-sm font-bold text-clay">{e.precio}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{e.rating}</span>
          <span className="text-sm text-muted-foreground">· {e.reviews} reseñas</span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{e.descripcion}</p>

        {/* Info */}
        <div className="mt-5 space-y-3 rounded-2xl bg-secondary p-4">
          <InfoRow icon={<MapPin className="h-4 w-4" />} text={e.direccion} />
          <InfoRow icon={<Clock className="h-4 w-4" />} text={e.horario} />
          <InfoRow icon={<Phone className="h-4 w-4" />} text={e.telefono} />
        </div>

        {/* Menú */}
        <div className="mt-8">
          <h2 className="font-display text-2xl font-semibold">Menú destacado</h2>
          <div className="mt-4 space-y-4">
            {e.menu.map((m) => (
              <article key={m.nombre} className="flex gap-4 rounded-2xl bg-card p-3 shadow-card">
                <img src={m.imagen} alt={m.nombre} loading="lazy" width={200} height={200} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-semibold leading-tight">{m.nombre}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.descripcion}</p>
                  <p className="mt-auto pt-2 text-sm font-bold text-primary">Bs {m.precio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Otros */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold">También te puede gustar</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {establecimientos.filter((x) => x.id !== e.id).slice(0, 4).map((x) => (
              <Link
                key={x.id}
                to="/establecimiento/$id"
                params={{ id: x.id }}
                className="w-40 shrink-0 overflow-hidden rounded-2xl bg-card shadow-card"
              >
                <img src={x.imagen} alt={x.nombre} loading="lazy" width={400} height={300} className="h-24 w-full object-cover" />
                <div className="p-2.5">
                  <p className="line-clamp-1 text-sm font-semibold">{x.nombre}</p>
                  <p className="text-[11px] text-muted-foreground">{x.categoria}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA fijo */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-3 safe-bottom">
          <a
            href={`tel:${e.telefono.replace(/\s/g, "")}`}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button className="flex-1 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition active:scale-[0.98]">
            Reservar mesa
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-background text-primary">{icon}</span>
      <span className="text-foreground">{text}</span>
    </div>
  );
}
