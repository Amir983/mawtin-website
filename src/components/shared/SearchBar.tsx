import { useCallback, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ISearchBarProps } from "@/interfaces";
import { Icon } from "@/components/ui/Icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatPrice } from "@/lib/formatters";
import { MIN_SEARCH_LENGTH, normalizeText, searchProperties } from "@/lib/searchUtils";
import { cn } from "@/lib/utils";

// شريط البحث في الهيدر: بيدور في اسم العقار وعنوانه ونوعه
export function SearchBar({ properties }: ISearchBarProps) {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState("");
  // آخر كلمة بحث صالحة (حرفين أو أكتر). بنفضل نعرض نتايجها وقت ما القائمة بتختفي عشان مفيش وميض
  const [searchedText, setSearchedText] = useState("");
  // بنحفظ فيها مفتاح الصفحة الحالية وقت فتح القائمة، فلو الصفحة اتغيرت القائمة بتتقفل لوحدها
  const [openKey, setOpenKey] = useState<string | null>(null);

  const closeDropdown = useCallback(() => setOpenKey(null), []);
  useClickOutside(wrapperRef, closeDropdown);

  const isLongEnough = normalizeText(text).length >= MIN_SEARCH_LENGTH;
  const isOpen = openKey === location.key && isLongEnough;
  const results = searchProperties(properties, searchedText);

  function openDropdown(newText: string) {
    if (normalizeText(newText).length >= MIN_SEARCH_LENGTH) {
      setSearchedText(newText);
    }
    setOpenKey(location.key);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
    openDropdown(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpenKey(null);
      inputRef.current?.blur();
    }
  }

  // لما نختار نتيجة: نفضّي الحقل ونقفل القائمة
  function handleResultClick() {
    setText("");
    setOpenKey(null);
  }

  return (
    <div ref={wrapperRef} className="group relative w-full order-3 min-[900px]:w-[320px]">
      <Icon
        name="search"
        className="absolute left-[13px] top-3 w-[18px] h-[18px] text-mut transition-colors duration-300 ease-in-out group-focus-within:text-teal"
      />
      <input
        ref={inputRef}
        type="search"
        value={text}
        placeholder="Search by name, area or type"
        autoComplete="off"
        aria-label="Search properties"
        onChange={handleChange}
        onFocus={() => openDropdown(text)}
        onKeyDown={handleKeyDown}
        className={
          "w-full h-[42px] pr-[14px] pl-10 border border-line rounded-[999px] bg-surface outline-none " +
          "transition-[border-color,background-color,box-shadow] duration-300 ease-in-out " +
          "focus:border-teal focus:bg-white focus:shadow-[0_0_0_4px_rgba(11,79,74,.12),0_8px_22px_rgba(11,79,74,.16)]"
        }
      />

      <div
        className={cn(
          "scroll-white absolute left-0 right-0 top-12 bg-white border border-line rounded-xl overflow-hidden z-[60]",
          "shadow-[0_14px_34px_rgba(8,58,54,.16)]",
          isOpen
            ? "opacity-100 visible translate-y-0 [transition:opacity_.2s,translate_.2s,visibility_0s_0s]"
            : "opacity-0 invisible -translate-y-2 [transition:opacity_.2s,translate_.2s,visibility_0s_.2s]",
        )}
      >
        {results.length > 0 ? (
          results.map((property) => (
            <Link
              key={property.id}
              to={"/property/" + property.id}
              onClick={handleResultClick}
              className="flex justify-between gap-[14px] px-[14px] py-[11px] border-b border-line last:border-b-0 hover:bg-[#F1F5F3]"
            >
              <div>
                <strong className="block font-semibold">{property.title}</strong>
                <span className="text-mut text-[13px]">
                  {(property.type ? property.type.name : "") + " \u00B7 " + property.address}
                </span>
              </div>
              <div className="text-teal font-bold whitespace-nowrap text-[13px]">{formatPrice(property.price)}</div>
            </Link>
          ))
        ) : (
          <p className="flex justify-between gap-[14px] px-[14px] py-[11px] border-b border-line text-mut">
            No properties found for this search.
          </p>
        )}
      </div>
    </div>
  );
}
