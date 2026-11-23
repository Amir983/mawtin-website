import type { ReactNode } from "react";

// ---------- بيانات العقارات (نفس جداول Supabase) ----------
export interface IProperty {
  id: number;
  title: string;
  address: string;
  price: number;
  area_sqm: number;
  bedrooms: number;
  status: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
  type: { name: string } | null; // join مع جدول PropertyTypes
}

// ---------- props بتاعة الـ ui components ----------
export interface IButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "teal";
  to?: string; // لو موجودة الزر بيبقى Link
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface IInputProps {
  name?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  min?: string;
  step?: string;
}

export interface ITextareaProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export interface IFieldProps {
  label: string;
  children: ReactNode;
  error?: string; // لو متبعتش، سطر الخطأ مش بيظهر (زي فلاتر الـ Properties)
  as?: "label" | "div";
  className?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  options: ISelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface ICounterProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  lessLabel?: string;
  moreLabel?: string;
}

export interface IBadgeProps {
  children: ReactNode;
  variant?: "tag" | "success";
}

export type IconName =
  | "pin"
  | "bed"
  | "area"
  | "phone"
  | "mail"
  | "clock"
  | "search"
  | "chevron"
  | "check"
  | "house"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "whatsapp";

export interface IIconProps {
  name: IconName;
  className?: string; // لو اتبعتت بتحل مكان الحجم الافتراضي (w-4 h-4)
}

// ---------- props بتاعة الـ shared components ----------
export interface ILogoProps {
  variant?: "light" | "dark"; // light = للهيدر (خلفية بيضا)، dark = للفوتر (خلفية غامقة)
  className?: string;
}

export interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export interface IRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // بالمللي ثانية
}

export interface IEmptyStateProps {
  title?: string;
  text: string;
  children?: ReactNode; // مثلاً زر تحت الرسالة
}

export interface IPageHeadingProps {
  title: string;
  text: string;
}

export interface IValueCardProps {
  number: string;
  title: string;
  text: string;
  index?: number; // ترتيب الكارت، بيحدد تأخير ظهوره
}

export interface ISectionHeaderProps {
  title: string;
  text?: string;
  linkText?: string;
  linkTo?: string;
}

export interface ICtaBannerProps {
  title: string;
  text: string;
  buttonText: string;
  buttonTo: string;
}

export interface IPropertyImageProps {
  imageUrl: string | null;
  title: string;
  typeName: string;
  size?: "card" | "detail";
}

export interface IPropertyCardProps {
  property: IProperty;
  index?: number; // ترتيب الكارت، بيحدد تأخير ظهوره
}

export interface IPropertyGridProps {
  properties: IProperty[];
  loading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  emptyText: string;
}

export interface IPropertyFilters {
  type: string;
  min: string;
  max: string;
  beds: number;
}

export interface IPropertyFiltersProps {
  types: string[]; // أسماء الأنواع الموجودة في العقارات المتاحة
  filters: IPropertyFilters;
  onChange: (filters: IPropertyFilters) => void;
  onClear: () => void;
}

export interface ISuccessRow {
  label: string;
  value: string;
}

export interface ISuccessPanelProps {
  title: string;
  text: string;
  rows?: ISuccessRow[];
}

// القيم اللي الفورم بيبعتها للصفحة (بنفس أسماء أعمدة Supabase)
export interface IBookingFormValues {
  full_name: string;
  phone: string;
  email: string | null;
  scheduled_at: string;
  notes: string | null;
}

export interface IBookingFormProps {
  propertyTitle: string;
  onSubmit: (values: IBookingFormValues) => Promise<void>;
}

export interface IContactFormValues {
  full_name: string;
  phone: string;
  email: string | null;
  notes: string;
}

export interface IContactFormProps {
  onSubmit: (values: IContactFormValues) => Promise<void>;
}

// القيم والأخطاء جوه فورم الحجز وفورم التواصل (كلها نصوص)
export interface IFormTexts {
  name: string;
  phone: string;
  email: string;
  when: string;
  note: string;
}

export interface ISearchBarProps {
  properties: IProperty[];
}

export interface IHeroProps {
  imageUrl: string;
  title: ReactNode;
  text: string;
  actions?: ReactNode;
  aside?: ReactNode;
  small?: boolean;
}

export interface IStat {
  value: number;
  suffix: string;
  label: string;
}

export interface IStatsBandProps {
  stats: IStat[];
}

export interface IStatItemProps {
  stat: IStat;
}
