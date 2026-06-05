"use client";

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xs font-semibold tracking-widest uppercase text-[#27a7de] mb-4">
      {children}
    </h2>
  );
}