import { Link } from "react-router-dom";
import type { IPropertyCardProps } from "@/interfaces";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PropertyImage } from "@/components/shared/PropertyImage";
import { useReveal } from "@/hooks/useReveal";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// كارت العقار (بيفتح صفحة التفاصيل)
export function PropertyCard({ property, index = 0 }: IPropertyCardProps) {
  const { ref, isVisible } = useReveal<HTMLAnchorElement>();
  const typeName = property.type ? property.type.name : "";
  // الكروت في نفس الصف بتظهر ورا بعض (كل كارت متأخر 90ms عن اللي قبله)
  const delay = (index % 3) * 90;

  return (
    <Link
      ref={ref}
      to={"/property/" + property.id}
      style={delay ? { animationDelay: delay + "ms" } : undefined}
      className={cn(
        "rv flex flex-col bg-white border border-line rounded-xl overflow-hidden",
        "transition-[border-color,translate] duration-150 hover:border-teal hover:-translate-y-0.5",
        isVisible && "in",
      )}
    >
      <PropertyImage imageUrl={property.image_url} title={property.title} typeName={typeName} />
      <div className="pt-4 px-[18px] pb-[18px] flex flex-col gap-1.5 flex-1">
        {typeName && <Badge>{typeName}</Badge>}
        <h3 className="text-[22px]">{property.title}</h3>
        <p className="text-mut flex items-center gap-1.5 text-[14px]">
          <Icon name="pin" />
          {property.address}
        </p>
        <div className="flex gap-4 text-mut text-[14px] mt-0.5">
          {property.bedrooms > 0 && (
            <span className="flex gap-1.5 items-center">
              <Icon name="bed" />
              {property.bedrooms + " beds"}
            </span>
          )}
          <span className="flex gap-1.5 items-center">
            <Icon name="area" />
            {property.area_sqm + " m\u00B2"}
          </span>
        </div>
        <div className="mt-auto pt-3 font-bold text-[18px] text-teal border-t border-line">
          {formatPrice(property.price)}
        </div>
      </div>
    </Link>
  );
}
