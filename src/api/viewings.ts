import { supabase } from "@/lib/supabase";
import type { IBookingFormValues } from "@/interfaces";
export async function requestViewing(
  values: IBookingFormValues,
  propertyId: number,
): Promise<void> {
  const { error } = await supabase.rpc("request_viewing", {
    p_full_name: values.full_name,
    p_phone: values.phone,
    p_email: values.email,
    p_scheduled_at: new Date(values.scheduled_at).toISOString(),
    p_notes: values.notes,
    p_property_id: propertyId,
  });
  if (error) throw error;
}
