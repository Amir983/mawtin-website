# Mawtin Estates - الموقع العام للعملاء

موقع React + TypeScript + Tailwind v4 لشركة Mawtin Estates العقارية. الواجهة English فقط (LTR) والأسعار بالجنيه (EGP).
المشروع **جاهز لاستقبال البيانات** لكن **ما فيهوش أي كود Supabase**: الربط بقاعدة البيانات هتعمله إنت (شوف "أماكن الـ TODO").

## التشغيل
```
yarn            # تثبيت المكتبات
yarn dev        # تشغيل للتطوير
yarn build      # بناء للإنتاج (فولدر dist)
yarn lint       # فحص الكود
```
مدير الحزم: **Yarn 1 فقط** (فيه `yarn.lock`، ما تستخدمش npm أو pnpm).

## المكتبات المعتمدة فقط
`react`, `react-dom`, `react-router-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss` + `@tailwindcss/vite`، وإعداد ESLint القياسي. أي مكتبة تانية لازم تتناقش الأول.
(ملحوظة: TypeScript متثبت على `~5.9` لأن `typescript-eslint` لسه مش بيدعم إصدار 7.)

## خريطة الفولدرات (src/)
| الفولدر / الملف | فيه إيه |
|---|---|
| `main.tsx`, `App.tsx` | نقطة البداية. الـ `App` بيشغّل `RouterProvider` بس |
| `router/index.tsx` | كل الـ routes (`createBrowserRouter` + `createRoutesFromElements`) |
| `index.css` | `@import "tailwindcss"` + ألوان وخطوط الـ `@theme` + الـ keyframes + ستايلات أساسية + الـ scrollbar + `prefers-reduced-motion` |
| `api/` | **فاضي (`.gitkeep` بس)**. هنا هتكتب دوال Supabase |
| `hooks/` | `usePublicProperties`, `useClickOutside`, `useReveal`, `useCountUp` |
| `interfaces/index.ts` | **كل** الـ interfaces (أسماؤها بتبدأ بـ `I`) |
| `lib/` | `utils.ts` (دالة `cn`)، `searchUtils.ts` (البحث بالعربي)، `formatters.ts` (السعر والتاريخ)، `company.ts` (بيانات الشركة وروابط الفوتر)، `propertyFilters.ts` (حفظ الفلاتر) |
| `validation/index.ts` | دوال التحقق من الفورمز |
| `components/ui/` | مكونات مستقلة: `Button`, `Input`, `Textarea`, `Field`, `Select`, `Counter`, `Badge`, `Icon` |
| `components/layout/` | `Layout`, `Header`, `Footer` |
| `components/shared/` | قطع قابلة لإعادة الاستخدام: `Logo`, `SearchBar`, `PropertyCard`, `PropertyGrid`, `PropertyImage`, `PropertyFilters`, `BookingForm`, `ContactForm`, `SuccessPanel`, `SectionHeader`, `CtaBanner`, `Hero`, `HeroSign`, `StatsBand`, `ValueCard`, `Reveal`, `EmptyState`, `PageHeading`, `Container` |
| `components/pages/` | `Home`, `Properties`, `PropertyDetails`, `About`, `Contact`, `NotFound` |

الـ routes: `/` ، `/properties` ، `/property/:id` ، `/about` ، `/contact` ، وأي رابط تاني = `NotFound`.

## أماكن الـ TODO (الربط بـ Supabase)
1. **`src/hooks/usePublicProperties.ts`** : دالة `fetchProperties()` بترجّع قائمة فاضية. استبدلها باستدعاء دالتك من `src/api` بحيث ترجّع `IProperty[]` (جدول `Properties` + اسم النوع من `PropertyTypes` في الحقل `type: { name }`).
   الـ hook بيفلتر لوحده ويعرض `status === "available"` بس (`reserved` و`sold` مبيظهروش أبداً).
