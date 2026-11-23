import type { ICounterProps } from "@/interfaces";

// عداد الغرف: 0 بيظهر "Any" وغير كده بيظهر "N+"
export function Counter({
  value,
  onChange,
  max = 6,
  lessLabel = "Fewer bedrooms",
  moreLabel = "More bedrooms",
}: ICounterProps) {
  const buttonClasses =
    "w-9 h-9 border-0 rounded-lg bg-[#EEF3F1] text-teal text-[20px] leading-none cursor-pointer " +
    "[transition:background-color_.15s,scale_.1s] " +
    "enabled:hover:bg-[#DCE8E5] enabled:active:scale-[.92] " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div
      className={
        "flex items-center justify-between border border-line rounded-[10px] bg-white min-h-[44px] p-[3px] " +
        "transition-[border-color,box-shadow,background-color] duration-300 ease-in-out " +
        "hover:border-[#C3D3CF] focus-within:outline-none focus-within:border-teal focus-within:hover:border-teal " +
        "focus-within:shadow-[0_0_0_4px_rgba(11,79,74,.12)]"
      }
    >
      <button
        type="button"
        aria-label={lessLabel}
        disabled={value <= 0}
        onClick={() => onChange(value - 1)}
        className={buttonClasses}
      >
        &minus;
      </button>
      <output className="min-w-[3ch] text-center font-semibold text-ink text-[15px]">
        {value ? value + "+" : "Any"}
      </output>
      <button
        type="button"
        aria-label={moreLabel}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonClasses}
      >
        +
      </button>
    </div>
  );
}
