import type { IFieldProps } from "@/interfaces";
import { cn } from "@/lib/utils";

// label + الحقل + سطر رسالة الخطأ
// لو error مش متبعتة (undefined) سطر الخطأ مبيترسمش (زي فلاتر الـ Properties)
// لو متبعتة (حتى لو فاضية) السطر بيترسم دايماً زي الـ prototype
export function Field({ label, children, error, as = "label", className }: IFieldProps) {
  const classes = cn("flex flex-col gap-1.5 text-[13px] font-semibold text-mut", className);

  const content = (
    <>
      {label}
      {children}
      {error !== undefined && (
        <em className="text-error not-italic font-medium text-[12.5px] min-h-0">{error}</em>
      )}
    </>
  );

  if (as === "div") {
    return <div className={classes}>{content}</div>;
  }
  return <label className={classes}>{content}</label>;
}
