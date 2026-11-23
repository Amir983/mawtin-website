import { Link } from "react-router-dom";
import type { ISectionHeaderProps } from "@/interfaces";
import { Reveal } from "@/components/shared/Reveal";

// عنوان القسم: عنوان + وصف اختياري + رابط "See all" اختياري
export function SectionHeader({ title, text, linkText, linkTo }: ISectionHeaderProps) {
  return (
    <Reveal className="flex justify-between items-end gap-4 mb-6 flex-wrap">
      <div>
        <h2 className="text-[length:clamp(26px,4vw,36px)]">{title}</h2>
        {text && <p className="text-mut mt-1.5">{text}</p>}
      </div>
      {linkText && linkTo && (
        <Link to={linkTo} className="text-teal font-semibold border-b-2 border-copper">
          {linkText}
        </Link>
      )}
    </Reveal>
  );
}
