import type { IStatItemProps } from "@/interfaces";
import { useCountUp } from "@/hooks/useCountUp";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

// رقم واحد في شريط الإحصائيات: بيظهر بحركة وبيعدّ من 0 لما نوصله
export function StatItem({ stat }: IStatItemProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const count = useCountUp(stat.value, isVisible);

  return (
    <div ref={ref} className={cn("rv", isVisible && "in")}>
      <span className="block font-display font-normal text-[length:clamp(36px,6vw,50px)] leading-none text-white">
        {isVisible ? count.toLocaleString("en-US") + stat.suffix : "0"}
      </span>
      <span className="text-[#CFE0DC] text-[14px]">{stat.label}</span>
    </div>
  );
}
