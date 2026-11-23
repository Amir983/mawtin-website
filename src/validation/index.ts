import { normalizeText } from "@/lib/searchUtils";

// كل دالة بترجّع نص رسالة الخطأ، أو نص فاضي لو القيمة سليمة

const REQUIRED_MESSAGE = "This field is required";

export function validateRequired(value: string) {
  return value.trim() ? "" : REQUIRED_MESSAGE;
}

// التليفون: مطلوب، ولازم يكون 8 أرقام على الأقل (بيقبل الأرقام العربي)
export function validatePhone(value: string) {
  const text = value.trim();
  if (!text) return REQUIRED_MESSAGE;
  const digits = normalizeText(text).replace(/\D/g, "");
  return digits.length < 8 ? "Enter a valid phone number" : "";
}

// الإيميل اختياري، بس لو اتكتب لازم يكون شكله صح
export function validateEmail(value: string) {
  const text = value.trim();
  if (!text) return "";
  return /^\S+@\S+\.\S+$/.test(text) ? "" : "Enter a valid email address";
}

// تاريخ ووقت المعاينة: مطلوب، ولازم يكون في المستقبل
export function validateFutureDate(value: string) {
  const text = value.trim();
  if (!text) return REQUIRED_MESSAGE;
  return new Date(text) < new Date() ? "Choose a date and time in the future" : "";
}
