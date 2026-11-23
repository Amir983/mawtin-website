import type { IEmptyStateProps } from "@/interfaces";

// صندوق الحالات الفاضية (مفيش نتايج / جاري التحميل / خطأ)
export function EmptyState({ title, text, children }: IEmptyStateProps) {
  return (
    <div className="text-center bg-white border border-dashed border-line rounded-xl px-5 py-11 text-mut">
      {title && <h3 className="text-[1.17em] mb-1.5">{title}</h3>}
      <p>{text}</p>
      {children && <p className="mt-[14px]">{children}</p>}
    </div>
  );
}
