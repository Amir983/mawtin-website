import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { ISelectProps } from "@/interfaces";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

// الزر اللي بيفتح القائمة
const buttonClasses =
  "w-full min-h-[44px] flex items-center justify-between gap-[10px] px-3 py-[10px] border rounded-[10px] bg-white text-ink font-normal cursor-pointer text-left " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-in-out " +
  "focus-visible:outline-none focus-visible:border-teal focus-visible:shadow-[0_0_0_4px_rgba(11,79,74,.12)]";

// القائمة نفسها (بتظهر بـ fade وحركة بسيطة لفوق)
const listClasses =
  "scroll-white absolute left-0 right-0 top-[calc(100%+6px)] z-30 list-none p-1.5 m-0 max-h-[260px] overflow-auto " +
  "bg-white border border-line rounded-xl shadow-[0_16px_36px_rgba(8,58,54,.18)]";

export function Select({ options, value, onChange }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // قفل القائمة لما نضغط بره
  const closeList = useCallback(() => setIsOpen(false), []);
  useClickOutside(wrapperRef, closeList);

  // لو القيمة مش موجودة في الاختيارات نعتبر أول اختيار هو المحدد
  const foundIndex = options.findIndex((option) => option.value === value);
  const selectedIndex = foundIndex === -1 ? 0 : foundIndex;
  const selectedLabel = options[selectedIndex] ? options[selectedIndex].label : "";

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      const newIndex = Math.max(0, Math.min(options.length - 1, selectedIndex + step));
      onChange(options[newIndex].value);
    }
  }

  // preventDefault مهم: لو الـ Select جوه <label> المتصفح كان بيعمل click تاني على الزر ويفتح القائمة من جديد
  function handleSelect(event: MouseEvent<HTMLLIElement>, optionValue: string) {
    event.preventDefault();
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div ref={wrapperRef} onKeyDown={handleKeyDown} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          buttonClasses,
          // الـ hover بيتطبق وهي مقفولة بس، ولما تتفتح الـ border بيفضل teal حتى لو الماوس فوق الزر
          isOpen ? "border-teal shadow-[0_0_0_4px_rgba(11,79,74,.12)]" : "border-line hover:border-[#C3D3CF]",
        )}
      >
        <span>{selectedLabel}</span>
        <Icon
          name="chevron"
          className={cn(
            "w-[18px] h-[18px] flex-none transition-[rotate,color] duration-250 ease-in-out",
            isOpen ? "rotate-180 text-teal" : "text-mut",
          )}
        />
      </button>

      <ul
        role="listbox"
        className={cn(
          listClasses,
          isOpen
            ? "opacity-100 visible translate-y-0 [transition:opacity_.2s,translate_.2s,visibility_0s_0s]"
            : "opacity-0 invisible -translate-y-1.5 [transition:opacity_.2s,translate_.2s,visibility_0s_.2s]",
        )}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={option.value}
              role="option"
              aria-selected={isSelected}
              onClick={(event) => handleSelect(event, option.value)}
              className={cn(
                "py-[10px] px-3 rounded-lg cursor-pointer text-ink font-medium flex justify-between gap-[10px] transition-[background-color] duration-150",
                isSelected ? "bg-[#E7F0EE] text-teal font-semibold" : "hover:bg-[#F1F5F3]",
              )}
            >
              {option.label}
              {isSelected && (
                <Icon name="check" className="w-[14px] h-[14px] self-center text-teal [stroke-width:3]" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
