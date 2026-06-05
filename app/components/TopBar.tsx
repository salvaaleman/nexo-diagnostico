import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function TopBar() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/clients" className="flex items-baseline gap-2">
          <span className="hint tracking-widest uppercase">Nexo IA</span>
          <span className="font-display text-lg">Diagnóstico</span>
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
