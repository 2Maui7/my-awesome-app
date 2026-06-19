import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
