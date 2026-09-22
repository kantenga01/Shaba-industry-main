import type { Language } from "./language";

export type LocalizedValue =
  | string
  | {
      fr: string;
      en: string;
    };

/**
 * Résout une valeur localisée ({fr, en} ou string simple) vers une string
 * dans la langue demandée. Ne throw jamais : retourne une string vide si
 * la valeur est null/undefined, et retombe sur fr/en si la langue demandée
 * n'existe pas sur l'objet.
 */
export function text(value: LocalizedValue | null | undefined, language: Language): string {
  if (value == null) return "";

  if (typeof value === "string") return value;

  return value[language] ?? value.fr ?? value.en ?? "";
}