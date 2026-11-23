import type { ISuccessPanelProps } from "@/interfaces";
import { Icon } from "@/components/ui/Icon";

// لوحة النجاح اللي بتحل مكان الفورم بعد الإرسال (مع ملخص اختياري)
export function SuccessPanel({ title, text, rows }: ISuccessPanelProps) {
  return (
    <div className="text-left">
      <div className="w-11 h-11 rounded-full bg-[#E4F1EA] text-success grid place-items-center mb-3">
        <Icon name="check" className="w-[22px] h-[22px]" />
      </div>
      <h2 className="text-[24px] mb-1">{title}</h2>
      <p className="text-mut">{text}</p>
      {rows && (
        <div className="mt-[14px] border-t border-line">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-3 py-[9px] border-b border-line text-[14px]">
              <span className="text-mut">{row.label}</span>
              <b className="text-right font-semibold">{row.value}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
