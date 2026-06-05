"use client";

import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Shield,
  TrendingDown,
  ListOrdered,
  Wrench,
  FileText,
  FileCheck,
  ArrowLeft,
  FileDown,
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Resumen ejecutivo", icon: LayoutDashboard },
  { label: "Diagnóstico", icon: ClipboardList },
  { label: "Áreas críticas", icon: AlertTriangle },
  { label: "Fortalezas", icon: Shield },
  { label: "Riesgos", icon: TrendingDown },
  { label: "Prioridades", icon: ListOrdered },
  { label: "Intervención recomendada", icon: Wrench },
  { label: "Evidencias", icon: FileText },
  { label: "Propuesta", icon: FileCheck },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col"
      style={{
        background: "rgba(26, 107, 181, 0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(47, 158, 214, 0.12)",
      }}
    >
      <div className="px-6 pb-6 pt-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          NEXO <span className="text-[#2E9ED6]">IA</span>
        </h1>

        <p className="mt-1 text-[11px] tracking-wide text-white/80">
          Inteligencia para decisiones
        </p>
      </div>

      <div className="mx-6 h-px bg-white/10" />

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;

            return (
              <li key={item.label}>
                <button
                  className={`group flex w-full items-center gap-3 rounded-lg border-l-2 px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#4FC3F7] bg-[#4FC3F7]/10 text-white"
                      : "border-transparent text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0"
                  />

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-6 h-px bg-white/10" />

      <div className="space-y-2 px-4 py-6">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white transition-all hover:bg-white/5">
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span>Volver al diagnóstico</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white transition-all hover:bg-[#4FC3F7]/10">
          <FileDown size={16} strokeWidth={1.5} />
          <span>Generar PDF</span>
        </button>
      </div>
    </aside>
  );
}