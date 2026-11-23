import type { IInputProps } from "@/interfaces";
import { cn } from "@/lib/utils";

// ستايل حقل الإدخال (الـ focus بيغيّر الـ border بشكل تدريجي 0.3s ويظهر ring)
const baseClasses =
  "w-full min-h-[44px] px-3 py-[10px] rounded-[10px] border bg-white font-normal text-ink " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-in-out " +
  "hover:border-[#C3D3CF] focus:outline-none";

const normalClasses = "border-line focus:border-teal focus:shadow-[0_0_0_4px_rgba(11,79,74,.12)]";
const errorClasses = "border-error focus:border-error focus:shadow-[0_0_0_4px_rgba(181,69,61,.14)]";

export function Input({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  inputMode,
  min,
  step,
}: IInputProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      min={min}
      step={step}
      onChange={(event) => onChange(event.target.value)}
      className={cn(baseClasses, error ? errorClasses : normalClasses)}
    />
  );
}
