import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Heart, MapPin, User } from "lucide-react";

const items = [
  { to: "/", label: "Explorar", icon: Compass },
  { to: "/mapa", label: "Mapa", icon: MapPin },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-2 safe-bottom">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="group flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground group-hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
