import type { IPropertyFiltersProps } from "@/interfaces";
import { Counter } from "@/components/ui/Counter";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

// شريط الفلاتر: النوع، أقل سعر، أعلى سعر، عدد الغرف، وزر مسح الفلاتر
// الفورم "controlled": الصفحة هي اللي بتحتفظ بالقيم وبتبعتها هنا
export function PropertyFilters({ types, filters, onChange, onClear }: IPropertyFiltersProps) {
  const typeOptions = [{ value: "", label: "All types" }, ...types.map((name) => ({ value: name, label: name }))];

  return (
    <div className="grid gap-3 grid-cols-2 bg-white border border-line rounded-xl p-4 mb-[22px] min-[900px]:grid-cols-[1.2fr_1fr_1fr_1fr_auto] min-[900px]:items-end">
      <Field label="Type" as="div" className="col-span-full min-[900px]:col-auto">
        <Select options={typeOptions} value={filters.type} onChange={(value) => onChange({ ...filters, type: value })} />
      </Field>

      <Field label="Min price (EGP)">
        <Input
          name="min"
          type="number"
          min="0"
          step="100000"
          inputMode="numeric"
          placeholder="0"
          value={filters.min}
          onChange={(value) => onChange({ ...filters, min: value })}
        />
      </Field>

      <Field label="Max price (EGP)">
        <Input
          name="max"
          type="number"
          min="0"
          step="100000"
          inputMode="numeric"
          placeholder="Any"
          value={filters.max}
          onChange={(value) => onChange({ ...filters, max: value })}
        />
      </Field>

      <Field label="Bedrooms" as="div">
        <Counter value={filters.beds} onChange={(value) => onChange({ ...filters, beds: value })} />
      </Field>

      <button
        type="button"
        onClick={onClear}
        className="col-span-full min-[900px]:col-auto h-11 border border-line bg-white rounded-[10px] px-4 font-semibold text-teal cursor-pointer"
      >
        Clear filters
      </button>
    </div>
  );
}
