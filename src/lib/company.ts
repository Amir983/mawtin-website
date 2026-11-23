// بيانات الشركة (نص تجريبي، غيّرها بالبيانات الحقيقية)
export const COMPANY = {
  address: "12 Example Street, New Cairo, Egypt",
  phone: "+20 100 000 0000",
  email: "hello@mawtin.example",
  hours: "Sat to Thu, 9:00 to 18:00",
};

export const FOOTER_DESCRIPTION =
  "Homes, villas, shops and land across Greater Cairo and the North Coast, with advisors who put your plans first.";

// روابط القائمة الرئيسية (بتظهر في الهيدر والفوتر)
export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "About us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// روابط أنواع العقارات في الفوتر (type = الاسم زي ما هو في جدول PropertyTypes)
export const PROPERTY_TYPE_LINKS = [
  { label: "Apartments", type: "Apartment" },
  { label: "Villas", type: "Villa" },
  { label: "Shops", type: "Shop" },
  { label: "Land", type: "Land" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "WhatsApp", url: "https://wa.me", icon: "whatsapp" },
] as const;
