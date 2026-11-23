import type { IValueCardProps } from "@/interfaces";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

// كارت في صفحة About (قيمنا / خطوات الشغل): رقم + عنوان + وصف
export function ValueCard({ number, title, text, index = 0 }: IValueCardProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const delay = index * 90;

  return (
    <div
      ref={ref}
      className={cn("rv bg-white border border-line rounded-xl p-6", isVisible && "in")}
      style={delay ? { animationDelay: delay + "ms" } : undefined}
    >
      <span className="font-display font-normal text-[34px] leading-none text-copper">{number}</span>
      <h3 className="text-[22px] mt-[10px] mb-1.5">{title}</h3>
      <p className="text-mut">{text}</p>
    </div>
  );
}
