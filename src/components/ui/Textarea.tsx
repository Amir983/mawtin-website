import type { ITextareaProps } from "@/interfaces";
import { cn } from "@/lib/utils";

// نفس ستايل الـ Input بس مع resize رأسي وارتفاع أدنى 96px
const baseClasses =
  "w-full min-h-[96px] px-3 py-[10px] rounded-[10px] border bg-white font-normal text-ink resize-y " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-in-out " +
  "hover:border-[#C3D3CF] focus:outline-none";

const normalClasses = "border-line focus:border-teal focus:shadow-[0_0_0_4px_rgba(11,79,74,.12)]";
const errorClasses = "border-error focus:border-error focus:shadow-[0_0_0_4px_rgba(181,69,61,.14)]";

export function Textarea({ name, value, onChange, placeholder, error }: ITextareaProps) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(baseClasses, error ? errorClasses : normalClasses)}
    />
  );
}
