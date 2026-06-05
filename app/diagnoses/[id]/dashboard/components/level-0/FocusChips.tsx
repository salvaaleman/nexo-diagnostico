"use client";

interface FocusChipsProps {
  focuses: string[];
}

export default function FocusChips({ focuses }: FocusChipsProps) {
  if (focuses.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {focuses.map((f) => (
        <span
          key={f}
          className="px-2.5 py-1 rounded-full text-xs font-medium border"
          style={{
            background: "rgba(12,126,196,0.15)",
            borderColor: "rgba(39,167,222,0.3)",
            color: "#27a7de",
          }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}