"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      console.log("SUPABASE ERROR:", error);
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="hint tracking-widest uppercase mb-3">Nexo IA</p>
        <h1 className="font-display text-3xl mb-1">Diagnóstico Cliente</h1>
        <p className="hint mb-8">Acceso privado.</p>

        {sent ? (
          <div className="bg-card border border-line rounded-lg p-5">
            <p className="text-sm">
              Te he enviado un enlace de acceso a <strong>{email}</strong>.
              Ábrelo en este mismo dispositivo.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="label block">Email</label>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            <button
              className="btn w-full justify-center"
              onClick={handleLogin}
              disabled={loading || !email}
            >
              {loading ? "Enviando…" : "Enviar enlace de acceso"}
            </button>
            {error && <p className="text-sm text-accent">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}