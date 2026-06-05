import { emptyVariables } from "./variables";

export function buildStructuredVariables(
  answers: Record<string, unknown>
) {
  const variables = emptyVariables();

  const nivelIA = answers["nivel_ia_cliente"];
  const canalPrincipal = answers["canal_principal"];
  const tiempo = answers["tiempo_semanal"];
  const equipo = answers["equipo"];
  const ayuda = answers["tipo_ayuda"];
  const urgencia = answers["urgencia"];

  if (nivelIA === "Nunca la he usado") {
    variables.ia.score += 4;
  }

  if (nivelIA === "Principiante") {
    variables.ia.score += 3;
  }

  if (canalPrincipal === "Ninguno claro") {
    variables.captacion.score += 2;
    variables.contenido.score += 1;
  }

  if (tiempo === "Menos de 1h") {
    variables.implementacion.score += 2;
  }

  if (equipo === "Solo") {
    variables.implementacion.score += 1;
  }

  if (ayuda === "Que me lo monten") {
    variables.sistemas.score += 2;
  }

  if (urgencia === "Alta") {
    variables.implementacion.score += 1;
  }

  return variables;
}