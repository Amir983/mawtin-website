import type { IRevealProps } from "@/interfaces";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

// بيخلّي المحتوى يظهر بحركة لما نوصله بالـ scroll (delay بيأخّر الحركة)
export function Reveal({ children, className, delay = 0 }: IRevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("rv", isVisible && "in", className)}
      style={delay ? { animationDelay: delay + "ms" } : undefined}
    >
      {children}
    </div>
  );
}
