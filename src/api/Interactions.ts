import { supabase } from "@/lib/supabase";
import type { IContactFormValues } from "@/interfaces";

// بتسجّل رسالة تواصل من الزائر (عميل lead + تفاعل من نوع message) عن طريق دالة في الداتابيز
export async function sendContactMessage(
  values: IContactFormValues,
): Promise<void> {
  const { error } = await supabase.rpc("send_contact_message", {
    p_full_name: values.full_name,
    p_phone: values.phone,
    p_email: values.email,
    // نص الرسالة موجود في الحقل notes
    p_message: values.notes,
  });
  // Supabase مش بيرمي الخطأ لوحده، فبنرميه عشان الفورم يعرض رسالة الفشل
  if (error) throw error;
}
