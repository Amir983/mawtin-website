import type { IProperty } from "@/interfaces";

export const MIN_SEARCH_LENGTH = 2; // البحث بيبدأ من حرفين
const MAX_RESULTS = 5;

// بيوحّد النص عشان البحث بالعربي يشتغل: حروف صغيرة، أرقام عربي -> إنجليزي، شيل التشكيل، توحيد أ/إ/آ و ى و ة
export function normalizeText(text: string) {
  return String(text || "")
    .toLowerCase()
    .replace(/[\u0660-\u0669]/g, (digit) => String(digit.charCodeAt(0) - 1632))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[\u0623\u0625\u0622]/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0629/g, "\u0647")
    .trim();
}

// بيدور في اسم العقار وعنوانه ونوعه، ويرجّع أول 5 نتائج
export function searchProperties(properties: IProperty[], text: string) {
  const query = normalizeText(text);
  if (query.length < MIN_SEARCH_LENGTH) {
    return [];
  }
  return properties
    .filter((property) => {
      const typeName = property.type ? property.type.name : "";
      return normalizeText(property.title + " " + property.address + " " + typeName).includes(query);
    })
    .slice(0, MAX_RESULTS);
}
