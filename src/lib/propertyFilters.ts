import type { IPropertyFilters } from "@/interfaces";

// الفلاتر الفاضية (الوضع الافتراضي)
export const emptyFilters: IPropertyFilters = { type: "", min: "", max: "", beds: 0 };

// زي الـ prototype: الفلاتر بتفضل محفوظة لما تفتح عقار وترجع، وبتتصفّر لما تعمل refresh.
// بنحفظها هنا (برة الـ component) عشان صفحة Properties بتتبني من جديد مع كل تنقّل.
let savedFilters: IPropertyFilters = emptyFilters;
let lastLinkKey = "";

// بترجّع الفلاتر اللي الصفحة تبدأ بيها.
// لو جينا من رابط نوع في الفوتر (typeFromLink) بنبدأ بالنوع ده وباقي الفلاتر فاضية.
// linkKey بيمنع إعادة تطبيق النوع لو رجعنا للصفحة بزر Back.
export function getStartFilters(linkKey: string, typeFromLink: string | null) {
  if (typeFromLink && lastLinkKey !== linkKey) {
    lastLinkKey = linkKey;
    savedFilters = { ...emptyFilters, type: typeFromLink };
  }
  return savedFilters;
}

export function saveFilters(filters: IPropertyFilters) {
  savedFilters = filters;
}
