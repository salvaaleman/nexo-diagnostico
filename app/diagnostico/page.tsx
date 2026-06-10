import { createClientRecord } from "../clients/actions";

export const dynamic = "force-dynamic";

export default async function DiagnosticoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-2xl">
        <p className="hint tracking-widest uppercase mb-3">Nexo IA</p>

        <h1 className="font-display text-3xl mb-2">
          Diagnóstico estratégico
        </h1>

        <p className="hint mb-8">
          Completa tus datos para iniciar el diagnóstico de tu negocio.
        </p>

        <form
          action={createClientRecord}
          className="grid sm:grid-cols-2 gap-4 bg-card border border-line rounded-lg p-6"
        >
          <div>
            <label className="label">Nombre *</label>
            <input name="name" required className="field mt-1" />
          </div>

          <div>
            <label className="label">Apellidos *</label>
            <input name="last_name" required className="field mt-1" />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Email *</label>
            <input name="email" type="email" required className="field mt-1" />
          </div>

          <div>
            <label className="label">Empresa o marca *</label>
            <input name="brand" required className="field mt-1" />
          </div>

          <div>
            <label className="label">Área o sector *</label>
            <input
              name="sector"
              required
              placeholder="Ej: salud, ferretería, formación, estética..."
              className="field mt-1"
            />
          </div>

          <div>
            <label className="label">Teléfono</label>
            <input name="phone" className="field mt-1" />
          </div>

          <div>
            <label className="label">Web</label>
            <input name="web" className="field mt-1" />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Redes</label>
            <input
              name="socials"
              placeholder="Instagram, Facebook, LinkedIn, TikTok..."
              className="field mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Notas iniciales</label>
            <textarea
              name="notes"
              placeholder="Cuéntanos brevemente qué está ocurriendo en tu negocio."
              className="field mt-1 min-h-28"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button className="btn w-full justify-center" type="submit">
              Iniciar diagnóstico
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}