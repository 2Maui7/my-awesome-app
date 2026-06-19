import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import type { Establecimiento } from "@/data/establecimientos";

export function EstablecimientoCard({ e }: { e: Establecimiento }) {
  return (
    <Link
      to="/establecimiento/$id"
      params={{ id: e.id }}
      className="group block overflow-hidden rounded-3xl bg-card shadow-card transition-transform active:scale-[0.98]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={e.imagen}
          alt={e.nombre}
          loading="lazy"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
          {e.categoria}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
          {e.precio}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={2} />
          <span className="text-sm font-semibold">{e.rating}</span>
          <span className="text-xs opacity-80">({e.reviews})</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{e.nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{e.descripcion}</p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{e.direccion}</span>
        </div>
      </div>
    </Link>
  );
}
