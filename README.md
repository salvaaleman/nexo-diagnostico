# Nexo IA · Diagnóstico Cliente — V1

Mini app interna y privada para diagnosticar clientes. Solo Salvador entra.
El cliente responde en el dispositivo de Salvador, sin login propio.

## Stack
Next.js (App Router) · Tailwind · Supabase · (Vercel para desplegar).

## Puesta en marcha

### 1. Supabase
1. Crea un proyecto en **región EU (Frankfurt)**.
2. SQL Editor → pega y ejecuta `schema.sql`.
3. Verifica que **RLS está activado** en `clients` y `diagnoses`
   (Table editor → cada tabla → "RLS enabled").
4. Authentication → **desactiva el registro público** ("Allow new users to sign up")
   para que solo TÚ puedas entrar. Crea tu usuario manualmente
   (Authentication → Users → Add user) con tu email.
5. Project Settings → API → copia `Project URL` y `anon public key`.

> Seguridad: las policies dan acceso total a cualquier usuario autenticado.
> Como la app es de un solo usuario, basta con desactivar el registro.
> Si quieres blindarlo más, cambia las policies por `using (auth.email() = 'tu@email.com')`.

### 2. Local
```bash
npm install
cp .env.local.example .env.local   # pega tu URL y anon key
npm run dev
```
Abre http://localhost:3000 → te redirige a /login.

### 3. Vercel (cuando funcione en local)
- Sube el repo a GitHub e importa en Vercel.
- Añade las dos variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- En Supabase → Authentication → URL Configuration, añade la URL de Vercel
  a "Redirect URLs" (`https://tu-app.vercel.app/auth/callback`).

## Mapa de pantallas
- `/login` — enlace mágico al email.
- `/clients` — listado + crear cliente.
- `/clients/[id]` — ficha + histórico de diagnósticos.
- `/diagnoses/[id]` — **vista cliente** (solo `answers` + `status`).
- `/diagnoses/[id]/interno` — **vista interna** (todo, incl. `internal_eval`).

## Regla crítica de privacidad
La vista cliente hace `select("id, status, answers")`: `internal_eval` no se pide
nunca, no llega al navegador del cliente. La recomendación, evaluación, alertas,
prioridad, bloques y notas viven solo en `/interno`.

## Fuera de alcance V1
PDF, IA automática, facturación, GHL, CRM, login de cliente, email de envío.
