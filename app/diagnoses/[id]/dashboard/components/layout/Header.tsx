"use client";

import { Calendar, LogOut } from "lucide-react";

interface HeaderProps {
  clientName: string;
}

export default function Header({ clientName }: HeaderProps) {
  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="flex items-center justify-between px-10 py-7"
      style={{
        borderBottom: "1px solid rgba(47, 158, 214, 0.08)",
      }}
    >
      <div className="flex flex-col">
        <span
          className="text-[11px] uppercase tracking-[0.25em] text-[#4FC3F7]"
          style={{
            fontFamily: "var(--font-body, 'Poppins', sans-serif)",
          }}
        >
          DIAGNÓSTICO ESTRATÉGICO
        </span>

        <h1
          className="mt-1 text-[42px] font-bold text-white leading-none"
          style={{
            fontFamily: "var(--font-title, 'Nunito Sans', sans-serif)",
          }}
        >
          {clientName}
        </h1>

        <span
          className="mt-2 text-sm text-[#B0C4DE]"
          style={{
            fontFamily: "var(--font-body, 'Poppins', sans-serif)",
          }}
        >
          Informe ejecutivo · NEXO IA
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-[#B0C4DE]">
          <Calendar
            size={18}
            strokeWidth={1.5}
            className="text-[#4FC3F7]"
          />
          <span className="text-sm">{today}</span>
        </div>

        <button className="flex items-center gap-2 text-[#B0C4DE] hover:text-white transition-colors text-sm">
          <LogOut size={16} strokeWidth={1.5} />
          <span>Salir</span>
        </button>
      </div>
    </header>
  );
}