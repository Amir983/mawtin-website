import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { IPropertyFilters } from "@/interfaces";
import { Container } from "@/components/shared/Container";
import { PageHeading } from "@/components/shared/PageHeading";
import { PropertyFilters } from "@/components/shared/PropertyFilters";
import { PropertyGrid } from "@/components/shared/PropertyGrid";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import { emptyFilters, getStartFilters, saveFilters } from "@/lib/propertyFilters";

// صفحة العقارات: فلاتر + عدد النتايج + شبكة الكروت (الفلترة بتتم في المتصفح على القائمة المحمّلة)
export function Properties() {
  const location = useLocation();
  const { properties, loading, error } = usePublicProperties();

  // لو جينا من رابط نوع في الفوتر هيبقى فيه state.type
  const linkState = location.state as { type?: string } | null;
  const typeFromLink = linkState && linkState.type ? linkState.type : null;

  const [filters, setFilters] = useState<IPropertyFilters>(() => getStartFilters(location.key, typeFromLink));

  function handleFiltersChange(newFilters: IPropertyFilters) {
    setFilters(newFilters);
    saveFilters(newFilters);
  }

  // أنواع العقارات الموجودة في القائمة (بدون تكرار)
  const types: string[] = [];
  for (const property of properties) {
    if (property.type && !types.includes(property.type.name)) {
      types.push(property.type.name);
    }
  }

  // تطبيق الفلاتر: النوع، أقل سعر، أعلى سعر، أقل عدد غرف
  const minPrice = Number(filters.min) || 0;
  const maxPrice = Number(filters.max) || Infinity;
  const filteredProperties = properties.filter((property) => {
    const typeName = property.type ? property.type.name : "";
    return (
      (!filters.type || typeName === filters.type) &&
      property.price >= minPrice &&
      property.price <= maxPrice &&
      property.bedrooms >= filters.beds
    );
  });

  const count = filteredProperties.length;
  // key بيخلّي الكروت تتبني من جديد (وتتحرك) مع كل تغيير في الفلاتر زي الـ prototype
  const resultsKey = [filters.type, filters.min, filters.max, filters.beds].join("|");

  return (
    <Container>
      <PageHeading title="Properties" text="Browse everything currently available." />

      <PropertyFilters
        types={types}
        filters={filters}
        onChange={handleFiltersChange}
        onClear={() => handleFiltersChange(emptyFilters)}
      />

      <div key={resultsKey} className="pb-14">
        {!loading && !error && (
          <p className="text-mut mb-[14px] text-[14px]">
            {count + " " + (count === 1 ? "property" : "properties") + " found"}
          </p>
        )}
        <PropertyGrid
          properties={filteredProperties}
          loading={loading}
          error={error}
          emptyTitle="No properties match these filters"
          emptyText="Try a wider price range or reset the filters."
        />
      </div>
    </Container>
  );
}
