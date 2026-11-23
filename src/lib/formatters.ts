// السعر بالجنيه المصري، مثال: EGP 4,250,000
export function formatPrice(price: number) {
  return "EGP " + Number(price).toLocaleString("en-US");
}

// التاريخ والوقت المختصر اللي بيظهر في لوحة النجاح، مثال: 14 Nov 2026, 10:30
export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// أقل تاريخ ووقت مسموح بيه في حقل datetime-local (الوقت الحالي بتوقيت المستخدم)
export function getNowForInput() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}
