import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { SearchBar } from "@/components/shared/SearchBar";
import { Container } from "@/components/shared/Container";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import { NAV_LINKS } from "@/lib/company";
import { cn } from "@/lib/utils";

// الرابط النشط في القائمة (صفحة تفاصيل العقار بتنوّر "Properties")
function isLinkActive(linkTo: string, pathname: string) {
  if (linkTo === "/") return pathname === "/";
  if (linkTo === "/properties") return pathname === "/properties" || pathname.startsWith("/property/");
  return pathname === linkTo;
}

// الهيدر: لوجو + قائمة + بحث، وعلى الموبايل زر همبرجر بيفتح القائمة
export function Header() {
  const location = useLocation();
  const { properties } = usePublicProperties();

  // بنحفظ مفتاح الصفحة وقت فتح القائمة، فلو الصفحة اتغيرت القائمة بتتقفل لوحدها
  const [menuKey, setMenuKey] = useState<string | null>(null);
  const isMenuOpen = menuKey === location.key;

  const barClasses =
    "absolute left-0 w-full h-0.5 bg-teal rounded-[2px] [transition:rotate_.3s,scale_.3s,opacity_.2s,top_.3s]";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line">
      <Container className="flex flex-wrap items-center gap-x-[18px] gap-y-[10px] py-[10px] min-[900px]:flex-nowrap">
        <Link to="/" aria-label="Mawtin Estates home" className="flex items-center gap-[10px] mr-auto">
          <Logo className="h-[46px]" />
        </Link>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setMenuKey(isMenuOpen ? null : location.key)}
          className={cn(
            "order-2 w-[42px] h-[42px] border rounded-[10px] grid place-items-center cursor-pointer min-[900px]:hidden",
            "[transition:scale_.15s,background-color_.2s,border-color_.2s] active:scale-[.92]",
            isMenuOpen ? "bg-[#EEF3F1] border-teal" : "bg-white border-line",
          )}
        >
          <span className="relative block w-5 h-[14px]">
            <i className={cn(barClasses, isMenuOpen ? "top-[6px] rotate-45" : "top-0")} />
            <i className={cn(barClasses, "top-[6px]", isMenuOpen && "opacity-0 scale-x-[.2]")} />
            <i className={cn(barClasses, isMenuOpen ? "top-[6px] -rotate-45" : "top-[12px]")} />
          </span>
        </button>

        <nav
          className={cn(
            "order-4 flex w-full flex-col gap-0.5 overflow-hidden",
            "min-[900px]:order-2 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:max-h-none min-[900px]:opacity-100 min-[900px]:visible min-[900px]:overflow-visible min-[900px]:p-0",
            isMenuOpen
              ? "max-h-[280px] opacity-100 visible pb-1.5 [transition:max-height_.35s_ease,opacity_.25s_ease,padding_.35s_ease,visibility_0s_0s]"
              : "max-h-0 opacity-0 invisible [transition:max-height_.35s_ease,opacity_.25s_ease,padding_.35s_ease,visibility_0s_.35s]",
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-[10px] rounded-lg transition-[background-color,color] duration-200 hover:text-teal",
                isLinkActive(link.to, location.pathname)
                  ? "text-teal bg-[#EEF3F1] font-semibold"
                  : "text-mut font-medium",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SearchBar properties={properties} />
      </Container>
    </header>
  );
}
