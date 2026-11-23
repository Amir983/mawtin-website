import type { IPropertyGridProps } from "@/interfaces";
import { EmptyState } from "@/components/shared/EmptyState";
import { PropertyCard } from "@/components/shared/PropertyCard";

// شبكة الكروت: 3 أعمدة على الديسكتوب، 2 على التابلت، 1 على الموبايل
// وبتتعامل مع حالات التحميل والخطأ والقائمة الفاضية
export function PropertyGrid({ properties, loading, error, emptyTitle, emptyText }: IPropertyGridProps) {
  if (loading) {
    return <EmptyState text="Loading properties..." />;
  }
  if (error) {
    return <EmptyState text={error} />;
  }
  if (properties.length === 0) {
    return <EmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <div className="grid gap-5 grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  );
}
