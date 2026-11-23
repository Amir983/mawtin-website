import { supabase } from "@/lib/supabase";
import type { IProperty } from "@/interfaces";
export async function getPublicProperties(): Promise<IProperty[]> {
  const propertyColumns =
    "id, title, address, price, area_sqm, bedrooms, status, image_url, description, created_at, type:PropertyTypes(name)";
  const { data, error } = await supabase
    .from("Properties")
    .select(propertyColumns);

  if (error) throw error;

  return (data ?? []).map((property) => ({
    ...property,
    type: Array.isArray(property.type)
      ? (property.type[0] ?? { name: "" })
      : property.type,
  }));
}
