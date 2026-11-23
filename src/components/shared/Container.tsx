import type { IContainerProps } from "@/interfaces";
import { cn } from "@/lib/utils";

// الحاوية الأساسية للمحتوى: عرض أقصى 1180px وتتوسّط الصفحة
export function Container({ children, className }: IContainerProps) {
  return <div className={cn("max-w-[1180px] mx-auto px-5", className)}>{children}</div>;
}
