// بيجمّع أسماء الـ classes ويتجاهل أي قيمة فاضية أو false
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
