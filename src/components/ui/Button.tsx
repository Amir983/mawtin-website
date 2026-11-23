import { Link } from "react-router-dom";
import type { IButtonProps } from "@/interfaces";
import { cn } from "@/lib/utils";

// الشكل الأساسي لكل الأزرار (الـ hover بيرفع الزر 2px ويضيف shadow)
const baseClasses =
  "inline-flex items-center justify-center gap-2 h-[46px] px-6 rounded-[10px] border border-transparent font-semibold cursor-pointer " +
  "transition-[background-color,border-color,translate,box-shadow] duration-150 " +
  "hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,.18)] active:translate-y-0 " +
  "disabled:opacity-65 disabled:cursor-wait";

// ألوان كل نوع زر
const variantClasses = {
  primary: "bg-copper text-white hover:bg-copper-dark",
  ghost: "bg-transparent border-white/50 text-white hover:bg-white/12",
  teal: "bg-teal text-white hover:bg-teal-dark",
};

export function Button({
  children,
  variant = "primary",
  to,
  type = "button",
  disabled,
  onClick,
  className,
}: IButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  // لو فيه "to" نرسم Link بدل button
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
