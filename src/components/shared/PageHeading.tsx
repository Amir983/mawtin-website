import type { IPageHeadingProps } from "@/interfaces";

// عنوان الصفحة (Properties وContact): h1 + سطر وصف
export function PageHeading({ title, text }: IPageHeadingProps) {
  return (
    <div className="pt-9 pb-[18px]">
      <h1 className="text-[length:clamp(30px,5vw,44px)]">{title}</h1>
      <p className="text-mut mt-1.5">{text}</p>
    </div>
  );
}
