import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, User } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Sucre Sabores" },
      { name: "description", content: "Panel de administración para gestionar establecimientos y menús." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero px-6">
      <div className="w-full max-w-sm rounded-3xl bg-card p-7 shadow-soft">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver
        </Link>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Panel de administrador</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inicia sesión para gestionar establecimientos y menús de Sucre Sabores.
        </p>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field icon={<User className="h-4 w-4" />} label="Usuario" placeholder="admin@sucresabores.bo" type="email" />
          <Field icon={<Lock className="h-4 w-4" />} label="Contraseña" placeholder="••••••••" type="password" />
          <button className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition active:scale-[0.98]">
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Solo personal autorizado · CRUD completo de establecimientos y menús
        </p>
      </div>
    </div>
  );
}

function Field({
  icon, label, placeholder, type,
}: { icon: React.ReactNode; label: string; placeholder: string; type: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-border bg-background px-3.5 py-3">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </label>
  );
}