2. **`src/components/pages/PropertyDetails.tsx`** : دالة `handleBooking(values)`. المطلوب: تعمل عميل جديد بـ `status = "lead"`، وتعمل معاينة (`Viewings`) بـ `status = "requested"` و`property_id` للعقار.
3. **`src/components/pages/Contact.tsx`** : دالة `handleMessage(values)`. المطلوب: تعمل عميل بـ `status = "lead"`، وتعمل تفاعل (`Interactions`) بنوع `message`.

مهم: لحد ما تربطهم، الدالتين دول بيطبعوا القيم في الـ console بس، والفورم بيعرض رسالة النجاح. بعد الربط لازم الدالة تعمل **`throw`** لو حصل خطأ، عشان الفورم يعرض رسالة الفشل ويحتفظ بالبيانات.
ملحوظة: `usePublicProperties` بيتنادى في الـ Header وفي الصفحة نفسها، فهيحصل طلبين لكل صفحة (ممكن نحسّنه بعدين لو حبيت).

## الـ hosting (مهم للروابط النظيفة)
الموقع بيستخدم روابط نظيفة (`/properties`)، فلازم السيرفر يرجّع `index.html` لأي مسار، وإلا الـ refresh على صفحة داخلية هيدّي 404.

**Vercel** : ملف `vercel.json` في جذر المشروع:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
**Netlify** : ملف `public/_redirects`:
```
/*  /index.html  200
```

## الفروقات عن الـ prototype (`index.html`)
المقارنة بالـ pixel على 390 و768 و1280 لكل الصفحات والحالات التفاعلية طلعت **متطابقة** (الفرق أقل من 0.01%). الفروقات اللي موجودة:
1. **صفحة 404:** الـ prototype كان بيحوّل أي رابط غلط للـ Home. هنا فيه صفحة `NotFound` بنفس الستايل (مطلوبة في البرومبت).
2. **حالات التحميل والخطأ:** مش موجودة في الـ prototype. استخدمت نفس صندوق الـ empty state بنص بسيط.
3. **وصف العقار الفاضي:** لو `description` فاضي بنخفي عنوان "About this property" كله.
4. **نوع عقار غير معروف:** لو النوع مش (Apartment / Villa / Shop / Land) بيظهر لون teal كخلفية للصورة الاحتياطية.
5. **علامة ✓ في الـ Select:** SVG جوه العنصر بدل CSS `::after` (نفس الشكل بالظبط).
6. **الـ prototype كان فيه `<select>` مخفي** بيعمل horizontal overflow على 1280 في صفحة Properties. النسخة دي مفيهاش، فمفيش overflow.
7. **سنة الـ copyright:** بتتحسب أوتوماتيك.
8. **الـ alias `@` في `vite.config.ts`:** مبني على `new URL(...)` (من غير `@types/node`) مع سطر صغير يصلّح مسار Windows. لو ظهر خطأ في الـ imports على Windows قولّي.
9. **الخطوط والصور:** Google Fonts وصور Unsplash بتتحمّل من الإنترنت زي الـ prototype بالظبط.

## التحقق اللي اتعمل
- `yarn build` و`yarn lint` من غير errors.
- Playwright: لقطات لكل الصفحات على 390/768/1280 للأصل والـ React بنفس البيانات (اتشالت بعد الاختبار) ومقارنتها، مع الحالات: القائمة على الموبايل، نتايج البحث (وحالة "No properties found")، الـ Select المفتوح، الفلاتر المطبقة وحالة الفلاتر الفاضية، أخطاء الـ validation، لوحات النجاح، وعقار غير متاح.
- الحركة (animations / hover / focus / scrollbar) متقارنة بقيم الـ CSS المحسوبة، و`prefers-reduced-motion` متحقق منه.
- **ما اتجربش:** Windows وSafari وFirefox، ولا الخطوط الحقيقية (Plus Jakarta Sans / DM Serif Display) لأن بيئة الاختبار مفيهاش إنترنت. المقارنة اتعملت بخطوط الـ fallback في الاتنين.
