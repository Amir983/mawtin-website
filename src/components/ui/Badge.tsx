import type { IBadgeProps } from "@/interfaces";

// tag = نوع العقار على الكارت، success = حالة "Available"
export function Badge({ children, variant = "tag" }: IBadgeProps) {
  if (variant === "success") {
    return (
      <span className="inline-block bg-[#E4F1EA] text-success px-[10px] py-px rounded-[999px] font-semibold text-[13px]">
        {children}
      </span>
    );
  }
  return (
    <span className="self-start text-[12px] font-semibold text-teal bg-[#E7F0EE] px-[10px] py-0.5 rounded-[999px]">
      {children}
    </span>
  );
}
