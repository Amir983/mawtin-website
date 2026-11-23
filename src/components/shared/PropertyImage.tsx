import { useState } from "react";
import type { IPropertyImageProps } from "@/interfaces";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

// لون الخلفية لكل نوع عقار (بيظهر لو الصورة مش موجودة)
const placeholderColors: Record<string, string> = {
  Apartment: "bg-teal",
  Villa: "bg-copper-dark",
  Shop: "bg-[#3E6F8C]",
  Land: "bg-[#7B8F5A]",
};

// صورة العقار: لو image_url مش موجود أو فشل تحميله بنعرض لون النوع مع أيقونة البيت
export function PropertyImage({ imageUrl, title, typeName, size = "card" }: IPropertyImageProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const showImage = imageUrl && !hasFailed;

  const sizeClasses = size === "detail" ? "aspect-[16/9] rounded-xl" : "aspect-[16/10]";
  const placeholderColor = placeholderColors[typeName] || "bg-teal";

  return (
    <div
      className={cn(
        "grid place-items-center overflow-hidden relative",
        sizeClasses,
        !showImage && placeholderColor,
      )}
    >
      {showImage ? (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          onError={() => setHasFailed(true)}
          className="w-full h-full object-cover block"
        />
      ) : (
        <Icon name="house" className="w-[46%] opacity-50" />
      )}
    </div>
  );
}
