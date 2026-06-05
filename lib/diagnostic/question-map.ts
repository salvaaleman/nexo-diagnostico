export type VariableName =
  | "claridad_mensaje"
  | "cliente_ideal"
  | "propuesta_valor"
  | "diferenciacion"
  | "captacion"
  | "contenido"
  | "conversion"
  | "seguimiento"
  | "sistemas"
  | "ia"
  | "implementacion";

export interface QuestionVariableMap {
  questionId: string;
  variables: VariableName[];
}

export const QUESTION_VARIABLE_MAP: QuestionVariableMap[] = [
  { questionId: "b1_que_haces", variables: ["claridad_mensaje"] },
  { questionId: "b1_que_compran", variables: ["claridad_mensaje", "propuesta_valor"] },
  { questionId: "b1_que_funciona", variables: ["claridad_mensaje", "diferenciacion"] },
  { questionId: "b1_que_frena", variables: ["claridad_mensaje", "implementacion"] },
  { questionId: "b1_que_perderian", variables: ["propuesta_valor"] },

  { questionId: "b2_persona_ideal", variables: ["cliente_ideal"] },
  { questionId: "b2_problema", variables: ["cliente_ideal", "propuesta_valor"] },
  { questionId: "b2_deseo", variables: ["cliente_ideal", "propuesta_valor"] },
  { questionId: "b2_preocupacion", variables: ["cliente_ideal", "conversion"] },
  { questionId: "b2_objeciones", variables: ["cliente_ideal", "conversion"] },
  { questionId: "b2_cliente_no", variables: ["cliente_ideal"] },
  { questionId: "b2_preguntas_frecuentes", variables: ["cliente_ideal", "conversion"] },

  { questionId: "b3_que_vendes", variables: ["propuesta_valor"] },
  { questionId: "b3_que_incluye", variables: ["propuesta_valor"] },
  { questionId: "b3_resultado", variables: ["propuesta_valor"] },
  { questionId: "b3_por_que_ti", variables: ["diferenciacion"] },
  { questionId: "b3_confusion", variables: ["claridad_mensaje", "diferenciacion"] },
  { questionId: "b3_propuesta_frase", variables: ["claridad_mensaje", "propuesta_valor"] },

  { questionId: "b4_seis_meses", variables: ["claridad_mensaje", "implementacion"] },
  { questionId: "b4_conseguir", variables: ["implementacion"] },
  { questionId: "b4_resultado_excelente", variables: ["claridad_mensaje", "implementacion"] },
  { questionId: "b4_por_que_ahora", variables: ["implementacion"] },

  { questionId: "b5_percepcion_deseada", variables: ["diferenciacion", "claridad_mensaje"] },
  { questionId: "b5_percepcion_actual", variables: ["diferenciacion", "claridad_mensaje"] },
  { questionId: "b5_como_no", variables: ["diferenciacion"] },
  { questionId: "b5_admira", variables: ["diferenciacion"] },
  { questionId: "b5_rechaza_estilos", variables: ["diferenciacion"] },

  { questionId: "b6_contenido_publicado", variables: ["contenido", "captacion"] },
  { questionId: "b6_contenido_mejor", variables: ["contenido", "captacion"] },
  { questionId: "b6_contenido_no_representa", variables: ["contenido", "diferenciacion"] },

  { questionId: "b7_temas_comunicar", variables: ["contenido"] },
  { questionId: "b7_temas_cuesta", variables: ["contenido"] },
  { questionId: "b7_impide_publicar", variables: ["contenido", "implementacion"] },
  { questionId: "b7_publicaria", variables: ["contenido", "claridad_mensaje"] },

  { questionId: "b9_uso_actual", variables: ["ia", "sistemas"] },
  { questionId: "b9_objetivo_ia", variables: ["ia", "sistemas"] },
  { questionId: "b9_tarea_delegaria", variables: ["ia", "sistemas", "implementacion"] },
  { questionId: "b9_tarea_consume", variables: ["sistemas", "implementacion"] },
  { questionId: "b9_procesos_automatizar", variables: ["sistemas", "ia"] },

  { questionId: "b10_decisiones", variables: ["implementacion"] },

  { questionId: "b11_como_fue", variables: ["seguimiento", "conversion"] },
  { questionId: "b11_mas_gusto", variables: ["seguimiento"] },
  { questionId: "b11_menos_gusto", variables: ["seguimiento", "conversion"] },
];